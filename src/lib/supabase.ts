import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Tactical Defaults from Squad Intel
const FALLBACK_URL = 'https://imofjiwswuoguxwgivmh.supabase.co';
const FALLBACK_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imltb2ZpandzdW9ndXh3Z2l2bWhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1Njg5OTMsImV4cCI6MjEwMTE0NDk5M30.8ATXphzYLvKV46z5FxxCLvxMdNjQX5Z9HdiITJwDp4E';

if (!supabaseUrl || !supabaseAnonKey) {
  if (typeof window !== 'undefined') {
    console.warn('Tactical Alert: Using fallback Supabase credentials. Ensure environment variables are set in production.');
  }
}

export const supabase = createClient(
  supabaseUrl || FALLBACK_URL,
  supabaseAnonKey || FALLBACK_ANON_KEY
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
