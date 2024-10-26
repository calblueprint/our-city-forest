// Deno language server setup documentation:
// https://deno.land/manual/getting_started/setup_your_environment

import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { qrcode } from 'https://deno.land/x/qrcode@v2.0.0/mod.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = Deno.env.get('DENO_SUPABASE_URL') as string;
const supabaseServiceKey = Deno.env.get('DENO_ANON_KEY') as string;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

Deno.serve(async (req: Request) => {
  try {
    // expects --data '{"tree_id": 123}'
    const { tree_id } = await req.json();

    if (!tree_id) {
      return new Response(JSON.stringify({ error: 'tree_id is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const qrCodeData = await qrcode(tree_id.toString());

    // Convert data URL to Uint8Array
    const base64Data = qrCodeData.split(',')[1];
    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Upload QR code to Supabase Storage
    const { data, error } = await supabase.storage
      .from('qr_codes')
      .upload(`${tree_id}.png`, bytes, {
        contentType: 'image/png',
      });

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({
        message: 'QR code generated and uploaded successfully',
        data,
      }),
      { headers: { 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

/* To invoke locally, start Supabase and be sure to call with a tree id. BE SURE TO REPLACE ANON_KEY with the actual Supabase anon key.

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/qr-generate' \
    --header 'Authorization: Bearer [ANON_KEY]' \
    --header 'Content-Type: application/json' \
    --data '{"tree_id": 193847756273847}'

*/
