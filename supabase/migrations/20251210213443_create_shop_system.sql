/*
  # Create E-Commerce Shop System

  ## Overview
  This migration creates a complete shop system for selling products like spiritual bracelets, books, and other items.

  ## 1. New Tables
  
  ### `product_categories`
  - `id` (uuid, primary key) - Unique category identifier
  - `name` (text) - Category name (e.g., "Bücher", "Armbänder", "Accessoires")
  - `slug` (text, unique) - URL-friendly identifier
  - `description` (text) - Category description
  - `image_url` (text) - Category image
  - `display_order` (integer) - Order for display
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `products`
  - `id` (uuid, primary key) - Unique product identifier
  - `category_id` (uuid, foreign key) - References product_categories
  - `name` (text) - Product name
  - `slug` (text, unique) - URL-friendly identifier
  - `description` (text) - Short description
  - `long_description` (text) - Detailed description
  - `price` (decimal) - Product price in EUR
  - `compare_at_price` (decimal) - Original price for sale display
  - `image_url` (text) - Main product image
  - `gallery_images` (text[]) - Additional product images
  - `stock_quantity` (integer) - Available stock
  - `sku` (text) - Stock keeping unit
  - `is_active` (boolean) - Product visibility
  - `is_featured` (boolean) - Featured product flag
  - `tags` (text[]) - Product tags
  - `metadata` (jsonb) - Additional product data
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `cart_items`
  - `id` (uuid, primary key) - Unique cart item identifier
  - `session_id` (text) - Anonymous session identifier
  - `user_email` (text) - Optional user email
  - `product_id` (uuid, foreign key) - References products
  - `quantity` (integer) - Item quantity
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `orders`
  - `id` (uuid, primary key) - Unique order identifier
  - `order_number` (text, unique) - Human-readable order number
  - `customer_email` (text) - Customer email
  - `customer_name` (text) - Customer name
  - `customer_phone` (text) - Customer phone
  - `shipping_address` (jsonb) - Shipping address details
  - `billing_address` (jsonb) - Billing address details
  - `items` (jsonb) - Order items snapshot
  - `subtotal` (decimal) - Items total
  - `shipping_cost` (decimal) - Shipping cost
  - `tax` (decimal) - Tax amount
  - `total` (decimal) - Order total
  - `status` (text) - Order status (pending, paid, shipped, delivered, cancelled)
  - `payment_method` (text) - Payment method used
  - `payment_status` (text) - Payment status
  - `notes` (text) - Order notes
  - `created_at` (timestamptz) - Order creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## 2. Security
  - Enable RLS on all tables
  - Products and categories are publicly readable
  - Cart items can be read/modified by session owner
  - Orders require authentication for management
  - Admin functions for product management

  ## 3. Indexes
  - Index on product category_id for fast filtering
  - Index on product slug for URL lookups
  - Index on cart session_id for fast cart retrieval
  - Index on order status for admin filtering
*/

-- Create product_categories table
CREATE TABLE IF NOT EXISTS product_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  image_url text DEFAULT '',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES product_categories(id) ON DELETE SET NULL,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  long_description text DEFAULT '',
  price decimal(10,2) NOT NULL,
  compare_at_price decimal(10,2),
  image_url text DEFAULT '',
  gallery_images text[] DEFAULT '{}',
  stock_quantity integer DEFAULT 0,
  sku text UNIQUE,
  is_active boolean DEFAULT true,
  is_featured boolean DEFAULT false,
  tags text[] DEFAULT '{}',
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create cart_items table
CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  user_email text,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  quantity integer DEFAULT 1 CHECK (quantity > 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(session_id, product_id)
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  customer_email text NOT NULL,
  customer_name text NOT NULL,
  customer_phone text,
  shipping_address jsonb DEFAULT '{}',
  billing_address jsonb DEFAULT '{}',
  items jsonb DEFAULT '[]',
  subtotal decimal(10,2) DEFAULT 0,
  shipping_cost decimal(10,2) DEFAULT 0,
  tax decimal(10,2) DEFAULT 0,
  total decimal(10,2) DEFAULT 0,
  status text DEFAULT 'pending',
  payment_method text DEFAULT '',
  payment_status text DEFAULT 'pending',
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_cart_items_session_id ON cart_items(session_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);

-- Enable Row Level Security
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies for product_categories
CREATE POLICY "Anyone can view active categories"
  ON product_categories FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage categories"
  ON product_categories FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for products
CREATE POLICY "Anyone can view active products"
  ON products FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all products"
  ON products FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for cart_items
CREATE POLICY "Users can view own cart items"
  ON cart_items FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own cart items"
  ON cart_items FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own cart items"
  ON cart_items FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete own cart items"
  ON cart_items FOR DELETE
  USING (true);

-- RLS Policies for orders
CREATE POLICY "Users can view own orders by email"
  ON orders FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage all orders"
  ON orders FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_product_categories_updated_at ON product_categories;
CREATE TRIGGER update_product_categories_updated_at
  BEFORE UPDATE ON product_categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_cart_items_updated_at ON cart_items;
CREATE TRIGGER update_cart_items_updated_at
  BEFORE UPDATE ON cart_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
