/*
  # Fix booking activity log trigger

  1. Changes
    - Drop the broken log_booking_activity trigger and function
    - These were causing UPDATE statements to fail
  
  2. Notes
    - The activity_log table is missing the 'details' column
    - Removing trigger for now to unblock bookings updates
*/

-- Drop the trigger
DROP TRIGGER IF EXISTS log_booking_changes ON bookings;

-- Drop the function
DROP FUNCTION IF EXISTS log_booking_activity();
