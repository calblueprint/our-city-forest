### Query Documentation

We interact with Supabase through Database Functions, Edge Functions, and Storage.

#### Development

The supabase client is defined in `src/supabase/client.ts` and can be imported to directly interact with the Supabase API. Wrapper functions for common interactions against the database are defined in various files under `src/supabase`. For interactions against the `trees` table and the `qr-generate` Edge Function, exported functions are defined in `src/supabase/queries.ts`.

#### Working with Edge Functions

We generate QR images through Edge Functions defined under `src/supabase/functions`. For Edge Function implementation details, navigate to the README under that folder. Deployed edge functions are developed and deployed as is in the `functions` folder.

`generateQRImage()` in `src/supabase/queries.ts` is a wrapper function that calls the `qr-generate` Edge Function to generate a QR image. The function takes in a `treeId` as argument and generates and stores the QR to Supabase storage.

For debugging, import relevant Error types with `import { FunctionsHttpError, FunctionsRelayError, FunctionsFetchError } from '@supabase/supabase-js'`. The below snippet may be helpful in debugging:

```typescript
const { data, error } = await supabase.functions.invoke('qr-generate', {
  body: { tree_id: treeId },
});

if (error instanceof FunctionsHttpError) {
  const errorMessage = await error.context.text();
  throw new Error(`FunctionsHttpError: ${errorMessage}$`);
} else if (error instanceof FunctionsRelayError) {
  throw new Error(`FunctionsRelayError: ${error.message}$`);
} else if (error instanceof FunctionsFetchError) {
  throw new Error(`FunctionsFetchError: ${error.message}$`);
} else if (error) {
  throw new Error(`Failed to generate QR code: ${error.message}`);
}
```
