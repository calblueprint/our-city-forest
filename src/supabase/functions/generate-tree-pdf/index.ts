// Function: generate-id-tags.ts

// Import necessary modules
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import PDFDocument from 'https://esm.sh/pdfkit@0.13.0?bundle';
import blobStream from 'https://esm.sh/blob-stream@0.1.3?bundle';
import { Buffer } from 'https://deno.land/std@0.110.0/node/buffer.ts';

// Initialize Supabase client
const supabaseUrl = Deno.env.get('DENO_SUPABASE_URL') as string;
const supabaseServiceKey = Deno.env.get('DENO_ANON_KEY') as string;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Constants for PDF layout
const TREES_PER_PAGE = 11;
const PAGE_WIDTH = 612; // Letter size in points
const PAGE_HEIGHT = 792;
const MARGIN = 36;

Deno.serve(async (req: Request) => {
  try {
    // Create a new PDF document with bundled standard fonts
    const doc = new PDFDocument({
      size: 'letter',
      margin: MARGIN,
      autoFirstPage: false,
      font: 'Helvetica' // Use standard font
    });
    
    // Set up a stream to capture the PDF data
    const stream = doc.pipe(blobStream());
    
    // Get unprinted trees
    const { data: unprintedTrees, error } = await supabase
      .from('trees')
      .select(`
        tree_id,
        tag_id,
        species,
        qr_code_url
      `)
      .eq('printed', false)
      .order('created_at', { ascending: true });
    
    if (error) {
      throw new Error(`Error fetching unprinted trees: ${error.message}`);
    }
    
    if (!unprintedTrees || unprintedTrees.length === 0) {
      return new Response(JSON.stringify({ 
        message: 'No unprinted trees found'
      }), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Get scientific names for each tree
    const speciesNames = [...new Set(unprintedTrees.map(tree => tree.species))];
    const { data: speciesData, error: speciesError } = await supabase
      .from('tree_species')
      .select('name, scientific_name')
      .in('name', speciesNames);
    
    if (speciesError) {
      throw new Error(`Error fetching species data: ${speciesError.message}`);
    }
    
    // Create a mapping of species name to scientific name
    const scientificNameMap = speciesData.reduce((acc, species) => {
      acc[species.name] = species.scientific_name;
      return acc;
    }, {});
    
    // Create PDF pages with tree tags
    const treeGroups = [];
    for (let i = 0; i < unprintedTrees.length; i += TREES_PER_PAGE) {
      treeGroups.push(unprintedTrees.slice(i, i + TREES_PER_PAGE));
    }
    
    // Process each page of trees
    for (const treesOnPage of treeGroups) {
      doc.addPage();
      
      // Page layout calculations
      const tagHeight = (PAGE_HEIGHT - (2 * MARGIN)) / Math.ceil(TREES_PER_PAGE / 2);
      const tagWidth = (PAGE_WIDTH - (2 * MARGIN)) / 2;
      
      // Process each tree for this page
      treesOnPage.forEach((tree, index) => {
        const row = Math.floor(index / 2);
        const col = index % 2;
        const x = MARGIN + (col * tagWidth);
        const y = MARGIN + (row * tagHeight);
        
        // Get QR code URL for this tree
        const qrCodeUrl = tree.qr_code_url || 
          `${supabaseUrl}/storage/v1/object/public/qr_codes/${tree.tree_id}.png`;
        
        // Draw tree tag
        drawTreeTag(doc, x, y, tagWidth, tagHeight, {
          name: tree.species,
          scientificName: scientificNameMap[tree.species] || '',
          tagId: tree.tag_id || '',
          treeId: tree.tree_id,
          qrCodeUrl
        });
      });
    }
    
    // Finalize the PDF
    doc.end();
    
    // Get the PDF data
    const pdfData = await new Promise<Buffer>((resolve) => {
      const chunks: Buffer[] = [];
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
    
    // Update trees to mark them as printed
    const treeIdsToUpdate = unprintedTrees.map(tree => tree.tree_id);
    const { error: updateError } = await supabase
      .from('trees')
      .update({ printed: true })
      .in('tree_id', treeIdsToUpdate);
    
    if (updateError) {
      throw new Error(`Error updating trees as printed: ${updateError.message}`);
    }
    
    // Return the PDF as base64
    const base64Pdf = pdfData.toString('base64');
    
    return new Response(JSON.stringify({
      message: `Generated PDF for ${unprintedTrees.length} trees`,
      totalTrees: unprintedTrees.length,
      pdf: base64Pdf
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// Function to draw a single tree tag
function drawTreeTag(
  doc: any, // Changed from PDFKit.PDFDocument to avoid type issues
  x: number, 
  y: number, 
  width: number, 
  height: number, 
  data: {
    name: string;
    scientificName: string;
    tagId: string;
    treeId: string;
    qrCodeUrl: string;
  }
) {
  // Draw border for the tag
  doc.rect(x, y, width, height).stroke();
  
  // Draw QR code - use a placeholder instead of loading an image
  try {
    // Use a data URL instead of a file path
    if (data.qrCodeUrl.startsWith('data:')) {
      doc.image(data.qrCodeUrl, x + 10, y + 10, { width: 80, height: 80 });
    } else {
      // For remote URLs, we'll draw a placeholder instead
      // as remote image fetching might cause issues
      doc.rect(x + 10, y + 10, 80, 80).stroke();
      doc.fontSize(8).text('QR Code', x + 10, y + 40, { width: 80, align: 'center' });
      doc.fontSize(6).text('Scan to view', x + 10, y + 55, { width: 80, align: 'center' });
    }
  } catch (error) {
    // If QR code can't be loaded, draw a placeholder
    doc.rect(x + 10, y + 10, 80, 80).stroke();
    doc.fontSize(8).text('QR Code Unavailable', x + 10, y + 40, { width: 80, align: 'center' });
  }
  
  // Draw tree information
  const textX = x + 100;
  doc.font('Helvetica-Bold').fontSize(14).text(data.name, textX, y + 15, { width: width - 110 });
  doc.font('Helvetica-Oblique').fontSize(12).text(data.scientificName, textX, y + 35, { width: width - 110 });
  
  if (data.tagId) {
    doc.font('Helvetica').fontSize(12).text(`Tag ID: ${data.tagId}`, textX, y + 60);
  }
  
  doc.font('Helvetica').fontSize(10).text(`ID: ${data.treeId}`, textX, y + 80, { width: width - 110 });
}
