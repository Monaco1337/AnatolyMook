/*
  # Add Time Fields to Bookings

  1. Changes
    - Add `event_time` column to bookings (time of event)
    - Add `duration_hours` column to bookings (event duration)
    - Set default values for existing records

  2. Notes
    - Existing bookings will get default time of 10:00
    - Default duration is 2 hours
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bookings' AND column_name = 'event_time'
  ) THEN
    ALTER TABLE bookings ADD COLUMN event_time text DEFAULT '10:00';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bookings' AND column_name = 'duration_hours'
  ) THEN
    ALTER TABLE bookings ADD COLUMN duration_hours integer DEFAULT 2;
  END IF;
END $$;
