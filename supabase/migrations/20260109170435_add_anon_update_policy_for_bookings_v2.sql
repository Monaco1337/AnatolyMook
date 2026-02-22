/*
  # Fix booking updates for admin

  1. Changes
    - Add policy to allow anonymous users (admin without auth) to update bookings
    - This is needed because admin login uses sessionStorage, not Supabase Auth
  
  2. Security
    - In production, you should implement proper Supabase Auth for admin
    - This is a temporary fix for development
*/

-- Drop existing policy if it exists
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Anonymous users can update bookings" ON bookings;
  DROP POLICY IF EXISTS "Anonymous users can delete bookings" ON bookings;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

-- Allow anonymous users to update bookings (for admin functionality)
CREATE POLICY "Anonymous users can update bookings"
  ON bookings
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Allow anonymous users to delete bookings (for admin functionality)  
CREATE POLICY "Anonymous users can delete bookings"
  ON bookings
  FOR DELETE
  TO anon
  USING (true);
