import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qqkpsfroqnbzhjbwqdmz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxa3BzZnJvcW5iemhqYndxZG16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYzOTU0MTYsImV4cCI6MjAwMTk3MTQxNn0.9R6IM_Tl0w7khzy5ZFDLvcyVUSy-OyNuY7oMCm8IoeQ";

export const supabase = createClient(supabaseUrl, supabaseKey);
