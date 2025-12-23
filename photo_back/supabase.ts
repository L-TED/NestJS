import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cotjqkmctmdrwjeeieyu.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvdGpxa21jdG1kcndqZWVpZXl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0NDIwNzksImV4cCI6MjA4MjAxODA3OX0.TN72dQMs6VNqu-hCMgR5xLl8kCB2RCLfMcDf7fz2PLk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
