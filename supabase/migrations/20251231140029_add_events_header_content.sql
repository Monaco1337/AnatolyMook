/*
  # Events Header Content

  1. Changes
    - Add events header section to home_content table
      - heading: Main heading for events section (e.g., "Events, die befreien")
      - highlight: Word to highlight (e.g., "befreien")
      - linkText: Link text (e.g., "Events entdecken")
      - linkTarget: Target section for the link (e.g., "#seminare")
  
  2. Security
    - Uses existing RLS policies from home_content table
*/

-- Insert events header content if it doesn't exist
INSERT INTO home_content (section, content, is_active, display_order)
SELECT 
  'events_header',
  jsonb_build_object(
    'heading', 'Events, die',
    'highlight', 'befreien',
    'linkText', 'Events entdecken',
    'linkTarget', '#seminare'
  ),
  true,
  5
WHERE NOT EXISTS (
  SELECT 1 FROM home_content WHERE section = 'events_header'
);