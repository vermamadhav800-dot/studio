/**
 * TACTICAL DATA TYPES - DUMMY ENGINE
 */

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
