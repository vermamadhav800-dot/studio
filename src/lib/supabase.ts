import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  if (typeof window !== 'undefined') {
    console.error('Tactical Alert: Missing Supabase Environment Variables.');
  }
}

export const supabase = createClient(
  supabaseUrl || 'https://imofjiwswuoguxwgivmh.supabase.co',
  supabaseAnonKey || 'placeholder'
);

export type Mission = {
  id: string;
  day: string;
  time: string;
  location: string;
  type: string;
};

export type Booking = {
  id: string;
  mission_id: string;
  user_email: string;
  created_at: string;
};
