// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import * as PDFLib from 'https://cdn.skypack.dev/pdf-lib@1.17.1';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const PRINTS_BUCKET = 'prints';
const QR_CODES_BUCKET = 'qr_codes';
const ASSETS_BUCKET = 'assets'; // For storing logos and other assets

Deno.serve(async req => {
  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('DENO_SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('DENO_ANON_KEY');
    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(
        JSON.stringify({
          error: 'Supabase environment variables not set',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch unprinted trees from the database
    const { data: unprintedTrees, error } = await supabase
      .from('trees')
      .select(
        `
      tree_id,
      tag_id,
      species,
      qr_code_url
    `,
      )
      .eq('printed', false)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching unprinted trees:', error);
      return new Response(
        JSON.stringify({
          error: 'Failed to fetch unprinted trees',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    if (!unprintedTrees || unprintedTrees.length === 0) {
      return new Response(
        JSON.stringify({
          message: 'No unprinted trees found',
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    // Fetch all species from the tree_species table to map common names to scientific names
    const { data: speciesData, error: speciesError } = await supabase
      .from('tree_species')
      .select('name, scientific_name');

    if (speciesError) {
      console.error('Error fetching species data:', speciesError);
      return new Response(
        JSON.stringify({
          error: 'Failed to fetch species data',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    // Create a mapping of common names to scientific names
    const speciesMap = new Map();
    if (speciesData) {
      for (const species of speciesData) {
        if (species.name && species.scientific_name) {
          speciesMap.set(species.name.toLowerCase(), species.scientific_name);
        }
      }
    }

    // Create a new PDF document
    const pdfDoc = await PDFLib.PDFDocument.create();

    // Debug info as console logs instead of in the PDF
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log(`Number of unprinted trees: ${unprintedTrees.length}`);
    console.log(`Species mappings found: ${speciesMap.size}`);

    // Simple logging function that won't appear in the PDF
    const addDebugLine = text => {
      console.log(text);
      return true; // Just for compatibility with existing code
    };

    // Function to create a QR code using an external service
    async function createQRCode(text) {
      try {
        // Further increased QR code size from 180 to 250
        const url = `https://quickchart.io/qr?text=${encodeURIComponent(text)}&size=250&margin=1&format=png`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch QR code: ${response.status} ${response.statusText}`,
          );
        }

        const arrayBuffer = await response.arrayBuffer();
        return new Uint8Array(arrayBuffer);
      } catch (error) {
        console.error('Error creating QR code:', error);
        throw error;
      }
    }

    // Try to fetch the logo from storage or use a placeholder
    let logoImage;
    try {
      const { data: logoData, error: logoError } = await supabase.storage
        .from(ASSETS_BUCKET)
        .download('our_city_forest_logo.png');

      if (logoError || !logoData) {
        addDebugLine(
          `Logo not found in storage: ${logoError?.message || 'No data'}`,
        );
        // We'll create a text-based logo placeholder later
      } else {
        const logoBytes = new Uint8Array(await logoData.arrayBuffer());
        logoImage = await pdfDoc.embedPng(logoBytes);
        addDebugLine('Successfully loaded logo from storage');
      }
    } catch (error) {
      addDebugLine(`Error loading logo: ${error.message}`);
      // We'll create a text-based logo placeholder later
    }

    // Load fonts
    const regularFont = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);
    const italicFont = await pdfDoc.embedFont(
      PDFLib.StandardFonts.HelveticaOblique,
    );

    // Constants for tag layout - EXACTLY 8 tags per page
    // Use landscape orientation (swap width and height)
    const pageWidth = 792; // Letter size height (11 inches * 72 points/inch)
    const pageHeight = 612; // Letter size width (8.5 inches * 72 points/inch)
    const tagsPerPage = 8;
    const tagHeight = pageHeight / tagsPerPage; // Height of each tag in landscape

    // Calculate how many pages we need
    const totalPages = Math.ceil(unprintedTrees.length / tagsPerPage);
    addDebugLine(`Tags per page: ${tagsPerPage}`);
    addDebugLine(`Tag height: ${tagHeight} points`);
    addDebugLine(`Total pages needed: ${totalPages}`);

    // Cache for QR codes to avoid regenerating them
    const qrCodeCache = new Map();

    // Process trees and create pages
    for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
      // Create a new page with landscape orientation
      const page = pdfDoc.addPage([pageWidth, pageHeight]);

      addDebugLine(`Creating page ${pageIndex + 1} of ${totalPages}`);

      // Process up to tagsPerPage trees for this page
      const startTreeIndex = pageIndex * tagsPerPage;
      const endTreeIndex = Math.min(
        startTreeIndex + tagsPerPage,
        unprintedTrees.length,
      );

      for (
        let tagIndex = 0;
        tagIndex < endTreeIndex - startTreeIndex;
        tagIndex++
      ) {
        const treeIndex = startTreeIndex + tagIndex;
        const tree = unprintedTrees[treeIndex];

        addDebugLine(
          `Processing tree ${treeIndex + 1}: ${tree.tree_id} (Tag ${tagIndex + 1} on page ${pageIndex + 1})`,
        );

        // Calculate position for this tag (horizontal layout)
        const tagY = pageHeight - (tagIndex + 1) * tagHeight;

        // Draw tag content
        await drawTagContent(
          page,
          tree,
          0,
          tagY,
          pageWidth,
          tagHeight,
          qrCodeCache,
          speciesMap,
        );

        // No divider lines as requested
      }
    }

    // Function to draw a single tag
    async function drawTagContent(
      page,
      tree,
      x,
      y,
      width,
      height,
      qrCodeCache,
      speciesMap,
    ) {
      // Adjust content placement to move everything more to the right
      // Leave even more whitespace on the left
      const leftMarginPercent = 0.35; // 35% of the width as left margin
      const contentWidth = width * 0.55; // Use 55% of the width for content
      const contentX = x + width * leftMarginPercent; // Start content at 35% from left

      // Vertical center of the tag area
      const centerY = y + height / 2;

      // Logo dimensions - preserve aspect ratio but make slightly smaller to fit larger QR code
      const logoHeight = height * 0.55; // Reduced from 0.6 to 0.55
      const logoWidth = logoHeight * 1.3; // Based on logo aspect ratio
      const logoY = centerY - logoHeight / 2;

      // Draw logo or placeholder
      if (logoImage) {
        page.drawImage(logoImage, {
          x: contentX,
          y: logoY,
          width: logoWidth,
          height: logoHeight,
        });
      } else {
        // Draw text placeholder for logo
        page.drawText('OUR', {
          x: contentX,
          y: centerY + 15,
          size: 14,
          font: boldFont,
          color: PDFLib.rgb(0.3, 0.4, 0.2),
        });
        page.drawText('CITY', {
          x: contentX,
          y: centerY,
          size: 14,
          font: boldFont,
          color: PDFLib.rgb(0.3, 0.4, 0.2),
        });
        page.drawText('FOREST', {
          x: contentX,
          y: centerY - 15,
          size: 14,
          font: boldFont,
          color: PDFLib.rgb(0.3, 0.4, 0.2),
        });
      }

      // Determine scientific and common names
      let scientificName = '';
      let commonName = tree.species || 'Unknown Species';

      // First check if we can find the scientific name in our mapping
      if (tree.species && speciesMap.has(tree.species.toLowerCase())) {
        scientificName = speciesMap.get(tree.species.toLowerCase());
        addDebugLine(
          `Found scientific name for "${tree.species}": ${scientificName}`,
        );
      }
      // If not in our mapping, try to parse from the species field if it contains formatted information
      else if (tree.species && tree.species.includes("'")) {
        // Try to parse scientific and common name
        const parts = tree.species.split("'");
        if (parts.length >= 3) {
          const genus = parts[0].trim();
          const species = parts[1].trim();
          scientificName = `${genus} '${species}'`;

          if (parts[2]) {
            commonName = parts[2].trim();
          }
        }
      }

      // Calculate the layout for text
      const textStartX = contentX + logoWidth + 15; // Reduced spacing from 20 to 15

      // Calculate the rightmost position for content
      const contentEndX = contentX + contentWidth;

      // QR code dimensions - significantly increased size to almost touch across rows
      const qrCodeSize = height * 0.97; // Increased from 0.85 to 0.97

      // QR code position - align to right side of content area
      const qrCodeX = textStartX + 250;
      const qrCodeY = centerY - qrCodeSize / 2;

      // Tag ID position - closer to QR code and adjusted to make room for larger QR
      const tagIdX = textStartX + 175;

      // Draw scientific name in italics (first line)
      if (scientificName) {
        page.drawText(scientificName, {
          x: textStartX,
          y: centerY + 15,
          size: 11,
          font: italicFont,
          color: PDFLib.rgb(0, 0, 0),
        });
      }

      // Draw common name (second line)
      page.drawText(commonName, {
        x: textStartX,
        y: centerY - 5,
        size: 11,
        font: regularFont,
        color: PDFLib.rgb(0, 0, 0),
      });

      // Draw nursery email (third line)
      page.drawText('treenursery@ourcityforest.org', {
        x: textStartX,
        y: centerY - 25,
        size: 9,
        font: regularFont,
        color: PDFLib.rgb(0, 0, 0),
      });

      // Draw tag ID
      const tagId = tree.tag_id || '';
      if (tagId) {
        page.drawText(tagId, {
          x: tagIdX,
          y: centerY,
          size: 12,
          font: boldFont,
          color: PDFLib.rgb(0, 0, 0),
        });
      }

      // Draw QR code
      try {
        let qrCodeBytes;

        if (qrCodeCache.has(tree.tree_id)) {
          qrCodeBytes = qrCodeCache.get(tree.tree_id);
          addDebugLine(`Using cached QR code for ${tree.tree_id}`);
        } else {
          addDebugLine(`Generating QR code for ${tree.tree_id}`);
          qrCodeBytes = await createQRCode(tree.tree_id);
          qrCodeCache.set(tree.tree_id, qrCodeBytes);
        }

        const qrCodeImage = await pdfDoc.embedPng(qrCodeBytes);

        // Draw the QR code
        page.drawImage(qrCodeImage, {
          x: qrCodeX,
          y: qrCodeY,
          width: qrCodeSize,
          height: qrCodeSize,
        });
      } catch (qrError) {
        const errorMsg = `Error with QR code: ${qrError.message || qrError}`;
        addDebugLine(errorMsg);

        // Draw error message in QR code area
        page.drawText('QR Error', {
          x: qrCodeX + 10,
          y: centerY,
          size: 10,
          font: regularFont,
          color: PDFLib.rgb(1, 0, 0),
        });
      }
    }

    // Save the PDF
    const pdfBytes = await pdfDoc.save();

    // Generate a unique filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `tree_tags_${timestamp}.pdf`;

    // Upload the PDF to the PRINTS_BUCKET
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(PRINTS_BUCKET)
      .upload(filename, pdfBytes, {
        contentType: 'application/pdf',
        upsert: false,
      });

    if (uploadError) {
      addDebugLine(`Error uploading PDF to storage: ${uploadError.message}`);
      return new Response(
        JSON.stringify({
          error: 'Failed to save PDF to storage',
          details: uploadError,
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    // Get the public URL of the uploaded PDF
    const { data: publicUrlData } = await supabase.storage
      .from(PRINTS_BUCKET)
      .getPublicUrl(filename);
    const pdfUrl = publicUrlData?.publicUrl;

    // Update the trees in the database to mark them as printed
    const { error: updateError } = await supabase
      .from('trees')
      .update({
        printed: true,
      })
      .in(
        'tree_id',
        unprintedTrees.map(tree => tree.tree_id),
      );

    if (updateError) {
      addDebugLine(`Error updating trees as printed: ${updateError.message}`);
    }

    // Return success response with PDF URL
    return new Response(
      JSON.stringify({
        success: true,
        message: `PDF with ${unprintedTrees.length} tree tags generated and saved to ${PRINTS_BUCKET} bucket`,
        pdfUrl: pdfUrl,
        printedTrees: unprintedTrees.length,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Failed to generate PDF',
        details: error.toString(),
        stack: error.stack,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
});
