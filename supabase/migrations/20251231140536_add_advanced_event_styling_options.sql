/*
  # Advanced Event Styling Options

  1. Changes
    - Add advanced typography and styling fields to home_events table
      - title_font_family: Font family for title (e.g., 'SF Pro Display', 'Inter', 'Montserrat')
      - title_font_weight: Font weight for title (300-900)
      - title_font_size: Font size for title (e.g., '3xl', '4xl', '5xl')
      - title_letter_spacing: Letter spacing (e.g., 'tight', 'normal', 'wide')
      - title_text_transform: Text transform (e.g., 'uppercase', 'lowercase', 'capitalize', 'none')
      - subtitle_font_family: Font family for subtitle
      - subtitle_font_weight: Font weight for subtitle
      - subtitle_font_size: Font size for subtitle
      - description_font_size: Font size for description
      - card_height: Custom card height (e.g., '400px', '450px', '500px')
      - overlay_opacity: Overlay opacity (0-100)
      - show_author_badge: Show/hide author badge
      - custom_css_classes: Additional custom CSS classes
  
  2. Security
    - Uses existing RLS policies from home_events table
*/

-- Add advanced styling columns to home_events table
DO $$
BEGIN
  -- Title styling
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'home_events' AND column_name = 'title_font_family'
  ) THEN
    ALTER TABLE home_events ADD COLUMN title_font_family TEXT DEFAULT 'SF Pro Display';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'home_events' AND column_name = 'title_font_weight'
  ) THEN
    ALTER TABLE home_events ADD COLUMN title_font_weight INTEGER DEFAULT 900 CHECK (title_font_weight >= 100 AND title_font_weight <= 900);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'home_events' AND column_name = 'title_font_size'
  ) THEN
    ALTER TABLE home_events ADD COLUMN title_font_size TEXT DEFAULT '3xl';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'home_events' AND column_name = 'title_letter_spacing'
  ) THEN
    ALTER TABLE home_events ADD COLUMN title_letter_spacing TEXT DEFAULT 'tight';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'home_events' AND column_name = 'title_text_transform'
  ) THEN
    ALTER TABLE home_events ADD COLUMN title_text_transform TEXT DEFAULT 'uppercase';
  END IF;

  -- Subtitle styling
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'home_events' AND column_name = 'subtitle_font_family'
  ) THEN
    ALTER TABLE home_events ADD COLUMN subtitle_font_family TEXT DEFAULT 'Inter';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'home_events' AND column_name = 'subtitle_font_weight'
  ) THEN
    ALTER TABLE home_events ADD COLUMN subtitle_font_weight INTEGER DEFAULT 400 CHECK (subtitle_font_weight >= 100 AND subtitle_font_weight <= 900);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'home_events' AND column_name = 'subtitle_font_size'
  ) THEN
    ALTER TABLE home_events ADD COLUMN subtitle_font_size TEXT DEFAULT 'sm';
  END IF;

  -- Description styling
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'home_events' AND column_name = 'description_font_size'
  ) THEN
    ALTER TABLE home_events ADD COLUMN description_font_size TEXT DEFAULT 'sm';
  END IF;

  -- Card styling
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'home_events' AND column_name = 'card_height'
  ) THEN
    ALTER TABLE home_events ADD COLUMN card_height TEXT DEFAULT '450px';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'home_events' AND column_name = 'overlay_opacity'
  ) THEN
    ALTER TABLE home_events ADD COLUMN overlay_opacity INTEGER DEFAULT 70 CHECK (overlay_opacity >= 0 AND overlay_opacity <= 100);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'home_events' AND column_name = 'show_author_badge'
  ) THEN
    ALTER TABLE home_events ADD COLUMN show_author_badge BOOLEAN DEFAULT true;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'home_events' AND column_name = 'custom_css_classes'
  ) THEN
    ALTER TABLE home_events ADD COLUMN custom_css_classes TEXT DEFAULT '';
  END IF;
END $$;