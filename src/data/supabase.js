import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://tzpvhdiixvehgizkojhk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6cHZoZGlpeHZlaGdpemtvamhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk0NzYzNDAsImV4cCI6MjAxNTA1MjM0MH0.2vkRI0WaVbGrfAExdK4JP2JgbyqkcqMYtjYVV0ni7ZI')
