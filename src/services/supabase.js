import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://dndinujwqjbioocdndga.supabase.co';
// Point: this key is safe to use in a browser as it's only a "public" key and it's enabled Row Level Security (RLS) on the tables.
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRuZGludWp3cWpiaW9vY2RuZGdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwMDU5OTgsImV4cCI6MjAxMzU4MTk5OH0.yasfdTw3aK16Vq-mRIk6-fy8IO28SNZfCp21WVxHkq0';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
