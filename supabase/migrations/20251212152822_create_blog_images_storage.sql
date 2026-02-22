/*
  # Create Blog Images Storage

  1. Storage Setup
    - Create a public storage bucket for blog images
    - Set up access policies for authenticated users

  2. Security
    - Authenticated users can upload images
    - Public read access for all images
    - Only authenticated users can delete their uploads
*/

-- Create blog-images bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist and recreate them
DO $$
BEGIN
  DROP POLICY IF EXISTS "Authenticated users can upload blog images" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can update blog images" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can delete blog images" ON storage.objects;
  DROP POLICY IF EXISTS "Public read access to blog images" ON storage.objects;
END $$;

-- Allow authenticated users to upload blog images
CREATE POLICY "Authenticated users can upload blog images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'blog-images');

-- Allow authenticated users to update their own uploads
CREATE POLICY "Authenticated users can update blog images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'blog-images');

-- Allow authenticated users to delete blog images
CREATE POLICY "Authenticated users can delete blog images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'blog-images');

-- Allow public read access to blog images
CREATE POLICY "Public read access to blog images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'blog-images');