// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import * as PDFLib from 'https://cdn.skypack.dev/pdf-lib@1.17.1';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const PRINTS_BUCKET = 'prints';
const QR_CODES_BUCKET = 'qr_codes';

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
          headers: {
            'Content-Type': 'application/json',
          },
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
      .order('created_at', {
        ascending: true,
      });

    if (error) {
      console.error('Error fetching unprinted trees:', error);
      return new Response(
        JSON.stringify({
          error: 'Failed to fetch unprinted trees',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
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
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }

    // Create a new PDF document
    const pdfDoc = await PDFLib.PDFDocument.create();

    // Create debug page
    const debugPage = pdfDoc.addPage([800, 600]);
    const debugFont = await pdfDoc.embedFont(PDFLib.StandardFonts.Courier);

    // Add debug header
    debugPage.drawText('DEBUG INFORMATION', {
      x: 50,
      y: 550,
      size: 16,
      font: debugFont,
    });

    // Function to add debug text to the debug page
    let debugLineY = 520;
    const addDebugLine = text => {
      debugPage.drawText(text, {
        x: 50,
        y: debugLineY,
        size: 10,
        font: debugFont,
      });
      debugLineY -= 15;
      return debugLineY;
    };

    addDebugLine(`Timestamp: ${new Date().toISOString()}`);
    addDebugLine(`Number of unprinted trees: ${unprintedTrees.length}`);

    /**
     * Create a QR code directly in the function
     * This is used as a fallback when the stored QR code can't be used
     */
    async function createQRCode(text) {
      try {
        const url = `https://quickchart.io/qr?text=${encodeURIComponent(text)}&size=200&margin=1&format=png`;
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

    /**
     * Fetch QR code from Supabase Storage
     * If it fails, generate a new one using createQRCode
     */
    async function getQRCodeFromStorage(treeId) {
      try {
        // First try to get the QR code from storage
        const filename = `${treeId}.png`;
        addDebugLine(`Fetching QR code from ${QR_CODES_BUCKET}/${filename}`);

        const { data, error } = await supabase.storage
          .from(QR_CODES_BUCKET)
          .download(filename);

        if (error || !data) {
          // If we can't get the QR code from storage, create a new one
          addDebugLine(
            `QR code not found in storage: ${error?.message || 'No data'}`,
          );
          addDebugLine(`Generating new QR code for tree ID: ${treeId}`);
          return await createQRCode(treeId);
        }

        // The files in storage are GIFs but named as PNGs
        // Instead of trying to use them directly, we'll generate new QR codes
        addDebugLine(
          `Successfully downloaded QR code file, but will generate new one`,
        );
        return await createQRCode(treeId);
      } catch (error) {
        addDebugLine(`Error with QR code: ${error.message}`);
        // Fall back to creating a new QR code
        return await createQRCode(treeId);
      }
    }

    // Process each unprinted tree
    for (const tree of unprintedTrees) {
      addDebugLine(`------ Tree ID: ${tree.tree_id} ------`);

      // Create a new page for each tree
      const page = pdfDoc.addPage([600, 400]);
      const { width, height } = page.getSize();
      const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(
        PDFLib.StandardFonts.HelveticaBold,
      );

      // Add tree information
      page.drawText(`Tree ID: ${tree.tree_id || 'N/A'}`, {
        x: 50,
        y: height - 50,
        size: 16,
        font: boldFont,
      });
      page.drawText(`Tag ID: ${tree.tag_id || 'N/A'}`, {
        x: 50,
        y: height - 80,
        size: 14,
        font: font,
      });
      page.drawText(`Species: ${tree.species || 'Unknown'}`, {
        x: 50,
        y: height - 110,
        size: 14,
        font: font,
      });

      // Add debug section
      page.drawText('DEBUG INFO:', {
        x: 50,
        y: height - 150,
        size: 10,
        font: boldFont,
      });

      try {
        // Fetch or create QR code
        const qrCodeBytes = await getQRCodeFromStorage(tree.tree_id);

        // Embed the QR code as PNG
        const qrCodeImage = await pdfDoc.embedPng(qrCodeBytes);

        // Position variables
        const qrSize = 120; // Size of the QR code
        const qrX = width - qrSize - 50; // Position from right
        const qrY = height - qrSize - 50; // Position from top

        // Draw the QR code on the page
        page.drawImage(qrCodeImage, {
          x: qrX,
          y: qrY,
          width: qrSize,
          height: qrSize,
        });

        addDebugLine('Successfully embedded QR code');
        page.drawText('QR code embedded successfully', {
          x: 50,
          y: height - 170,
          size: 10,
          font: font,
          color: PDFLib.rgb(0, 0.5, 0),
        });

        // Add a label beneath the QR code
        page.drawText(`Tree ID: ${tree.tree_id}`, {
          x: qrX,
          y: qrY - 15,
          size: 10,
          font: font,
        });
      } catch (qrError) {
        const errorMsg = `Error with QR code: ${qrError.message || qrError}`;
        addDebugLine(errorMsg);

        // Add error message to PDF instead
        page.drawText(`QR Code Error: ${qrError.message || qrError}`, {
          x: width - 200,
          y: height - 100,
          size: 12,
          font: font,
          color: PDFLib.rgb(1, 0, 0),
        });

        // Draw a placeholder QR code box
        const qrSize = 120;
        const qrX = width - qrSize - 50;
        const qrY = height - qrSize - 50;

        // Draw a white background with border
        page.drawRectangle({
          x: qrX,
          y: qrY,
          width: qrSize,
          height: qrSize,
          color: PDFLib.rgb(1, 1, 1),
          borderColor: PDFLib.rgb(0, 0, 0),
          borderWidth: 1,
        });

        // Add text label in the QR code
        const treeIdText = 'SCAN ME';
        const textWidth = font.widthOfTextAtSize(treeIdText, 12);
        page.drawText(treeIdText, {
          x: qrX + (qrSize - textWidth) / 2,
          y: qrY + qrSize / 2,
          size: 12,
          font: font,
          color: PDFLib.rgb(0, 0, 0),
        });

        // Add tree ID in smaller text
        const smallText = tree.tree_id.substring(0, 8) + '...';
        const smallTextWidth = font.widthOfTextAtSize(smallText, 8);
        page.drawText(smallText, {
          x: qrX + (qrSize - smallTextWidth) / 2,
          y: qrY + qrSize / 2 - 20,
          size: 8,
          font: font,
          color: PDFLib.rgb(0, 0, 0),
        });
      }
    }

    // Save the PDF
    const pdfBytes = await pdfDoc.save();

    // Generate a unique filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `unprinted_trees_${timestamp}.pdf`;

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
          headers: {
            'Content-Type': 'application/json',
          },
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
        message: `PDF generated for ${unprintedTrees.length} trees and saved to ${PRINTS_BUCKET} bucket`,
        pdfUrl: pdfUrl,
        printedTrees: unprintedTrees.length,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
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
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
});
