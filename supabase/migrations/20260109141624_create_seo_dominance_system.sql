/*
  # SEO Dominance System - Global Authority Engine
  
  ## Overview
  Comprehensive SEO system for multi-country, multi-language content dominance
  with AI-search optimization, keyword clustering, and geo-targeting.
  
  ## New Tables
  
  ### 1. `seo_keywords`
  Keyword management with clustering, intent mapping, and geo-variations
  - `id` (uuid, primary key)
  - `keyword` (text, the actual keyword/phrase)
  - `cluster` (text, thematic supercluster assignment)
  - `intent_type` (text, info/decision/action)
  - `priority` (text, head/long-tail/conversational/voice)
  - `language` (text, primary language)
  - `search_volume` (integer, estimated monthly searches)
  - `difficulty` (integer, 1-100)
  - `is_active` (boolean)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### 2. `seo_geo_content`
  Country-specific content variations with cultural context
  - `id` (uuid, primary key)
  - `page_path` (text, canonical page path)
  - `country_code` (text, ISO country code)
  - `language_code` (text, language code)
  - `title` (text, localized title)
  - `description` (text, localized description)
  - `h1` (text, main heading)
  - `content_json` (jsonb, structured content blocks)
  - `cultural_context` (jsonb, cultural adaptations)
  - `is_canonical` (boolean, marks canonical version)
  - `canonical_url` (text, points to canonical)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### 3. `seo_schema_markup`
  Schema.org structured data templates
  - `id` (uuid, primary key)
  - `page_path` (text, page identifier)
  - `schema_type` (text, e.g., Person, Organization, Course)
  - `schema_json` (jsonb, complete schema markup)
  - `language` (text, language code)
  - `is_active` (boolean)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### 4. `seo_meta_tags`
  Centralized meta tag management
  - `id` (uuid, primary key)
  - `page_path` (text, page identifier)
  - `language` (text, language code)
  - `country_code` (text, country targeting)
  - `title` (text, meta title)
  - `description` (text, meta description)
  - `keywords` (text array, target keywords)
  - `og_title` (text, Open Graph title)
  - `og_description` (text, Open Graph description)
  - `og_image` (text, Open Graph image URL)
  - `twitter_card` (text, Twitter card type)
  - `canonical_url` (text, canonical URL)
  - `robots` (text, robots directive)
  - `ai_optimization` (jsonb, AI-specific optimizations)
  - `is_active` (boolean)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### 5. `seo_hreflang_matrix`
  Complete hreflang relationship mapping
  - `id` (uuid, primary key)
  - `page_path` (text, base page path)
  - `language` (text, language code)
  - `country` (text, country code)
  - `url` (text, full URL)
  - `is_default` (boolean, x-default marker)
  - `created_at` (timestamptz)
  
  ### 6. `seo_keyword_clusters`
  Thematic keyword supercluster definitions
  - `id` (uuid, primary key)
  - `cluster_name` (text, cluster identifier)
  - `display_name_de` (text, German display name)
  - `display_name_en` (text, English display name)
  - `description` (text, cluster description)
  - `parent_cluster` (uuid, hierarchical relationship)
  - `priority` (integer, importance ranking)
  - `created_at` (timestamptz)
  
  ### 7. `seo_ai_optimization`
  AI-search specific optimization data
  - `id` (uuid, primary key)
  - `page_path` (text, page identifier)
  - `language` (text, language code)
  - `quick_answer` (text, 40-60 word answer)
  - `definition_block` (text, clear definition)
  - `speakable_content` (text array, voice-friendly sections)
  - `citation_text` (text, AI-citation optimized text)
  - `context_markers` (jsonb, AI context signals)
  - `is_active` (boolean)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### 8. `seo_image_metadata`
  Complete image SEO management
  - `id` (uuid, primary key)
  - `image_path` (text, image file path)
  - `semantic_filename` (text, SEO-optimized filename)
  - `alt_text_de` (text, German ALT text)
  - `alt_text_en` (text, English ALT text)
  - `alt_text_ru` (text, Russian ALT text)
  - `caption_de` (text, German caption)
  - `caption_en` (text, English caption)
  - `caption_ru` (text, Russian caption)
  - `ai_vision_description` (text, AI-vision optimized)
  - `context` (text, usage context)
  - `schema_data` (jsonb, ImageObject schema)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### 9. `seo_performance_tracking`
  SEO metrics and performance monitoring
  - `id` (uuid, primary key)
  - `page_path` (text, page identifier)
  - `country_code` (text, geo-targeting)
  - `keyword` (text, tracked keyword)
  - `ranking_position` (integer, search position)
  - `ai_citation_count` (integer, AI citations)
  - `zero_click_rate` (decimal, zero-click percentage)
  - `voice_search_appearances` (integer, voice results)
  - `tracked_date` (date, measurement date)
  - `created_at` (timestamptz)
  
  ## Security
  - Enable RLS on all tables
  - Public read access for active content
  - Admin-only write access
*/

-- Create keyword clusters table
CREATE TABLE IF NOT EXISTS seo_keyword_clusters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cluster_name text UNIQUE NOT NULL,
  display_name_de text NOT NULL,
  display_name_en text NOT NULL,
  description text,
  parent_cluster uuid REFERENCES seo_keyword_clusters(id),
  priority integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create keywords table
CREATE TABLE IF NOT EXISTS seo_keywords (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword text NOT NULL,
  cluster_id uuid REFERENCES seo_keyword_clusters(id),
  intent_type text CHECK (intent_type IN ('info', 'decision', 'action')) DEFAULT 'info',
  priority text CHECK (priority IN ('head', 'long-tail', 'conversational', 'voice')) DEFAULT 'long-tail',
  language text DEFAULT 'de',
  search_volume integer DEFAULT 0,
  difficulty integer CHECK (difficulty >= 1 AND difficulty <= 100),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create geo content table
CREATE TABLE IF NOT EXISTS seo_geo_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path text NOT NULL,
  country_code text NOT NULL,
  language_code text NOT NULL,
  title text NOT NULL,
  description text,
  h1 text,
  content_json jsonb DEFAULT '{}'::jsonb,
  cultural_context jsonb DEFAULT '{}'::jsonb,
  is_canonical boolean DEFAULT false,
  canonical_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(page_path, country_code, language_code)
);

-- Create schema markup table
CREATE TABLE IF NOT EXISTS seo_schema_markup (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path text NOT NULL,
  schema_type text NOT NULL,
  schema_json jsonb NOT NULL,
  language text DEFAULT 'de',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create meta tags table
CREATE TABLE IF NOT EXISTS seo_meta_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path text NOT NULL,
  language text DEFAULT 'de',
  country_code text,
  title text NOT NULL,
  description text NOT NULL,
  keywords text[] DEFAULT ARRAY[]::text[],
  og_title text,
  og_description text,
  og_image text,
  twitter_card text DEFAULT 'summary_large_image',
  canonical_url text,
  robots text DEFAULT 'index, follow',
  ai_optimization jsonb DEFAULT '{}'::jsonb,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(page_path, language, country_code)
);

-- Create hreflang matrix table
CREATE TABLE IF NOT EXISTS seo_hreflang_matrix (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path text NOT NULL,
  language text NOT NULL,
  country text,
  url text NOT NULL,
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create AI optimization table
CREATE TABLE IF NOT EXISTS seo_ai_optimization (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path text NOT NULL,
  language text DEFAULT 'de',
  quick_answer text,
  definition_block text,
  speakable_content text[] DEFAULT ARRAY[]::text[],
  citation_text text,
  context_markers jsonb DEFAULT '{}'::jsonb,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(page_path, language)
);

-- Create image metadata table
CREATE TABLE IF NOT EXISTS seo_image_metadata (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_path text UNIQUE NOT NULL,
  semantic_filename text,
  alt_text_de text,
  alt_text_en text,
  alt_text_ru text,
  caption_de text,
  caption_en text,
  caption_ru text,
  ai_vision_description text,
  context text,
  schema_data jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create performance tracking table
CREATE TABLE IF NOT EXISTS seo_performance_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path text NOT NULL,
  country_code text,
  keyword text,
  ranking_position integer,
  ai_citation_count integer DEFAULT 0,
  zero_click_rate decimal(5,2),
  voice_search_appearances integer DEFAULT 0,
  tracked_date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_keywords_cluster ON seo_keywords(cluster_id);
CREATE INDEX IF NOT EXISTS idx_keywords_language ON seo_keywords(language);
CREATE INDEX IF NOT EXISTS idx_keywords_active ON seo_keywords(is_active);
CREATE INDEX IF NOT EXISTS idx_geo_content_page ON seo_geo_content(page_path);
CREATE INDEX IF NOT EXISTS idx_geo_content_country ON seo_geo_content(country_code);
CREATE INDEX IF NOT EXISTS idx_meta_tags_page ON seo_meta_tags(page_path);
CREATE INDEX IF NOT EXISTS idx_hreflang_page ON seo_hreflang_matrix(page_path);
CREATE INDEX IF NOT EXISTS idx_performance_page ON seo_performance_tracking(page_path);
CREATE INDEX IF NOT EXISTS idx_performance_date ON seo_performance_tracking(tracked_date);

-- Enable Row Level Security
ALTER TABLE seo_keyword_clusters ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_keywords ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_geo_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_schema_markup ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_meta_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_hreflang_matrix ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_ai_optimization ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_image_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_performance_tracking ENABLE ROW LEVEL SECURITY;

-- Public read policies for active content
CREATE POLICY "Public can read active keyword clusters"
  ON seo_keyword_clusters FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can read active keywords"
  ON seo_keywords FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Public can read geo content"
  ON seo_geo_content FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can read active schema markup"
  ON seo_schema_markup FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Public can read active meta tags"
  ON seo_meta_tags FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Public can read hreflang matrix"
  ON seo_hreflang_matrix FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can read active AI optimization"
  ON seo_ai_optimization FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Public can read image metadata"
  ON seo_image_metadata FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can read performance tracking"
  ON seo_performance_tracking FOR SELECT
  TO public
  USING (true);

-- Admin write policies
CREATE POLICY "Authenticated users can manage keyword clusters"
  ON seo_keyword_clusters FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage keywords"
  ON seo_keywords FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage geo content"
  ON seo_geo_content FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage schema markup"
  ON seo_schema_markup FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage meta tags"
  ON seo_meta_tags FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage hreflang matrix"
  ON seo_hreflang_matrix FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage AI optimization"
  ON seo_ai_optimization FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage image metadata"
  ON seo_image_metadata FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage performance tracking"
  ON seo_performance_tracking FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);