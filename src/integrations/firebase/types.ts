import { User, UserCredential } from "firebase/auth";

export interface Database {
  // Define your Firestore collections here
  artists: {
    id: string;
    bio: string | null;
    created_at: string;
    featured: boolean | null;
    genres: string[] | null;
    is_active: boolean | null;
    name: string;
    photo_url: string | null;
    profile_id: string | null;
    stage_name: string | null;
    updated_at: string;
  };
  productions: {
    id: string;
    title: string;
    description: string | null;
    status: string;
    production_type: string;
    created_at: string;
    updated_at: string;
    user_id: string;
  };
  schedule_bookings: {
    id: string;
    user_id: string;
    title: string;
    description: string | null;
    start_time: string;
    end_time: string;
    created_at: string;
  };
  user_roles: {
    user_id: string;
    role: string;
  };
  radio_tracks: {
    id: string;
    title: string;
    artist: string;
    duration: number;
    file_url: string | null;
    created_at: string;
  };
  radio_playlists: {
    id: string;
    name: string;
    description: string | null;
    created_at: string;
  };
  radio_history: {
    id: string;
    track_id: string;
    played_at: string;
  };
  radio_queue: {
    id: string;
    track_id: string;
    position: number;
  };
  audit_logs: {
    id: string;
    action: string;
    comment: string | null;
    created_at: string;
    new_data: any | null;
    old_data: any | null;
    record_id: string | null;
    table_name: string;
    user_id: string | null;
  };
}