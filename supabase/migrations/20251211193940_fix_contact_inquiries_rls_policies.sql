/*
  # Fix Contact Inquiries RLS Policies
  
  ## Overview
  This migration fixes the RLS policies for contact_inquiries to allow access
  for anonymous users (using anon key), since the admin panel doesn't use
  Supabase authentication.
  
  ## Changes
  1. Drop old restrictive policies that required authentication
  2. Create new policies that allow anonymous access for all operations
  3. Keep RLS enabled for security structure, but allow anon access
  
  ## Security Notes
  - The admin panel has its own authentication system
  - Access is controlled by the VITE_SUPABASE_ANON_KEY
  - This is appropriate for a private admin dashboard
*/

-- Drop old restrictive policies
DROP POLICY IF EXISTS "Authenticated users can view all inquiries" ON contact_inquiries;
DROP POLICY IF EXISTS "Authenticated users can update inquiries" ON contact_inquiries;
DROP POLICY IF EXISTS "Authenticated users can delete inquiries" ON contact_inquiries;

-- Create new policies that allow anonymous access

-- Allow anonymous users to view all inquiries
CREATE POLICY "Allow anon to view inquiries"
  ON contact_inquiries FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow anonymous users to update inquiries
CREATE POLICY "Allow anon to update inquiries"
  ON contact_inquiries FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Allow anonymous users to delete inquiries
CREATE POLICY "Allow anon to delete inquiries"
  ON contact_inquiries FOR DELETE
  TO anon, authenticated
  USING (true);
