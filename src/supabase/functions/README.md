# Supabase Edge Function Documentation

## Overview

A [Supabase Edge Function](https://supabase.com/docs/guides/functions) is a server-side TypeScript function developed using [Deno](https://deno.com/).

### Environment Variables

Currently, `DENO_SUPABASE_URL` and `DENO_ANON_KEY` are secrets set on the remote project using `supabase secrets set`. These secrets should be accessible by any functions deployed to our Supabase project, and can be used to authenticate with the Supabase API.

### QR Generation

We have an Edge Function to generate a QR code based on a `tree_id`, and store the generated QR png image to our Supabase storage bucket.

#### Local Development & Testing

[Detailed docs](https://supabase.com/docs/guides/functions/quickstart)

Find the working directory first. For us, this should be under `src/`. Make sure you have Docker desktop, since local execution runs on a Docker container.

Run `supabase start` and `supabase functions serve`. Hot-reloading is supported.

Begin development. Local testing can be done via curl in the below format. Be sure to replace `ANON_KEY` with the actual key, and the `tree_id` with a ID that doesn't already have an image created in the Supabase bucket.

```
curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/qr-generate' \
    --header 'Authorization: Bearer ANON_KEY' \
    --header 'Content-Type: application/json' \
    --data '{"tree_id": 123456789}'
```

#### Delpoyment & Production Testing

[Deployment Documentation](https://supabase.com/docs/guides/functions/deploy)

After deploying, the Edge Function should be visible via the Supabase console. You can test the deployed function with the following curl command. Be sure to replace `ANON_KEY` with the actual key, and the `tree_id` with a ID that doesn't already have an image created in the Supabase bucket.

```
curl --request POST 'https://uwgmvckenedkuhmwkqvi.supabase.co/functions/v1/qr-generate' \
  --header 'Authorization: Bearer ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{ "tree_id":"123456789" }'
```

### TS/JS Usage

Reference [Edge Function Invokation Documentation](https://supabase.com/docs/reference/javascript/functions-invoke) for how to call the Edge Function from the client-side.
