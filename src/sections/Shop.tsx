import { useState, useEffect, memo, useCallback, useRef } from 'react';
import { ShoppingCart, Search, X, Plus, Minus, Check, Star, Sparkles, BookOpen, Flower2, Flame, Gem, Watch, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Product, CartItem } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  display_order: number;
}

interface ShopProps {
  cart: CartItem[];
  onAddToCart: (product: Product, quantity?: number) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveFromCart: (productId: string) => void;
  onClearCart: () => void;
  isCartOpen: boolean;
  onCartOpenChange: (open: boolean) => void;
}

interface DeleteConfirmation {
  show: boolean;
  productId: string;
  productName: string;
}

export default function Shop({
  cart,
  onAddToCart,
  onUpdateQuantity,
  onRemoveFromCart,
  onClearCart,
  isCartOpen,
  onCartOpenChange
}: ShopProps) {
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>(() => {
    const cached = localStorage.getItem('shop_products_cache');
    return cached ? JSON.parse(cached) : [];
  });
  const [categories, setCategories] = useState<Category[]>(() => {
    const cached = localStorage.getItem('shop_categories_cache');
    return cached ? JSON.parse(cached) : [];
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; product?: Product }>({ show: false, message: '' });

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('product_categories')
        .select('*')
        .order('display_order');
      if (error) throw error;
      if (data) {
        setCategories(data);
        localStorage.setItem('shop_categories_cache', JSON.stringify(data));
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadProducts = async () => {
    const cachedProducts = localStorage.getItem('shop_products_cache');
    if (cachedProducts) {
      setLoading(false);
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
      if (data) {
        setProducts(data);
        localStorage.setItem('shop_products_cache', JSON.stringify(data));
        setLoading(false);
      }
    } catch (error) {
      console.error('Error loading products:', error);
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category_id === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = useCallback((product: Product, quantity: number = 1) => {
    onAddToCart(product, quantity);
    setToast({ show: true, message: t.shop.addedToCart, product });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  }, [onAddToCart]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          -webkit-tap-highlight-color: transparent;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes slide-in-bottom {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-glow-pulse { animation: glow-pulse 3s ease-in-out infinite; }
        .animate-slide-in { animation: slide-in-bottom 0.3s ease-out; }
        .luxury-gradient {
          background: linear-gradient(135deg,
            #FDFAF5 0%,
            #F8F3EB 25%,
            #FFF9F0 50%,
            #F5EFE7 75%,
            #FAF6F1 100%
          );
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(212, 175, 55, 0.1);
        }
        .gold-glow {
          box-shadow: 0 0 40px rgba(212, 175, 55, 0.15),
                      0 8px 32px rgba(212, 175, 55, 0.1);
        }
        .product-card {
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                      box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          backface-visibility: hidden;
          transform: translate3d(0, 0, 0);
          content-visibility: auto;
          contain-intrinsic-size: 300px 500px;
          contain: layout style paint;
        }
        .product-card:hover {
          transform: translate3d(0, -12px, 0);
          box-shadow: 0 20px 60px rgba(212, 175, 55, 0.25),
                      0 10px 30px rgba(0, 0, 0, 0.08);
        }
        .product-image {
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          backface-visibility: hidden;
          transform: translate3d(0, 0, 0);
          image-rendering: -webkit-optimize-contrast;
        }
        .product-card:hover .product-image {
          transform: translate3d(0, 0, 0) scale(1.1);
        }
        @media (prefers-reduced-motion: reduce) {
          .product-card,
          .product-image {
            transition: none !important;
            animation: none !important;
          }
        }
        .category-pill {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .category-pill::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent);
          transition: left 0.5s;
        }
        .category-pill:hover::before {
          left: 100%;
        }
        .search-glow:focus {
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.2),
                      0 4px 20px rgba(212, 175, 55, 0.15);
        }
        .floating-cart {
          position: fixed;
          bottom: 32px;
          right: 32px;
          z-index: 85;
          animation: float 6s ease-in-out infinite;
        }
        .cart-glow {
          background: linear-gradient(135deg, #D4AF37 0%, #F5E6D3 100%);
          box-shadow: 0 8px 32px rgba(212, 175, 55, 0.4),
                      0 4px 16px rgba(212, 175, 55, 0.3),
                      inset 0 2px 4px rgba(255, 255, 255, 0.5);
        }
        .shimmer-text {
          background: linear-gradient(90deg,
            #8B7355 0%,
            #D4AF37 25%,
            #F5E6D3 50%,
            #D4AF37 75%,
            #8B7355 100%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
        .luxury-border {
          position: relative;
        }
        .luxury-border::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, #D4AF37, #F5E6D3, #D4AF37);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .luxury-border:hover::after {
          opacity: 1;
        }
      `}</style>

      <div className="luxury-gradient min-h-screen">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl animate-glow-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="relative z-10 max-w-[2000px] mx-auto px-6 lg:px-16 pt-32 pb-32">
          <div className="text-center mb-20">
            <h1 className="text-6xl md:text-7xl font-light mb-6 tracking-tight">
              <span className="shimmer-text">{t.shop.title}</span>
            </h1>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto font-light leading-relaxed">
              {t.shop.subtitle}
            </p>
          </div>

          <div className="mb-20">
            <div className="relative w-full max-w-4xl mx-auto mb-12">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/30 via-amber-500/30 to-amber-600/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center">
                  <Sparkles className="absolute left-7 text-amber-600/60 group-hover:text-amber-600 transition-colors duration-300" size={24} />
                  <input
                    type="text"
                    placeholder={t.shop.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-20 pl-20 pr-20 glass-card rounded-3xl text-lg text-stone-800 placeholder-stone-400/80 border-0 focus:outline-none search-glow transition-all duration-500 hover:shadow-2xl font-light tracking-wide"
                  />
                  <Search className="absolute right-7 text-amber-600/40 group-hover:text-amber-600/60 transition-colors duration-300" size={24} />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 max-w-6xl mx-auto">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`group relative px-6 py-4 rounded-2xl font-medium text-sm transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-br from-amber-600 via-amber-500 to-amber-600 text-white shadow-xl shadow-amber-500/50'
                    : 'glass-card text-stone-700 hover:shadow-lg'
                }`}
              >
                {selectedCategory === 'all' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-amber-600/20 rounded-2xl blur-md" />
                )}
                <div className="relative flex items-center gap-2.5">
                  <Sparkles
                    size={18}
                    className={`transition-all duration-300 ${
                      selectedCategory === 'all'
                        ? 'text-white'
                        : 'text-amber-600/70 group-hover:text-amber-600 group-hover:scale-110'
                    }`}
                  />
                  <span className="tracking-wide">{t.shop.categories.all}</span>
                </div>
              </button>
              {categories.map(category => {
                const iconMap: Record<string, any> = {
                  'spiritual-bracelets': Watch,
                  'books': BookOpen,
                  'meditation-yoga': Flower2,
                  'incense': Flame,
                  'crystals': Gem,
                  'accessories': Star
                };
                const Icon = iconMap[category.slug] || Star;
                const isActive = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`group relative px-6 py-4 rounded-2xl font-medium text-sm transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 ${
                      isActive
                        ? 'bg-gradient-to-br from-amber-600 via-amber-500 to-amber-600 text-white shadow-xl shadow-amber-500/50'
                        : 'glass-card text-stone-700 hover:shadow-lg'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-amber-600/20 rounded-2xl blur-md" />
                    )}
                    <div className="relative flex items-center gap-2.5">
                      <Icon
                        size={18}
                        className={`transition-all duration-300 ${
                          isActive
                            ? 'text-white'
                            : 'text-amber-600/70 group-hover:text-amber-600 group-hover:scale-110'
                        }`}
                      />
                      <span className="tracking-wide">{category.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            style={{
              transform: 'translateZ(0)',
              perspective: '1000px'
            }}
          >
            {loading ? (
              Array.from({ length: 8 }).map((_, idx) => (
                <ProductSkeleton key={idx} />
              ))
            ) : (
              filteredProducts.map((product, idx) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  priority={idx < 4}
                  onAddToCart={handleAddToCart}
                  onViewDetails={setSelectedProduct}
                />
              ))
            )}
          </div>

          {filteredProducts.length === 0 && products.length > 0 && (
            <div className="text-center py-32">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full glass-card gold-glow mb-6">
                <Search size={32} className="text-amber-600" />
              </div>
              <h3 className="text-2xl font-light text-stone-800 mb-3">{t.shop.noProducts}</h3>
              <p className="text-stone-600">{t.shop.noProductsDesc}</p>
            </div>
          )}
        </div>
      </div>

      <div className="floating-cart">
        <button
          onClick={() => onCartOpenChange(true)}
          className="cart-glow w-16 h-16 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 relative"
        >
          <ShoppingCart size={24} strokeWidth={2} />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>

      {isCartOpen && (
        <CartSidebar
          cart={cart}
          onClose={() => onCartOpenChange(false)}
          onUpdateQuantity={onUpdateQuantity}
          onRemove={onRemoveFromCart}
          total={cartTotal}
          onCheckout={() => {
            onCartOpenChange(false);
            setShowCheckout(true);
          }}
        />
      )}

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {showCheckout && (
        <CheckoutModal
          cart={cart}
          total={cartTotal}
          onClose={() => setShowCheckout(false)}
          onComplete={() => {
            onClearCart();
            setShowCheckout(false);
            alert(t.shop.checkout.orderConfirmation);
          }}
        />
      )}

      {toast.show && (
        <div className="fixed bottom-8 right-8 z-[85] animate-slide-in">
          <div className="glass-card rounded-2xl p-5 pr-6 max-w-md shadow-2xl flex items-center gap-4"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              boxShadow: '0 10px 40px rgba(212, 175, 55, 0.3)'
            }}
          >
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Check size={24} className="text-white" strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-stone-900 mb-1">{t.shop.addedToCart}</p>
              <p className="text-xs text-stone-600 line-clamp-1">{toast.product?.name}</p>
            </div>
            <button
              onClick={() => setToast({ show: false, message: '' })}
              className="text-stone-400 hover:text-stone-600 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="glass-card rounded-3xl overflow-hidden">
      <div className="aspect-[4/5] bg-gradient-to-br from-amber-100/30 to-stone-100/30 animate-pulse" />
      <div className="p-6 space-y-3">
        <div className="h-5 bg-amber-100/40 rounded animate-pulse" />
        <div className="h-4 bg-stone-100/40 rounded w-3/4 animate-pulse" />
        <div className="h-6 bg-amber-100/40 rounded w-1/3 animate-pulse" />
      </div>
    </div>
  );
}

const ProductCard = memo(({ product, priority = false, onAddToCart, onViewDetails }: {
  product: Product;
  priority?: boolean;
  onAddToCart: (product: Product, quantity?: number) => void;
  onViewDetails: (product: Product) => void;
}) => {
  const { t } = useLanguage();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isVisible, setIsVisible] = useState(priority);
  const [isAdding, setIsAdding] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '200px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(true);
  }, []);

  const handleCardClick = useCallback(() => {
    onViewDetails(product);
  }, [onViewDetails, product]);

  return (
    <div
      ref={cardRef}
      onClick={handleCardClick}
      className="product-card glass-card rounded-3xl overflow-hidden cursor-pointer luxury-border group"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-amber-50/50 to-stone-50/50">
        {!imageLoaded && isVisible && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-br from-amber-100/30 to-stone-100/30 animate-pulse">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-3 border-amber-300/30 border-t-amber-500/50 rounded-full animate-spin" />
              </div>
            </div>
          </div>
        )}
        {isVisible && !imageError && (
          <img
            src={product.image_url}
            alt={product.name}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            {...(priority ? { fetchpriority: 'high' as any } : {})}
            width="400"
            height="500"
            className={`product-image w-full h-full object-cover ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              imageRendering: '-webkit-optimize-contrast',
              contentVisibility: 'auto',
              transition: 'opacity 0.5s ease-in-out'
            }}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-50 to-stone-50">
            <div className="text-center p-4">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-amber-100 flex items-center justify-center">
                <Sparkles className="text-amber-600" size={28} />
              </div>
              <p className="text-sm text-stone-500">{t.shop.imageNotAvailable}</p>
            </div>
          </div>
        )}
        {product.is_featured && (
          <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg pointer-events-none">
            <Star size={12} fill="currentColor" />
{t.shop.featured}
          </div>
        )}
        {product.compare_at_price && (
          <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-red-500 text-white text-xs font-semibold shadow-lg pointer-events-none">
            {t.shop.sale}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="absolute bottom-6 left-6 right-6">
            {product.stock_quantity > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAdding(true);
                  onAddToCart(product, 1);
                  setTimeout(() => setIsAdding(false), 1500);
                }}
                disabled={isAdding}
                className={`w-full py-3.5 backdrop-blur-sm rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 relative z-10 ${
                  isAdding
                    ? 'bg-green-500 text-white'
                    : 'bg-white/95 text-amber-900 hover:bg-white hover:scale-105'
                }`}
              >
                {isAdding ? (
                  <>
                    <Check size={18} strokeWidth={2.5} className="animate-pulse" />
                    {t.shop.added}
                  </>
                ) : (
                  <>
                    <Plus size={18} strokeWidth={2.5} />
                    {t.shop.addToCart}
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-3">
        <h3 className="text-lg font-medium text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-2 leading-snug">
          {product.name}
        </h3>
        <p className="text-sm text-stone-600 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-amber-900">€{product.price.toFixed(2)}</span>
            {product.compare_at_price && (
              <span className="text-sm text-stone-400 line-through">€{product.compare_at_price.toFixed(2)}</span>
            )}
          </div>
          {product.stock_quantity === 0 && (
            <span className="text-xs text-red-500 font-medium">{t.shop.outOfStock}</span>
          )}
        </div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.product.id === nextProps.product.id &&
         prevProps.product.image_url === nextProps.product.image_url &&
         prevProps.product.price === nextProps.product.price &&
         prevProps.product.stock_quantity === nextProps.product.stock_quantity;
});

function CartSidebar({ cart, onClose, onUpdateQuantity, onRemove, total, onCheckout }: {
  cart: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  total: number;
  onCheckout: () => void;
}) {
  const { t } = useLanguage();
  const shipping = total >= 50 ? 0 : 4.99;
  const finalTotal = total + shipping;
  const [deleteConfirmation, setDeleteConfirmation] = useState<DeleteConfirmation>({ show: false, productId: '', productName: '' });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleDeleteClick = (productId: string, productName: string) => {
    setDeleteConfirmation({ show: true, productId, productName });
  };

  const handleConfirmDelete = () => {
    onRemove(deleteConfirmation.productId);
    setDeleteConfirmation({ show: false, productId: '', productName: '' });
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation({ show: false, productId: '', productName: '' });
  };

  return (
    <div className="fixed inset-0 z-[90]">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />

      <div className="fixed left-0 right-0 top-20 bottom-0 lg:top-20 w-full max-w-full animate-in slide-in-from-bottom duration-500"
        style={{ animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <div className="backdrop-blur-3xl bg-neutral-900/95 lg:bg-white/10 shadow-2xl h-full flex flex-col overflow-hidden lg:max-w-7xl lg:mx-auto">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          <div className="flex-shrink-0 p-4 lg:p-6 border-b border-white/10 backdrop-blur-xl bg-white/5">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-white/15 border border-white/20 backdrop-blur-xl flex items-center justify-center shadow-lg">
                  <ShoppingCart className="w-6 h-6 lg:w-7 lg:h-7 text-white" strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-white text-[18px] sm:text-[22px] font-[600] tracking-[-0.02em] leading-tight">
                    {t.shop.cart.title}
                  </h2>
                  <p className="text-white/60 text-[13px] lg:text-[14px] font-[450]">
                    {cart.length} {cart.length === 1 ? t.shop.cart.item : t.shop.cart.items}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 lg:p-2.5 hover:bg-white/10 rounded-xl transition-all duration-200"
                aria-label={t.shop.close}
              >
                <X className="w-6 h-6 lg:w-7 lg:h-7 text-white/70" strokeWidth={2} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center h-full">
                <div className="w-24 h-24 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl flex items-center justify-center mb-6 shadow-lg">
                  <ShoppingCart size={40} className="text-white/70" strokeWidth={2} />
                </div>
                <p className="text-white/60 text-[16px] font-[450]">{t.shop.cart.empty}</p>
              </div>
            ) : (
              <div className="h-full overflow-y-auto p-4 lg:p-8" style={{
                WebkitOverflowScrolling: 'touch',
                scrollBehavior: 'smooth'
              }}>
                <div className="max-w-3xl mx-auto space-y-4 lg:space-y-5">
                  {cart.map(item => (
                    <div
                      key={item.product.id}
                      className="rounded-xl lg:rounded-2xl border backdrop-blur-xl bg-white/5 border-white/15 hover:bg-white/8 p-3.5 lg:p-5 transition-all duration-300"
                    >
                      <div className="flex gap-3 lg:gap-5">
                        <img
                          src={item.product.image_url}
                          alt={item.product.name}
                          loading="lazy"
                          decoding="async"
                          width="96"
                          height="112"
                          className="w-20 h-24 lg:w-24 lg:h-28 object-cover rounded-lg lg:rounded-xl flex-shrink-0"
                          style={{ imageRendering: '-webkit-optimize-contrast' }}
                        />
                        <div className="flex-1 min-w-0 flex flex-col">
                          <h3 className="text-white text-[14px] lg:text-[16px] font-[500] mb-1.5 lg:mb-2 line-clamp-2 leading-snug">
                            {item.product.name}
                          </h3>
                          <p className="text-amber-500 text-[16px] lg:text-[18px] font-[600] mb-3 lg:mb-4">
                            €{item.product.price.toFixed(2)}
                          </p>
                          <div className="mt-auto flex items-center justify-between gap-3 lg:gap-4">
                            <div className="flex items-center rounded-lg lg:rounded-xl overflow-hidden bg-white/10 border border-white/15">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center hover:bg-white/10 transition-colors"
                              >
                                <Minus size={14} className="text-white/80 lg:hidden" strokeWidth={2} />
                                <Minus size={16} className="text-white/80 hidden lg:block" strokeWidth={2} />
                              </button>
                              <span className="w-10 lg:w-12 text-center text-[13px] lg:text-[14px] font-[600] text-white">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center hover:bg-white/10 transition-colors"
                                disabled={item.quantity >= item.product.stock_quantity}
                              >
                                <Plus size={14} className="text-white/80 lg:hidden" strokeWidth={2} />
                                <Plus size={16} className="text-white/80 hidden lg:block" strokeWidth={2} />
                              </button>
                            </div>
                            <button
                              onClick={() => handleDeleteClick(item.product.id, item.product.name)}
                              className="text-[11px] lg:text-[12px] text-white/50 hover:text-red-400 transition-colors font-[500] px-2 lg:px-3 py-1.5 lg:py-2 hover:bg-white/5 rounded-lg"
                            >
                              {t.shop.cart.remove}
                            </button>
                          </div>
                        </div>
                        <p className="text-amber-500 text-[16px] lg:text-[18px] font-[600] flex-shrink-0">
                          €{(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="backdrop-blur-xl bg-white/10 border border-white/15 rounded-xl lg:rounded-2xl p-4 lg:p-6 mt-6 lg:mt-8">
                    <div className="space-y-3 lg:space-y-4">
                      <div className="flex justify-between text-[14px] lg:text-[15px]">
                        <span className="text-white/60 font-[450]">{t.shop.cart.subtotal}</span>
                        <span className="text-white font-[600]">€{total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-[14px] lg:text-[15px]">
                        <span className="text-white/60 font-[450]">{t.shop.cart.shipping}</span>
                        <span className="text-white font-[600]">
                          {shipping === 0 ? t.shop.cart.freeShipping : `€${shipping.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                      <div className="flex justify-between text-[18px] lg:text-[20px]">
                        <span className="text-white font-[600]">{t.shop.cart.total}</span>
                        <span className="text-amber-500 font-[700]">€{finalTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    <button
                      onClick={onCheckout}
                      className="w-full mt-5 lg:mt-6 px-6 py-3.5 lg:py-4 bg-white hover:bg-white/95 rounded-xl lg:rounded-2xl font-[600] text-[15px] lg:text-[16px] text-black transition-all duration-300 active:scale-[0.97] shadow-lg"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <ShoppingCart className="w-4 h-4 lg:w-5 lg:h-5" strokeWidth={2.5} />
                        {t.shop.cart.checkout}
                      </span>
                    </button>

                    {shipping > 0 && (
                      <p className="text-center text-white/50 text-[11px] lg:text-[12px] font-[450] mt-3 lg:mt-4">
                        {t.shop.cart.freeShippingRemaining.replace('{amount}', `€${(50 - total).toFixed(2)}`)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {deleteConfirmation.show && (
        <DeleteConfirmationDialog
          productName={deleteConfirmation.productName}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

function DeleteConfirmationDialog({ productName, onConfirm, onCancel }: {
  productName: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const { t } = useLanguage();
  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 z-[99999]"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '80px',
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingBottom: '16px',
        overflowY: 'auto'
      }}
      onClick={onCancel}
    >
      <div
        className="relative w-full"
        style={{ maxWidth: '420px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="bg-white dark:bg-neutral-800 rounded-3xl overflow-hidden"
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            border: '2px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="px-6 pt-10 pb-6 text-center">
            <div className="mb-6">
              <div
                className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/10 border-2 border-red-500/20 flex items-center justify-center"
                style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)' }}
              >
                <Trash2 size={48} className="text-red-500" strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                {t.shop.cart.removeItemTitle}
              </h3>
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed px-2">
                {t.shop.cart.removeItemDesc.replace('{product}', productName)}
              </p>
            </div>

            <div className="space-y-3 mt-8">
              <button
                onClick={onConfirm}
                className="w-full rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-lg transition-all duration-200 active:scale-95"
                style={{
                  height: '56px',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)'
                }}
              >
                {t.shop.cart.remove}
              </button>

              <button
                onClick={onCancel}
                className="w-full rounded-xl bg-gray-200 hover:bg-gray-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-gray-900 dark:text-white font-bold text-lg transition-all duration-200 active:scale-95"
                style={{ height: '56px' }}
              >
                {t.shop.cancel}
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={onCancel}
          className="absolute bg-gray-900 hover:bg-black flex items-center justify-center text-white transition-all hover:scale-110"
          style={{
            top: '-12px',
            right: '-12px',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
            border: '3px solid white'
          }}
          aria-label="Schließen"
        >
          <X size={24} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

function ProductDetailModal({ product, onClose, onAddToCart }: {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}) {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(product.image_url);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const images = [product.image_url, ...product.gallery_images].filter(Boolean);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-4 md:p-8 overflow-y-auto animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-6xl glass-card rounded-3xl my-8 gold-glow animate-in slide-in-from-bottom-4 duration-500">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-stone-400 hover:text-amber-700 transition-all"
        >
          <X size={24} strokeWidth={2} />
        </button>

        <div className="grid md:grid-cols-2 gap-12 p-8 md:p-16">
          <div>
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-amber-50 to-stone-50 mb-6 relative">
              {!mainImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-amber-100/30 to-stone-100/30 animate-pulse">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 border-3 border-amber-300/30 border-t-amber-500/50 rounded-full animate-spin" />
                    </div>
                  </div>
                </div>
              )}
              <img
                src={selectedImage}
                alt={product.name}
                loading="eager"
                decoding="async"
                width="600"
                height="750"
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  mainImageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setMainImageLoaded(true)}
                style={{
                  imageRendering: 'auto',
                  contentVisibility: 'auto'
                }}
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setMainImageLoaded(false);
                      setSelectedImage(img);
                    }}
                    className={`aspect-square rounded-xl overflow-hidden transition-all ${
                      selectedImage === img
                        ? 'ring-2 ring-amber-600 opacity-100 scale-105'
                        : 'opacity-50 hover:opacity-80 hover:scale-105'
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      width="150"
                      height="150"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            {product.is_featured && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 text-white text-xs font-semibold w-fit mb-4">
                <Star size={14} fill="currentColor" />
                {t.shop.featuredProduct}
              </div>
            )}
            <h2 className="text-4xl font-light mb-4 text-stone-900 leading-tight">{product.name}</h2>
            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-3xl font-semibold text-amber-900">€{product.price.toFixed(2)}</span>
              {product.compare_at_price && (
                <span className="text-lg text-stone-400 line-through">€{product.compare_at_price.toFixed(2)}</span>
              )}
            </div>

            <p className="text-base text-stone-600 mb-8 leading-relaxed">
              {product.long_description || product.description}
            </p>

            {product.stock_quantity > 0 ? (
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <span className="text-sm text-stone-700 font-medium">{t.shop.quantity}</span>
                  <div className="flex items-center glass-card rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 flex items-center justify-center hover:bg-amber-100/50 transition-colors"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-14 text-center text-base font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                      className="w-12 h-12 flex items-center justify-center hover:bg-amber-100/50 transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsAdding(true);
                    onAddToCart(product, quantity);
                    setTimeout(() => {
                      setIsAdding(false);
                      onClose();
                    }, 800);
                  }}
                  disabled={isAdding}
                  className={`w-full h-14 rounded-xl font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2 ${
                    isAdding
                      ? 'bg-green-500 text-white'
                      : 'bg-gradient-to-r from-amber-600 to-amber-500 text-white hover:from-amber-700 hover:to-amber-600 gold-glow hover:scale-105'
                  }`}
                >
                  {isAdding ? (
                    <>
                      <Check size={20} strokeWidth={2.5} className="animate-pulse" />
                      {t.shop.addedToCart}
                    </>
                  ) : (
                    <>
                      <Plus size={20} strokeWidth={2.5} />
                      {t.shop.addToCartWithQty.replace('{qty}', quantity.toString())}
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="py-4 text-base text-red-500 font-medium">
                {t.shop.currentlyOutOfStock}
              </div>
            )}

            <div className="mt-12 pt-8 border-t border-amber-200/50 space-y-4">
              <div className="flex items-start gap-3 text-sm text-stone-600">
                <Check size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <span>{t.shop.freeShippingOver50}</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-stone-600">
                <Check size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <span>{t.shop.satisfactionGuarantee}</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-stone-600">
                <Check size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <span>{t.shop.securePayment}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckoutModal({ cart, total, onClose, onComplete }: {
  cart: CartItem[];
  total: number;
  onClose: () => void;
  onComplete: () => void;
}) {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    houseNumber: '',
    city: '',
    zip: '',
    country: t.shop.checkout.defaultCountry,
    notes: '',
    paymentMethod: 'card',
    billingAddressSame: true
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const shipping = total >= 50 ? 0 : 4.99;
  const finalTotal = total + shipping;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.email) newErrors.email = t.shop.checkout.errors.emailRequired;
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t.shop.checkout.errors.emailInvalid;
      if (!formData.firstName) newErrors.firstName = t.shop.checkout.errors.firstNameRequired;
      if (!formData.lastName) newErrors.lastName = t.shop.checkout.errors.lastNameRequired;
      if (!formData.street) newErrors.street = t.shop.checkout.errors.streetRequired;
      if (!formData.houseNumber) newErrors.houseNumber = t.shop.checkout.errors.houseNumberRequired;
      if (!formData.city) newErrors.city = t.shop.checkout.errors.cityRequired;
      if (!formData.zip) newErrors.zip = t.shop.checkout.errors.zipRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    setIsProcessing(true);

    try {
      const orderNumber = `ORD-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

      const orderData = {
        order_number: orderNumber,
        customer_email: formData.email,
        customer_name: `${formData.firstName} ${formData.lastName}`,
        customer_phone: formData.phone,
        shipping_address: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          street: formData.street,
          houseNumber: formData.houseNumber,
          city: formData.city,
          zip: formData.zip,
          country: formData.country
        },
        items: cart.map(item => ({
          product_id: item.product.id,
          name: item.product.name,
          image: item.product.image_url,
          quantity: item.quantity,
          price: item.product.price,
          total: item.product.price * item.quantity
        })),
        subtotal: total,
        shipping_cost: shipping,
        total: finalTotal,
        payment_method: formData.paymentMethod,
        payment_status: 'pending',
        status: 'pending',
        notes: formData.notes
      };

      const { error } = await supabase
        .from('orders')
        .insert([orderData]);

      if (error) throw error;

      setTimeout(() => {
        setIsProcessing(false);
        onComplete();
        alert(t.shop.checkout.orderSuccess.replace('{orderNumber}', orderNumber).replace('{email}', formData.email));
      }, 1500);
    } catch (error) {
      console.error('Error creating order:', error);
      setIsProcessing(false);
      alert(t.shop.checkout.orderError);
    }
  };

  const paymentMethods = [
    { id: 'card', name: t.shop.checkout.paymentMethods.card.name, desc: t.shop.checkout.paymentMethods.card.desc },
    { id: 'paypal', name: t.shop.checkout.paymentMethods.paypal.name, desc: t.shop.checkout.paymentMethods.paypal.desc },
    { id: 'klarna', name: t.shop.checkout.paymentMethods.klarna.name, desc: t.shop.checkout.paymentMethods.klarna.desc },
    { id: 'transfer', name: t.shop.checkout.paymentMethods.transfer.name, desc: t.shop.checkout.paymentMethods.transfer.desc }
  ];

  return (
    <div className="fixed inset-0 z-[95]">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />

      <div className="fixed left-0 right-0 top-20 bottom-0 lg:top-20 w-full max-w-full overflow-hidden">
        <div className="backdrop-blur-3xl bg-neutral-900/95 lg:bg-white/10 shadow-2xl h-full flex flex-col lg:max-w-7xl lg:mx-auto">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          <div className="flex-shrink-0 p-4 lg:p-5 border-b border-white/10 backdrop-blur-xl bg-white/5">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-xl bg-white/15 border border-white/20 backdrop-blur-xl flex items-center justify-center shadow-lg">
                  <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6 text-white" strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-white text-[18px] lg:text-[20px] font-[600] tracking-[-0.02em] leading-tight">
                    {t.shop.checkout.title}
                  </h2>
                  <p className="text-white/60 text-[12px] lg:text-[13px] font-[450]">
                    {t.shop.checkout.step.replace('{current}', step.toString()).replace('{total}', '3')}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200"
                aria-label={t.shop.close}
              >
                <X className="w-5 h-5 lg:w-6 lg:h-6 text-white/70" strokeWidth={2} />
              </button>
            </div>

            <div className="max-w-7xl mx-auto mt-4 lg:mt-5">
              <div className="flex items-center gap-1.5 lg:gap-2">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center flex-1">
                    <div className={`flex items-center justify-center w-8 h-8 lg:w-9 lg:h-9 rounded-full transition-all duration-300 text-[14px] lg:text-[16px] ${
                      s === step ? 'bg-white text-black' :
                      s < step ? 'bg-green-500 text-white' :
                      'bg-white/10 text-white/40'
                    }`}>
                      {s < step ? <Check size={16} strokeWidth={2.5} /> : s}
                    </div>
                    {s < 3 && (
                      <div className={`flex-1 h-0.5 mx-1.5 lg:mx-2 transition-all duration-300 ${
                        s < step ? 'bg-green-500' : 'bg-white/10'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-white/60 text-[10px] lg:text-[12px] font-[450]">{t.shop.checkout.deliveryAddress}</span>
                <span className="text-white/60 text-[10px] lg:text-[12px] font-[450]">{t.shop.checkout.payment}</span>
                <span className="text-white/60 text-[10px] lg:text-[12px] font-[450]">{t.shop.checkout.confirmation}</span>
              </div>
            </div>
          </div>

          <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }} className="flex-1 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto scrollbar-thin" style={{ WebkitOverflowScrolling: 'touch' }}>
              <div className="max-w-7xl mx-auto p-4 lg:p-6 pb-[180px] lg:pb-8">
                <div className="grid lg:grid-cols-[1fr_400px] gap-6 lg:gap-8">
                  <div className="space-y-4 lg:space-y-5 min-h-0">
                  {step === 1 && (
                    <div className="space-y-4 lg:space-y-6">
                      <div className="backdrop-blur-xl bg-white/5 border border-white/15 rounded-xl lg:rounded-2xl p-4 lg:p-6">
                        <h3 className="text-white text-[16px] lg:text-[18px] font-[600] mb-4 lg:mb-5">{t.shop.checkout.contactInfo}</h3>
                        <div className="grid sm:grid-cols-2 gap-3 lg:gap-4">
                          <div>
                            <input
                              type="text"
                              placeholder={t.shop.checkout.firstName}
                              value={formData.firstName}
                              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                              className={`w-full h-11 lg:h-12 px-3.5 lg:px-4 backdrop-blur-xl bg-white/10 border ${errors.firstName ? 'border-red-500' : 'border-white/20'} rounded-xl text-[13px] lg:text-[14px] text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-white/30 transition-all`}
                            />
                            {errors.firstName && <p className="text-red-400 text-[11px] lg:text-[12px] mt-1">{errors.firstName}</p>}
                          </div>
                          <div>
                            <input
                              type="text"
                              placeholder={t.shop.checkout.lastName}
                              value={formData.lastName}
                              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                              className={`w-full h-11 lg:h-12 px-3.5 lg:px-4 backdrop-blur-xl bg-white/10 border ${errors.lastName ? 'border-red-500' : 'border-white/20'} rounded-xl text-[13px] lg:text-[14px] text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-white/30 transition-all`}
                            />
                            {errors.lastName && <p className="text-red-400 text-[11px] lg:text-[12px] mt-1">{errors.lastName}</p>}
                          </div>
                        </div>
                        <div className="space-y-3 lg:space-y-4 mt-3 lg:mt-4">
                          <div>
                            <input
                              type="email"
                              placeholder={t.shop.checkout.email}
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className={`w-full h-11 lg:h-12 px-3.5 lg:px-4 backdrop-blur-xl bg-white/10 border ${errors.email ? 'border-red-500' : 'border-white/20'} rounded-xl text-[13px] lg:text-[14px] text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-white/30 transition-all`}
                            />
                            {errors.email && <p className="text-red-400 text-[11px] lg:text-[12px] mt-1">{errors.email}</p>}
                          </div>
                          <input
                            type="tel"
                            placeholder={t.shop.checkout.phone}
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full h-11 lg:h-12 px-3.5 lg:px-4 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl text-[13px] lg:text-[14px] text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-white/30 transition-all"
                          />
                        </div>
                      </div>

                      <div className="backdrop-blur-xl bg-white/5 border border-white/15 rounded-xl lg:rounded-2xl p-4 lg:p-6">
                        <h3 className="text-white text-[16px] lg:text-[18px] font-[600] mb-4 lg:mb-5">{t.shop.checkout.deliveryAddress}</h3>
                        <div className="space-y-3 lg:space-y-4">
                          <div className="grid grid-cols-[1fr_auto] gap-3 lg:gap-4">
                            <div>
                              <input
                                type="text"
                                placeholder={t.shop.checkout.street}
                                value={formData.street}
                                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                                className={`w-full h-11 lg:h-12 px-3.5 lg:px-4 backdrop-blur-xl bg-white/10 border ${errors.street ? 'border-red-500' : 'border-white/20'} rounded-xl text-[13px] lg:text-[14px] text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-white/30 transition-all`}
                              />
                              {errors.street && <p className="text-red-400 text-[11px] lg:text-[12px] mt-1">{errors.street}</p>}
                            </div>
                            <div>
                              <input
                                type="text"
                                placeholder={t.shop.checkout.houseNumber}
                                value={formData.houseNumber}
                                onChange={(e) => setFormData({ ...formData, houseNumber: e.target.value })}
                                className={`w-20 lg:w-24 h-11 lg:h-12 px-3 lg:px-4 backdrop-blur-xl bg-white/10 border ${errors.houseNumber ? 'border-red-500' : 'border-white/20'} rounded-xl text-[13px] lg:text-[14px] text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-white/30 transition-all`}
                              />
                              {errors.houseNumber && <p className="text-red-400 text-[11px] lg:text-[12px] mt-1">{errors.houseNumber}</p>}
                            </div>
                          </div>
                          <div className="grid sm:grid-cols-[1fr_2fr] gap-3 lg:gap-4">
                            <div>
                              <input
                                type="text"
                                placeholder={t.shop.checkout.zip}
                                value={formData.zip}
                                onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                                className={`w-full h-11 lg:h-12 px-3.5 lg:px-4 backdrop-blur-xl bg-white/10 border ${errors.zip ? 'border-red-500' : 'border-white/20'} rounded-xl text-[13px] lg:text-[14px] text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-white/30 transition-all`}
                              />
                              {errors.zip && <p className="text-red-400 text-[11px] lg:text-[12px] mt-1">{errors.zip}</p>}
                            </div>
                            <div>
                              <input
                                type="text"
                                placeholder={t.shop.checkout.city}
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                className={`w-full h-11 lg:h-12 px-3.5 lg:px-4 backdrop-blur-xl bg-white/10 border ${errors.city ? 'border-red-500' : 'border-white/20'} rounded-xl text-[13px] lg:text-[14px] text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-white/30 transition-all`}
                              />
                              {errors.city && <p className="text-red-400 text-[11px] lg:text-[12px] mt-1">{errors.city}</p>}
                            </div>
                          </div>
                          <input
                            type="text"
                            placeholder={t.shop.checkout.country}
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            className="w-full h-11 lg:h-12 px-3.5 lg:px-4 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl text-[13px] lg:text-[14px] text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-white/30 transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="backdrop-blur-xl bg-white/5 border border-white/15 rounded-xl lg:rounded-2xl p-4 lg:p-6">
                      <h3 className="text-white text-[16px] lg:text-[18px] font-[600] mb-4 lg:mb-5">{t.shop.checkout.selectPayment}</h3>
                      <div className="space-y-2.5 lg:space-y-3">
                        {paymentMethods.map((method) => (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                            className={`w-full p-4 lg:p-5 rounded-xl border transition-all duration-300 text-left ${
                              formData.paymentMethod === method.id
                                ? 'bg-white/15 border-white/30'
                                : 'bg-white/5 border-white/15 hover:bg-white/10'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 lg:gap-4">
                                <div className={`w-4 h-4 lg:w-5 lg:h-5 rounded-full border-2 flex items-center justify-center ${
                                  formData.paymentMethod === method.id
                                    ? 'border-white bg-white'
                                    : 'border-white/30'
                                }`}>
                                  {formData.paymentMethod === method.id && (
                                    <div className="w-2.5 h-2.5 rounded-full bg-black" />
                                  )}
                                </div>
                                <div>
                                  <p className="text-white text-[14px] lg:text-[15px] font-[600]">{method.name}</p>
                                  <p className="text-white/50 text-[12px] lg:text-[13px]">{method.desc}</p>
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>

                      <div className="mt-4 lg:mt-6">
                        <textarea
                          placeholder={t.shop.checkout.notes}
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          rows={4}
                          className="w-full px-3.5 lg:px-4 py-2.5 lg:py-3 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl text-[13px] lg:text-[14px] text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-white/30 transition-all resize-none"
                        />
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4 lg:space-y-6">
                      <div className="backdrop-blur-xl bg-white/5 border border-white/15 rounded-xl lg:rounded-2xl p-4 lg:p-6">
                        <h3 className="text-white text-[16px] lg:text-[18px] font-[600] mb-4 lg:mb-5">{t.shop.checkout.orderSummary}</h3>
                        <div className="space-y-3 lg:space-y-4">
                          <div>
                            <p className="text-white/50 text-[12px] lg:text-[13px] mb-1">{t.shop.checkout.deliveryAddress}</p>
                            <p className="text-white text-[14px] lg:text-[15px]">
                              {formData.firstName} {formData.lastName}<br />
                              {formData.street} {formData.houseNumber}<br />
                              {formData.zip} {formData.city}<br />
                              {formData.country}
                            </p>
                          </div>
                          <div>
                            <p className="text-white/50 text-[12px] lg:text-[13px] mb-1">E-Mail</p>
                            <p className="text-white text-[14px] lg:text-[15px]">{formData.email}</p>
                          </div>
                          {formData.phone && (
                            <div>
                              <p className="text-white/50 text-[12px] lg:text-[13px] mb-1">{t.shop.checkout.phoneLabel}</p>
                              <p className="text-white text-[14px] lg:text-[15px]">{formData.phone}</p>
                            </div>
                          )}
                          <div>
                            <p className="text-white/50 text-[12px] lg:text-[13px] mb-1">{t.shop.checkout.paymentMethod}</p>
                            <p className="text-white text-[14px] lg:text-[15px]">
                              {paymentMethods.find(m => m.id === formData.paymentMethod)?.name}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="backdrop-blur-xl bg-white/5 border border-white/15 rounded-xl lg:rounded-2xl p-4 lg:p-6">
                        <h3 className="text-white text-[16px] lg:text-[18px] font-[600] mb-3 lg:mb-4">{t.shop.checkout.yourItems}</h3>
                        <div className="space-y-2.5 lg:space-y-3">
                          {cart.map(item => (
                            <div key={item.product.id} className="flex gap-3 lg:gap-4 p-2.5 lg:p-3 rounded-xl bg-white/5">
                              <img
                                src={item.product.image_url}
                                alt={item.product.name}
                                loading="lazy"
                                decoding="async"
                                width="64"
                                height="80"
                                className="w-14 h-16 lg:w-16 lg:h-20 object-cover rounded-lg flex-shrink-0"
                                style={{ imageRendering: '-webkit-optimize-contrast' }}
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-white text-[13px] lg:text-[14px] font-[500] truncate">{item.product.name}</p>
                                <p className="text-white/50 text-[12px] lg:text-[13px] mt-1">{t.shop.checkout.qty}: {item.quantity}</p>
                              </div>
                              <p className="text-amber-500 text-[14px] lg:text-[15px] font-[600] flex-shrink-0">
                                €{(item.product.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="hidden lg:block lg:sticky lg:top-6 lg:max-h-[calc(100vh-200px)] lg:overflow-y-auto lg:h-fit">
                  <div className="backdrop-blur-xl bg-white/10 border border-white/15 rounded-2xl p-6 shadow-xl">
                    <h3 className="text-white text-[18px] font-[600] mb-6">{t.shop.checkout.summary}</h3>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-[15px]">
                        <span className="text-white/60 font-[450]">{t.shop.cart.subtotal}</span>
                        <span className="text-white font-[600]">€{total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-[15px]">
                        <span className="text-white/60 font-[450]">{t.shop.cart.shipping}</span>
                        <span className="text-white font-[600]">
                          {shipping === 0 ? t.shop.cart.freeShipping : `€${shipping.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent my-3" />
                      <div className="flex justify-between text-[20px]">
                        <span className="text-white font-[600]">{t.shop.cart.total}</span>
                        <span className="text-amber-500 font-[700]">€{finalTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {step < 3 ? (
                        <button
                          type="submit"
                          className="w-full px-6 py-4 bg-white hover:bg-white/95 rounded-2xl font-[600] text-[16px] text-black transition-all duration-300 active:scale-[0.97] shadow-lg"
                        >
                          {t.shop.checkout.continue}
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={isProcessing}
                          className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl font-[600] text-[16px] text-white transition-all duration-300 active:scale-[0.97] shadow-lg"
                        >
                          {isProcessing ? (
                            <span className="flex items-center justify-center gap-2">
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              {t.shop.checkout.processing}
                            </span>
                          ) : (
                            <span className="flex items-center justify-center gap-2">
                              <Check className="w-5 h-5" strokeWidth={2.5} />
                              {t.shop.checkout.placeOrder}
                            </span>
                          )}
                        </button>
                      )}

                      {step > 1 && (
                        <button
                          type="button"
                          onClick={() => setStep(step - 1)}
                          className="w-full px-6 py-3 bg-white/10 hover:bg-white/15 rounded-2xl font-[500] text-[14px] text-white transition-all duration-300"
                        >
                          {t.shop.checkout.back}
                        </button>
                      )}
                    </div>

                    {shipping > 0 && (
                      <p className="text-center text-white/50 text-[12px] font-[450] mt-4">
                        {t.shop.cart.freeShippingRemaining.replace('{amount}', `€${(50 - total).toFixed(2)}`)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            </div>

            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-20 backdrop-blur-3xl bg-neutral-900/98 border-t border-white/15 p-4 shadow-2xl">
              <div className="flex items-center justify-between gap-4 mb-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-[13px] font-[450]">{t.shop.cart.total}</span>
                    <span className="text-amber-500 text-[20px] font-[700]">€{finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {step < 3 ? (
                  <button
                    type="submit"
                    className="w-full px-6 py-3.5 bg-white hover:bg-white/95 rounded-xl font-[600] text-[15px] text-black transition-all duration-300 active:scale-[0.97] shadow-lg"
                  >
                    {t.shop.checkout.continue}
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full px-6 py-3.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-[600] text-[15px] text-white transition-all duration-300 active:scale-[0.97] shadow-lg"
                  >
                    {isProcessing ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {t.shop.checkout.processing}
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Check className="w-5 h-5" strokeWidth={2.5} />
                        {t.shop.checkout.order}
                      </span>
                    )}
                  </button>
                )}

                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="w-full px-6 py-2.5 bg-white/10 hover:bg-white/15 rounded-xl font-[500] text-[13px] text-white transition-all duration-300"
                  >
                    {t.shop.checkout.back}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
