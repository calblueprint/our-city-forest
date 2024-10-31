import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

// Environment variables pulled from your .env file
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

// Create a single Supabase client instance
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const fetchTreeData = async () => {
  try {
    const { data, error } = await supabase.from('trees').select('*');

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error fetching tree data:', error);
    return null;
  }
};
