/*
  # Create Home Images Storage

  1. Storage
    - Create `home-images` bucket for storing all home page images
    - Enable public access for images
  
  2. Security
    - Allow authenticated users to upload images
    - Allow public read access to all images
*/

-- Create storage bucket for home images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'home-images',
  'home-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload home images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'home-images');

-- Allow authenticated users to update images
CREATE POLICY "Authenticated users can update home images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'home-images');

-- Allow authenticated users to delete images
CREATE POLICY "Authenticated users can delete home images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'home-images');

-- Allow public read access
CREATE POLICY "Public can view home images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'home-images');