/*
  # Create Blocked Time Slots Table

  1. New Tables
    - `blocked_time_slots`
      - `id` (uuid, primary key)
      - `date` (date) - The date for the blocked time slot
      - `start_time` (time) - Start time of the blocked period
      - `end_time` (time) - End time of the blocked period
      - `reason` (text, optional) - Reason for blocking the time
      - `created_at` (timestamptz) - Timestamp when the block was created

  2. Security
    - Enable RLS on `blocked_time_slots` table
    - Add policy for authenticated users to read blocked time slots
    - Add policy for authenticated users to create blocked time slots
    - Add policy for authenticated users to delete their own blocked time slots

  3. Indexes
    - Add index on date for faster queries
*/

CREATE TABLE IF NOT EXISTS blocked_time_slots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  reason text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE blocked_time_slots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read blocked time slots"
  ON blocked_time_slots
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create blocked time slots"
  ON blocked_time_slots
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete blocked time slots"
  ON blocked_time_slots
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_blocked_time_slots_date 
  ON blocked_time_slots(date);
