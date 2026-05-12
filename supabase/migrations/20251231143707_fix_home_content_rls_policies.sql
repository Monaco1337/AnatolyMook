/*
  # Fix Home Content RLS Policies for Updates
  
  1. Changes
    - Drop existing overly restrictive policies
    - Create separate, explicit policies for INSERT, SELECT, UPDATE, DELETE
    - Ensure authenticated users can UPDATE home_content without restrictions
    
  2. Security
    - SELECT: Anyone can view active content
    - INSERT/UPDATE/DELETE: Only authenticated users (admin)
    - No additional restrictions on authenticated user actions
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view active home content" ON home_content;
DROP POLICY IF EXISTS "Authenticated users can manage home content" ON home_content;

-- Create new explicit policies
CREATE POLICY "Anyone can view active home content"
  ON home_content
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can insert home content"
  ON home_content
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update home content"
  ON home_content
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete home content"
  ON home_content
  FOR DELETE
  TO authenticated
  USING (true);
