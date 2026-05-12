/*
  # Extend Home News Boxes with Advanced Styling

  1. Changes
    - Add advanced typography and styling fields to home_news_boxes table
      - heading_font_family: Font family for heading
      - heading_font_weight: Font weight for heading
      - heading_font_size: Font size for heading
      - heading_letter_spacing: Letter spacing for heading
      - heading_text_transform: Text transform for heading
      - heading_color: Custom heading color
      - description_font_family: Font family for description
      - description_font_weight: Font weight for description
      - description_font_size: Font size for description
      - description_color: Custom description color
      - button_style: Button style (solid, outline, gradient)
      - button_color: Button custom color
      - button_text_color: Button text color
      - background_type: Background style (transparent, solid, gradient)
      - background_color: Background color
      - background_gradient_from: Gradient from color
      - background_gradient_to: Gradient to color
      - border_style: Border style (none, solid, gradient)
      - border_color: Border color
      - custom_css_classes: Custom CSS classes
  
  2. Security
    - Uses existing RLS policies from home_news_boxes table
*/

DO $$
BEGIN
  -- Heading styling
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'home_news_boxes' AND column_name = 'heading_font_family') THEN
    ALTER TABLE home_news_boxes ADD COLUMN heading_font_family TEXT DEFAULT 'SF Pro Display';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'home_news_boxes' AND column_name = 'heading_font_weight') THEN
    ALTER TABLE home_news_boxes ADD COLUMN heading_font_weight INTEGER DEFAULT 700 CHECK (heading_font_weight >= 100 AND heading_font_weight <= 900);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'home_news_boxes' AND column_name = 'heading_font_size') THEN
    ALTER TABLE home_news_boxes ADD COLUMN heading_font_size TEXT DEFAULT '2xl';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'home_news_boxes' AND column_name = 'heading_letter_spacing') THEN
    ALTER TABLE home_news_boxes ADD COLUMN heading_letter_spacing TEXT DEFAULT 'normal';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'home_news_boxes' AND column_name = 'heading_text_transform') THEN
    ALTER TABLE home_news_boxes ADD COLUMN heading_text_transform TEXT DEFAULT 'none';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'home_news_boxes' AND column_name = 'heading_color') THEN
    ALTER TABLE home_news_boxes ADD COLUMN heading_color TEXT DEFAULT '#000000';
  END IF;

  -- Description styling
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'home_news_boxes' AND column_name = 'description_font_family') THEN
    ALTER TABLE home_news_boxes ADD COLUMN description_font_family TEXT DEFAULT 'Inter';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'home_news_boxes' AND column_name = 'description_font_weight') THEN
    ALTER TABLE home_news_boxes ADD COLUMN description_font_weight INTEGER DEFAULT 400 CHECK (description_font_weight >= 100 AND description_font_weight <= 900);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'home_news_boxes' AND column_name = 'description_font_size') THEN
    ALTER TABLE home_news_boxes ADD COLUMN description_font_size TEXT DEFAULT 'sm';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'home_news_boxes' AND column_name = 'description_color') THEN
    ALTER TABLE home_news_boxes ADD COLUMN description_color TEXT DEFAULT '#666666';
  END IF;

  -- Button styling
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'home_news_boxes' AND column_name = 'button_style') THEN
    ALTER TABLE home_news_boxes ADD COLUMN button_style TEXT DEFAULT 'solid' CHECK (button_style IN ('solid', 'outline', 'gradient'));
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'home_news_boxes' AND column_name = 'button_color') THEN
    ALTER TABLE home_news_boxes ADD COLUMN button_color TEXT DEFAULT '#facc15';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'home_news_boxes' AND column_name = 'button_text_color') THEN
    ALTER TABLE home_news_boxes ADD COLUMN button_text_color TEXT DEFAULT '#000000';
  END IF;

  -- Background styling
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'home_news_boxes' AND column_name = 'background_type') THEN
    ALTER TABLE home_news_boxes ADD COLUMN background_type TEXT DEFAULT 'transparent' CHECK (background_type IN ('transparent', 'solid', 'gradient'));
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'home_news_boxes' AND column_name = 'background_color') THEN
    ALTER TABLE home_news_boxes ADD COLUMN background_color TEXT DEFAULT '#ffffff';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'home_news_boxes' AND column_name = 'background_gradient_from') THEN
    ALTER TABLE home_news_boxes ADD COLUMN background_gradient_from TEXT DEFAULT '#ffffff';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'home_news_boxes' AND column_name = 'background_gradient_to') THEN
    ALTER TABLE home_news_boxes ADD COLUMN background_gradient_to TEXT DEFAULT '#f3f4f6';
  END IF;

  -- Border styling
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'home_news_boxes' AND column_name = 'border_style') THEN
    ALTER TABLE home_news_boxes ADD COLUMN border_style TEXT DEFAULT 'none' CHECK (border_style IN ('none', 'solid', 'gradient'));
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'home_news_boxes' AND column_name = 'border_color') THEN
    ALTER TABLE home_news_boxes ADD COLUMN border_color TEXT DEFAULT '#e5e7eb';
  END IF;

  -- Custom CSS
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'home_news_boxes' AND column_name = 'custom_css_classes') THEN
    ALTER TABLE home_news_boxes ADD COLUMN custom_css_classes TEXT DEFAULT '';
  END IF;
END $$;