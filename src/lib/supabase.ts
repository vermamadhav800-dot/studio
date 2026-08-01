import { createClient } from '@supabase/supabase-js';

// TACTICAL CREDENTIALS - PRIORITIZING ENV VARS WITH HARDCODED FALLBACKS
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://imofjiwswuoguxwgivmh.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imltb2ZpandzdW9ndXh3Z2l2bWhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1Njg5OTMsImV4cCI6MjEwMTE0NDk5M30.8ATXphzYLvKV46z5FxxCLvxMdNjQX5Z9HdiITJwDp4E';

// Initialize Supabase with enhanced fetch settings for resilience
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    fetch: (...args) => fetch(...args).catch(err => {
      console.error('Supabase Network Error:', err);
      throw err;
    })
  }
});

export type Mission = {
  id: string;
  day: string;
  time: string;
  location: string;
  type: string;
  created_at?: string;
};

export type Booking = {
  id: string;
  mission_id: string;
  user_email: string;
  created_at: string;
};

export type ClubStat = {
  id: string;
  label: string;
  value: string;
  icon_name: string;
  sort_order: number;
};
