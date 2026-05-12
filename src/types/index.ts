export interface Keynote {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  outcomes: string[];
  targetAudience: string[];
  formats: string[];
  videoUrl?: string;
  duration: string;
}

export interface Event {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  agenda: string[];
  outcomes: string[];
  testimonials: Testimonial[];
  vipOptions: string[];
  dates: string;
  location: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  image?: string;
}

export interface CorporateService {
  id: string;
  title: string;
  description: string;
  kpis: string[];
  caseStudy?: {
    company: string;
    challenge: string;
    solution: string;
    results: string[];
  };
}

export interface Resource {
  id: string;
  title: string;
  type: 'ebook' | 'video' | 'audio' | 'pdf' | 'tool';
  description: string;
  downloadUrl: string;
  thumbnail?: string;
}

export interface Product {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string;
  long_description: string;
  price: number;
  compare_at_price: number | null;
  image_url: string;
  gallery_images: string[];
  stock_quantity: number;
  is_featured: boolean;
  tags: string[];
  sku: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
