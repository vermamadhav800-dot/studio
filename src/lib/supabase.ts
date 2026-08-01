import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Supabase Tactical Client
 * Initialized with environment variables for high-performance squad management.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
