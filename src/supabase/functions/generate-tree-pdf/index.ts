// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import * as PDFLib from "https://cdn.skypack.dev/pdf-lib@1.17.1";
// import { QRCode } from "https://deno.land/x/qrcode/mod.ts";
import { qrcode } from "https://deno.land/x/qrcode/mod.ts";
const PRINTS_BUCKET = "prints";
Deno.serve(async (req)=>{
  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('DENO_SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('DENO_ANON_KEY');
    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(JSON.stringify({
        error: "Supabase environment variables not set"
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    // Fetch unprinted trees from the database
    const { data: unprintedTrees, error } = await supabase.from('trees').select(`
      tree_id,
      tag_id,
      species
    `).eq('printed', false).order('created_at', {
      ascending: true
    });
    if (error) {
      console.error("Error fetching unprinted trees:", error);
      return new Response(JSON.stringify({
        error: "Failed to fetch unprinted trees"
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    if (!unprintedTrees || unprintedTrees.length === 0) {
      return new Response(JSON.stringify({
        message: "No unprinted trees found"
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    // Create a new PDF document
    const pdfDoc = await PDFLib.PDFDocument.create();
    // Process each unprinted tree
    for (const tree of unprintedTrees){
      // Create a new page for each tree
      const page = pdfDoc.addPage([
        600,
        400
      ]);
      const { width, height } = page.getSize();
      const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);
      // Add tree information
      page.drawText(`Tree ID: ${tree.tree_id || "N/A"}`, {
        x: 50,
        y: height - 50,
        size: 16,
        font: boldFont
      });
      page.drawText(`Tag ID: ${tree.tag_id || "N/A"}`, {
        x: 50,
        y: height - 80,
        size: 14,
        font: font
      });
      page.drawText(`Species: ${tree.species || "Unknown"}`, {
        x: 50,
        y: height - 110,
        size: 14,
        font: font
      });
      try {
        const treeIdString = String(tree.tree_id);
  
        // Get base64 QR code image (this returns a data URL with a GIF)
        const base64QRCode = await qrcode(treeIdString, {
          size: 200,
          margin: 10
        });
        
        // Extract the MIME type from the data URL
        const mimeMatch = base64QRCode.match(/^data:([^;]+);base64,/);
        const mimeType = mimeMatch ? mimeMatch[1] : 'image/gif'; // Default to GIF if not found
        
        // Convert base64 to binary
        const base64Data = base64QRCode.split(',')[1];
        const binaryString = atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        
        // Use the correct embedder based on mime type
        let embeddedQrCode;
        if (mimeType === 'image/gif') {
          // For GIF, convert to PNG first or use another library
          console.log("Embedding GIF");
          embeddedQrCode = await pdfDoc.embedPng(bytes);
        } else if (mimeType === 'image/jpeg' || mimeType === 'image/jpg') {
          embeddedQrCode = await pdfDoc.embedJpg(bytes);
        } else if (mimeType === 'image/png') {
          embeddedQrCode = await pdfDoc.embedPng(bytes);
        } else {
          throw new Error(`Unsupported image type: ${mimeType}`);
        }
      

        const qrCodeDims = embeddedQrCode.scale(0.75); // Scale the image as needed
        // Draw the QR code image on the page
        page.drawImage(embeddedQrCode, {
          x: width - qrCodeDims.width - 50,
          y: height - qrCodeDims.height - 50,
          width: qrCodeDims.width,
          height: qrCodeDims.height
        });
        // Add a label beneath the QR code
        page.drawText(`Tree ID: ${treeIdString}`, {
          x: width - qrCodeDims.width - 30,
          y: height - qrCodeDims.height - 70,
          size: 10,
          font: font
        });
      } catch (imgError) {
        console.error(`Error generating QR code for tree ${tree.tree_id}:`, imgError);
        // Add error message to PDF instead
        page.drawText(`QR Code Error: ${imgError.message}`, {
          x: width - 200,
          y: height - 100,
          size: 12,
          font: font,
          color: PDFLib.rgb(1, 0, 0)
        });
      }
    }
    // Save the PDF
    const pdfBytes = await pdfDoc.save();
    // Generate a unique filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `unprinted_trees_${timestamp}.pdf`;
    // Upload the PDF to the PRINTS_BUCKET
    const { data: uploadData, error: uploadError } = await supabase.storage.from(PRINTS_BUCKET).upload(filename, pdfBytes, {
      contentType: 'application/pdf',
      upsert: false
    });
    if (uploadError) {
      console.error("Error uploading PDF to storage:", uploadError);
      return new Response(JSON.stringify({
        error: "Failed to save PDF to storage",
        details: uploadError
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    // Get the public URL of the uploaded PDF
    const { data: publicUrlData } = await supabase.storage.from(PRINTS_BUCKET).getPublicUrl(filename);
    const pdfUrl = publicUrlData?.publicUrl;
    // Update the trees in the database to mark them as printed
    const { error: updateError } = await supabase.from('trees').update({
      printed: true
    }).in('tree_id', unprintedTrees.map((tree)=>tree.tree_id));
    if (updateError) {
      console.error("Error updating trees as printed:", updateError);
    }
    // Return success response with PDF URL
    return new Response(JSON.stringify({
      success: true,
      message: `PDF generated for ${unprintedTrees.length} trees and saved to ${PRINTS_BUCKET} bucket`,
      pdfUrl: pdfUrl,
      printedTrees: unprintedTrees.length
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return new Response(JSON.stringify({
      error: "Failed to generate PDF",
      details: error.toString(),
      stack: error.stack
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
});
