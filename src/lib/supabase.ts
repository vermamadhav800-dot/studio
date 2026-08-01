import { createClient } from '@supabase/supabase-js';

/**
 * SUPABASE TACTICAL ENGINE - HARDCODED FOR ABSOLUTE RELIABILITY
 * Project URL: https://imofjiwswuoguxwgivmhb.supabase.co
 */
const supabaseUrl = 'https://imofjiwswuoguxwgivmhb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imltb2ZpandzdW9ndXh3Z2l2bWhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1Njg5OTMsImV4cCI6MjEwMTE0NDk5M30.8ATXphzYLvKV46z5FxxCLvxMdNjQX5Z9HdiITJwDp4E';

// Initialize with standard options, ensuring no custom fetch wrappers interfere with browser security
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
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
