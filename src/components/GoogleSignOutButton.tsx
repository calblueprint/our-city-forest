import { supabase } from '@/supabase/client';

export default async function signOut() {
  const { error } = await supabase.auth.signOut();
}
