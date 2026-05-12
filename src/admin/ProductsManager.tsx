import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Plus, Edit2, Trash2, Save, X, Upload, Tag, TrendingUp, Package, DollarSign, AlertCircle, Eye, EyeOff, Copy, Star, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';
import ConfirmDialog from './ConfirmDialog';

interface Product {
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
  sku: string;
  is_active: boolean;
  is_featured: boolean;
  tags: string[];
  created_at: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  display_order: number;
}

interface Stats {
  totalProducts: number;
  activeProducts: number;
  totalValue: number;
  lowStock: number;
}

export default function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'products' | 'categories'>('products');
  const [stats, setStats] = useState<Stats>({ totalProducts: 0, activeProducts: 0, totalValue: 0, lowStock: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
  const [deleteProductName, setDeleteProductName] = useState<string>('');
  const [deleteCategoryId, setDeleteCategoryId] = useState<string | null>(null);
  const [deleteCategoryName, setDeleteCategoryName] = useState<string>('');

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (editingProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [editingProduct]);

  const loadData = async () => {
    setLoading(true);
    await Promise.all([loadProducts(), loadCategories()]);
    setLoading(false);
  };

  const loadProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setProducts(data);

      const totalValue = data.reduce((sum, p) => sum + (p.price * p.stock_quantity), 0);
      const lowStock = data.filter(p => p.stock_quantity < 10 && p.stock_quantity > 0).length;
      const activeProducts = data.filter(p => p.is_active).length;

      setStats({
        totalProducts: data.length,
        activeProducts,
        totalValue,
        lowStock
      });
    }
  };

  const loadCategories = async () => {
    const { data } = await supabase
      .from('product_categories')
      .select('*')
      .order('display_order');
    if (data) setCategories(data);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleSaveProduct = async () => {
    if (!editingProduct?.name || !editingProduct?.price) {
      alert('Bitte füllen Sie mindestens Name und Preis aus');
      return;
    }

    const productData = {
      ...editingProduct,
      slug: editingProduct.slug || generateSlug(editingProduct.name),
      price: Number(editingProduct.price),
      compare_at_price: editingProduct.compare_at_price ? Number(editingProduct.compare_at_price) : null,
      stock_quantity: Number(editingProduct.stock_quantity || 0),
      is_active: editingProduct.is_active ?? true,
      is_featured: editingProduct.is_featured ?? false,
      tags: editingProduct.tags || [],
      gallery_images: editingProduct.gallery_images || [],
    };

    if (isCreating) {
      const { error } = await supabase
        .from('products')
        .insert([productData]);
      if (error) {
        alert('Fehler beim Erstellen: ' + error.message);
        return;
      }
    } else if (editingProduct.id) {
      const { error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', editingProduct.id);
      if (error) {
        alert('Fehler beim Aktualisieren: ' + error.message);
        return;
      }
    }

    setEditingProduct(null);
    setIsCreating(false);
    loadProducts();
  };

  const handleDeleteProduct = async () => {
    if (!deleteProductId) return;

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', deleteProductId);

    if (error) {
      alert('Fehler beim Löschen: ' + error.message);
      return;
    }

    setDeleteProductId(null);
    setDeleteProductName('');
    loadProducts();
  };

  const handleDuplicateProduct = async (product: Product) => {
    const { id, created_at, slug, sku, ...rest } = product;
    setEditingProduct({
      ...rest,
      name: `${product.name} (Kopie)`,
      slug: '',
      sku: ''
    });
    setIsCreating(true);
  };

  const toggleProductStatus = async (product: Product) => {
    const { error } = await supabase
      .from('products')
      .update({ is_active: !product.is_active })
      .eq('id', product.id);

    if (!error) loadProducts();
  };

  const toggleFeaturedStatus = async (product: Product) => {
    const { error } = await supabase
      .from('products')
      .update({ is_featured: !product.is_featured })
      .eq('id', product.id);

    if (!error) loadProducts();
  };

  const handleCreateCategory = async () => {
    const name = prompt('Kategorie-Name:');
    if (!name) return;

    const { error } = await supabase
      .from('product_categories')
      .insert([{
        name,
        slug: generateSlug(name),
        description: '',
        display_order: categories.length,
      }]);

    if (error) {
      alert('Fehler beim Erstellen: ' + error.message);
      return;
    }

    loadCategories();
  };

  const handleDeleteCategory = async () => {
    if (!deleteCategoryId) return;

    const { error } = await supabase
      .from('product_categories')
      .delete()
      .eq('id', deleteCategoryId);

    if (error) {
      alert('Fehler beim Löschen: ' + error.message);
      return;
    }

    setDeleteCategoryId(null);
    setDeleteCategoryName('');
    loadCategories();
  };

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Bitte nur Bilddateien hochladen');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Bild ist zu groß. Maximal 5MB erlaubt.');
      return;
    }

    setUploadingImage(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setEditingProduct({ ...editingProduct, image_url: reader.result as string });
        };
        reader.readAsDataURL(file);
      } else {
        const { data } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);

        setEditingProduct({ ...editingProduct, image_url: data.publicUrl });
      }
    } catch (error) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingProduct({ ...editingProduct, image_url: reader.result as string });
      };
      reader.readAsDataURL(file);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category_id === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const StatCard = ({ icon: Icon, label, value, color, subtext }: any) => {
    const colors: Record<string, { bg: string; icon: string; border: string }> = {
      blue: { bg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-blue-100' },
      green: { bg: 'bg-green-50', icon: 'text-green-600', border: 'border-green-100' },
      orange: { bg: 'bg-orange-50', icon: 'text-orange-600', border: 'border-orange-100' },
      yellow: { bg: 'bg-amber-50', icon: 'text-amber-600', border: 'border-amber-100' }
    };

    return (
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-br from-white to-gray-100 rounded-[12px] sm:rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
        <div className="relative bg-white/90 backdrop-blur-2xl border border-gray-200/60 rounded-[10px] sm:rounded-[18px] p-3 sm:p-4 lg:p-6 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-lg">
          <div className="flex items-start justify-between mb-2 sm:mb-3 lg:mb-4">
            <div className={`p-2 sm:p-2.5 lg:p-3.5 rounded-[10px] sm:rounded-[12px] lg:rounded-[14px] ${colors[color].bg} ${colors[color].border} border shadow-sm`}>
              <Icon className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${colors[color].icon}`} strokeWidth={2.5} />
            </div>
          </div>
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold mb-0.5 sm:mb-1 text-gray-900 tracking-tight">{value}</p>
          <p className="text-gray-600 text-[10px] sm:text-xs lg:text-sm font-semibold">{label}</p>
          {subtext && <p className="text-gray-500 text-[9px] sm:text-[10px] lg:text-xs mt-1 sm:mt-1.5 font-medium">{subtext}</p>}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-gray-900 tracking-tight">Shop Management</h1>
        <p className="text-gray-600 text-sm sm:text-base lg:text-lg font-medium">Verwalten Sie Produkte, Kategorien und Lagerbestände</p>
      </div>

      {activeTab === 'products' && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            <StatCard
              icon={Package}
              label="Gesamt Produkte"
              value={stats.totalProducts}
              color="blue"
              subtext={`${stats.activeProducts} aktiv`}
            />
            <StatCard
              icon={DollarSign}
              label="Lagerwert"
              value={`€${stats.totalValue.toFixed(0)}`}
              color="green"
            />
            <StatCard
              icon={AlertCircle}
              label="Niedriger Bestand"
              value={stats.lowStock}
              color="orange"
              subtext="< 10 Stück"
            />
            <StatCard
              icon={TrendingUp}
              label="Featured"
              value={products.filter(p => p.is_featured).length}
              color="yellow"
            />
          </div>

          <div className="relative inline-flex gap-1 p-1.5 bg-gray-100/80 backdrop-blur-xl rounded-[12px] sm:rounded-[16px] border border-gray-200/60 shadow-sm mb-4 sm:mb-6">
            <button
              onClick={() => setActiveTab('products')}
              className="relative px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 rounded-[10px] sm:rounded-[12px] font-semibold text-xs sm:text-sm transition-all duration-300 bg-white text-gray-900 shadow-md"
            >
              <span className="relative z-10">Produkte ({products.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className="relative px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 rounded-[10px] sm:rounded-[12px] font-semibold text-xs sm:text-sm transition-all duration-300 text-gray-600 hover:text-gray-900"
            >
              <span className="relative z-10">Kategorien ({categories.length})</span>
            </button>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-100/50 via-purple-100/50 to-pink-100/50 rounded-[18px] sm:rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
            <div className="relative bg-white/90 backdrop-blur-2xl border border-gray-200/60 rounded-[16px] sm:rounded-[20px] p-4 sm:p-6 shadow-lg">
            <div className="flex flex-col gap-2 sm:gap-3 mb-3 sm:mb-4 lg:mb-6">
              <input
                type="text"
                placeholder="Produkte durchsuchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 sm:py-3 bg-white/80 border border-gray-200 rounded-[14px] text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 transition-all font-medium shadow-sm"
              />
              <div className="flex flex-col sm:flex-row gap-3">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full sm:flex-1 px-4 py-2.5 sm:py-3 bg-white/80 border border-gray-200 rounded-[14px] text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 transition-all font-medium shadow-sm"
                >
                  <option value="all">Alle Kategorien</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    setEditingProduct({
                      name: '',
                      description: '',
                      long_description: '',
                      price: 0,
                      stock_quantity: 0,
                      is_active: true,
                      is_featured: false,
                      tags: [],
                      gallery_images: [],
                    });
                    setIsCreating(true);
                  }}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-[14px] font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 active:scale-[0.98] whitespace-nowrap"
                >
                  <Plus size={20} strokeWidth={2.5} />
                  <span>Neues Produkt</span>
                </button>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
              </div>
            ) : (
              <div className="space-y-2 sm:space-y-3">
                {filteredProducts.map(product => (
                  <div key={product.id} className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-[12px] sm:rounded-[18px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur" />
                    <div className="relative bg-white/80 backdrop-blur-xl border border-gray-200/60 rounded-[10px] sm:rounded-[16px] p-3 sm:p-5 hover:bg-white transition-all shadow-sm hover:shadow-md">
                      <div className="flex gap-2 sm:gap-4">
                        <div className="relative flex-shrink-0">
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-cover rounded-[8px] sm:rounded-[12px] border border-gray-200/60 shadow-sm"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="mb-2">
                            <div className="flex items-start gap-1.5 sm:gap-2 mb-1">
                              <h3 className="text-sm sm:text-base lg:text-lg font-bold truncate text-gray-900 flex-1">{product.name}</h3>
                              {!product.is_active && (
                                <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 bg-red-50 text-red-600 rounded font-semibold border border-red-100 flex-shrink-0">Inaktiv</span>
                              )}
                              {product.is_featured && (
                                <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 bg-amber-50 text-amber-600 rounded flex items-center gap-1 font-semibold border border-amber-100 flex-shrink-0">
                                  <Star size={10} className="sm:w-3 sm:h-3" fill="currentColor" />
                                  <span className="hidden sm:inline">Featured</span>
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600 text-xs sm:text-sm truncate font-medium">{product.description}</p>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm mb-2 sm:mb-3">
                            <div>
                              <span className="text-gray-500 block text-[10px] sm:text-xs font-semibold mb-0.5">Preis</span>
                              <p className="font-bold text-gray-900 text-xs sm:text-sm">€{product.price.toFixed(2)}</p>
                            </div>
                            <div>
                              <span className="text-gray-500 block text-[10px] sm:text-xs font-semibold mb-0.5">Lager</span>
                              <p className={`font-bold text-xs sm:text-sm ${product.stock_quantity < 10 ? 'text-orange-600' : 'text-gray-900'}`}>
                                {product.stock_quantity}
                              </p>
                            </div>
                            <div className="hidden sm:block">
                              <span className="text-gray-500 block text-[10px] sm:text-xs font-semibold mb-0.5">SKU</span>
                              <p className="font-mono text-[10px] sm:text-xs text-gray-700 truncate">{product.sku || '-'}</p>
                            </div>
                            <div className="hidden lg:block">
                              <span className="text-gray-500 block text-[10px] sm:text-xs font-semibold mb-0.5">Kategorie</span>
                              <p className="text-[10px] sm:text-xs text-gray-700 font-medium truncate">{categories.find(c => c.id === product.category_id)?.name || '-'}</p>
                            </div>
                            <div className="hidden lg:block">
                              <span className="text-gray-500 block text-[10px] sm:text-xs font-semibold mb-0.5">Wert</span>
                              <p className="font-bold text-gray-900 text-xs sm:text-sm">€{(product.price * product.stock_quantity).toFixed(0)}</p>
                            </div>
                          </div>

                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          <button
                            onClick={() => toggleProductStatus(product)}
                            className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-[8px] sm:rounded-[10px] text-[10px] sm:text-sm font-semibold transition-all flex items-center gap-1 shadow-sm hover:shadow-md active:scale-[0.98] ${
                              product.is_active
                                ? 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
                                : 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                            }`}
                          >
                            {product.is_active ? <Eye size={12} className="sm:w-3.5 sm:h-3.5" strokeWidth={2.5} /> : <EyeOff size={12} className="sm:w-3.5 sm:h-3.5" strokeWidth={2.5} />}
                            <span className="hidden sm:inline">{product.is_active ? 'Aktiv' : 'Inaktiv'}</span>
                          </button>
                          <button
                            onClick={() => toggleFeaturedStatus(product)}
                            className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-[8px] sm:rounded-[10px] text-[10px] sm:text-sm font-semibold transition-all flex items-center gap-1 shadow-sm hover:shadow-md active:scale-[0.98] ${
                              product.is_featured
                                ? 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                            }`}
                          >
                            <Star size={12} className="sm:w-3.5 sm:h-3.5" fill={product.is_featured ? 'currentColor' : 'none'} strokeWidth={2.5} />
                            <span className="hidden sm:inline">Featured</span>
                          </button>
                          <button
                            onClick={() => handleDuplicateProduct(product)}
                            className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-100 hover:bg-gray-200 rounded-[8px] sm:rounded-[10px] text-[10px] sm:text-sm font-semibold transition-all flex items-center gap-1 text-gray-700 border border-gray-200 shadow-sm hover:shadow-md active:scale-[0.98]"
                          >
                            <Copy size={12} className="sm:w-3.5 sm:h-3.5" strokeWidth={2.5} />
                            <span className="hidden md:inline">Duplizieren</span>
                          </button>
                          <button
                            onClick={() => {
                              setEditingProduct(product);
                              setIsCreating(false);
                            }}
                            className="px-2 sm:px-3 py-1 sm:py-1.5 bg-blue-500 hover:bg-blue-600 rounded-[8px] sm:rounded-[10px] text-[10px] sm:text-sm font-semibold transition-all flex items-center gap-1 text-white shadow-sm shadow-blue-500/30 hover:shadow-md hover:shadow-blue-500/40 active:scale-[0.98]"
                          >
                            <Edit2 size={12} className="sm:w-3.5 sm:h-3.5" strokeWidth={2.5} />
                            <span className="hidden sm:inline">Bearbeiten</span>
                          </button>
                          <button
                            onClick={() => {
                              setDeleteProductId(product.id);
                              setDeleteProductName(product.name);
                            }}
                            className="px-2 sm:px-3 py-1 sm:py-1.5 bg-red-500 hover:bg-red-600 rounded-[8px] sm:rounded-[10px] text-[10px] sm:text-sm font-semibold transition-all flex items-center gap-1 text-white shadow-sm shadow-red-500/30 hover:shadow-md hover:shadow-red-500/40 active:scale-[0.98]"
                          >
                            <Trash2 size={12} className="sm:w-3.5 sm:h-3.5" strokeWidth={2.5} />
                            <span className="hidden sm:inline">Löschen</span>
                          </button>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredProducts.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="inline-flex p-4 bg-gray-100 rounded-[16px] mb-4">
                  <Package size={48} className="text-gray-400" strokeWidth={1.5} />
                </div>
                <p className="text-gray-600 text-lg font-semibold">Keine Produkte gefunden</p>
              </div>
            )}
          </div>
        </div>
        </>
      )}

      {activeTab === 'categories' && (
        <>
          <div className="relative inline-flex gap-1 p-1.5 bg-gray-100/80 backdrop-blur-xl rounded-[12px] sm:rounded-[16px] border border-gray-200/60 shadow-sm mb-4 sm:mb-6">
            <button
              onClick={() => setActiveTab('products')}
              className="relative px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 rounded-[10px] sm:rounded-[12px] font-semibold text-xs sm:text-sm transition-all duration-300 text-gray-600 hover:text-gray-900"
            >
              <span className="relative z-10">Produkte ({products.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className="relative px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 rounded-[10px] sm:rounded-[12px] font-semibold text-xs sm:text-sm transition-all duration-300 bg-white text-gray-900 shadow-md"
            >
              <span className="relative z-10">Kategorien ({categories.length})</span>
            </button>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-100/50 via-purple-100/50 to-pink-100/50 rounded-[18px] sm:rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
            <div className="relative bg-white/90 backdrop-blur-2xl border border-gray-200/60 rounded-[16px] sm:rounded-[20px] p-4 sm:p-6 shadow-lg">
              <div className="mb-4 sm:mb-6">
                <button
                  onClick={handleCreateCategory}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-[12px] sm:rounded-[14px] font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 active:scale-[0.98] text-sm sm:text-base"
                >
                  <Plus size={18} strokeWidth={2.5} className="sm:w-5 sm:h-5" />
                  <span>Neue Kategorie</span>
                </button>
              </div>

              <div className="space-y-2 sm:space-y-3">
                {categories.map(category => {
                  const productCount = products.filter(p => p.category_id === category.id).length;
                  return (
                    <div key={category.id} className="group/item relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-[12px] sm:rounded-[18px] opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 blur" />
                      <div className="relative bg-white/80 backdrop-blur-xl border border-gray-200/60 rounded-[10px] sm:rounded-[16px] p-3 sm:p-4 lg:p-5 flex items-center justify-between hover:bg-white transition-all shadow-sm hover:shadow-md">
                        <div className="flex-1 min-w-0 mr-2">
                          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 truncate">{category.name}</h3>
                          <p className="text-gray-600 text-xs sm:text-sm font-medium truncate">
                            <span className="hidden sm:inline">Slug: {category.slug} • </span>{productCount} {productCount === 1 ? 'Produkt' : 'Produkte'}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setDeleteCategoryId(category.id);
                            setDeleteCategoryName(category.name);
                          }}
                          className="flex-shrink-0 p-2 sm:p-2.5 bg-red-500 hover:bg-red-600 rounded-[8px] sm:rounded-[10px] transition-all shadow-sm shadow-red-500/30 hover:shadow-md hover:shadow-red-500/40 active:scale-[0.98]"
                        >
                          <Trash2 size={16} strokeWidth={2.5} className="text-white sm:w-[18px] sm:h-[18px]" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}

      {editingProduct && createPortal(
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(24px)',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          overflow: 'auto'
        }}>
          <div className="w-full max-w-4xl max-h-[calc(100vh-2rem)] bg-white/95 backdrop-blur-2xl rounded-[24px] border border-gray-200/60 shadow-2xl flex flex-col" style={{ margin: 'auto' }}>
              <div className="flex-shrink-0 p-6 border-b border-gray-200 flex items-center justify-between bg-white/95 backdrop-blur-xl rounded-t-[24px]">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                  {isCreating ? 'Neues Produkt' : 'Produkt bearbeiten'}
                </h2>
                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setIsCreating(false);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-[10px] transition-colors text-gray-600 hover:text-gray-900"
                >
                  <X size={24} strokeWidth={2} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Produktname *</label>
                  <input
                    type="text"
                    value={editingProduct.name || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-[14px] text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 transition-all font-medium shadow-sm placeholder-gray-500"
                    placeholder="z.B. Amethyst Heilungsarmband"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">SKU</label>
                  <input
                    type="text"
                    value={editingProduct.sku || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                    className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-[14px] text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 transition-all font-medium shadow-sm placeholder-gray-500"
                    placeholder="z.B. ARM-AME-001"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Kurzbeschreibung</label>
                <input
                  type="text"
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-[14px] text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 transition-all font-medium shadow-sm placeholder-gray-500"
                  placeholder="Kurze Beschreibung für die Produktliste"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Lange Beschreibung</label>
                <textarea
                  value={editingProduct.long_description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, long_description: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-[14px] text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 transition-all font-medium shadow-sm placeholder-gray-500 resize-none"
                  placeholder="Detaillierte Produktbeschreibung"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Preis (€) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingProduct.price || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-[14px] text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 transition-all font-medium shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Vergleichspreis (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingProduct.compare_at_price || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, compare_at_price: Number(e.target.value) || null })}
                    className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-[14px] text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 transition-all font-medium shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Lagerbestand</label>
                  <input
                    type="number"
                    value={editingProduct.stock_quantity || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock_quantity: Number(e.target.value) })}
                    className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-[14px] text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 transition-all font-medium shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Kategorie</label>
                <select
                  value={editingProduct.category_id || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category_id: e.target.value })}
                  className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-[14px] text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 transition-all font-medium shadow-sm"
                >
                  <option value="">Keine Kategorie</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Produktbild</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {editingProduct.image_url ? (
                  <div className="relative group">
                    <div className="relative aspect-video w-full rounded-[16px] overflow-hidden border-2 border-gray-200 shadow-sm">
                      <img
                        src={editingProduct.image_url}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-4 py-2 bg-white/90 hover:bg-white text-gray-900 rounded-[10px] font-semibold text-sm transition-all flex items-center gap-2 shadow-lg active:scale-95"
                        >
                          <Upload size={16} strokeWidth={2.5} />
                          Ändern
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingProduct({ ...editingProduct, image_url: '' })}
                          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-[10px] font-semibold text-sm transition-all flex items-center gap-2 shadow-lg active:scale-95"
                        >
                          <X size={16} strokeWidth={2.5} />
                          Entfernen
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative border-2 border-dashed rounded-[16px] p-12 text-center cursor-pointer transition-all duration-300 ${
                      isDragging
                        ? 'border-blue-500 bg-blue-50 scale-[1.02]'
                        : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                    }`}
                  >
                    {uploadingImage ? (
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
                        <p className="text-gray-600 font-semibold">Wird hochgeladen...</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-4">
                        <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-[16px] border border-blue-200">
                          <ImageIcon size={32} className="text-blue-600" strokeWidth={2} />
                        </div>
                        <div>
                          <p className="text-lg font-bold text-gray-900 mb-1">
                            {isDragging ? 'Jetzt loslassen' : 'Bild hierher ziehen'}
                          </p>
                          <p className="text-sm text-gray-600">
                            oder <span className="text-blue-600 font-semibold">hier klicken</span> zum Auswählen
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF bis zu 5MB</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Tags (kommagetrennt)</label>
                <input
                  type="text"
                  value={editingProduct.tags?.join(', ') || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
                  className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-[14px] text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 transition-all font-medium shadow-sm placeholder-gray-500"
                  placeholder="z.B. Spirituell, Handgefertigt, Energie"
                />
              </div>

              <div className="flex gap-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={editingProduct.is_active ?? true}
                    onChange={(e) => setEditingProduct({ ...editingProduct, is_active: e.target.checked })}
                    className="w-5 h-5 rounded-md accent-blue-500 cursor-pointer"
                  />
                  <span className="text-gray-700 font-semibold group-hover:text-gray-900 transition-colors">Aktiv (sichtbar im Shop)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={editingProduct.is_featured ?? false}
                    onChange={(e) => setEditingProduct({ ...editingProduct, is_featured: e.target.checked })}
                    className="w-5 h-5 rounded-md accent-blue-500 cursor-pointer"
                  />
                  <span className="text-gray-700 font-semibold group-hover:text-gray-900 transition-colors">Featured</span>
                </label>
              </div>
            </div>

            <div className="flex-shrink-0 p-6 border-t border-gray-200 flex justify-end gap-3 bg-white/95 backdrop-blur-xl rounded-b-[24px]">
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsCreating(false);
                }}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-[14px] font-semibold transition-all text-gray-700 active:scale-[0.98]"
              >
                Abbrechen
              </button>
              <button
                onClick={handleSaveProduct}
                disabled={uploadingImage}
                className="px-6 py-3 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-[14px] font-semibold transition-all flex items-center gap-2 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={20} strokeWidth={2.5} />
                Speichern
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      <ConfirmDialog
        isOpen={deleteProductId !== null}
        onClose={() => {
          setDeleteProductId(null);
          setDeleteProductName('');
        }}
        onConfirm={handleDeleteProduct}
        title="Produkt löschen?"
        message={`Möchten Sie das Produkt "${deleteProductName}" wirklich unwiderruflich löschen?`}
        confirmText="Löschen"
        cancelText="Abbrechen"
        variant="danger"
        icon="trash"
      />

      <ConfirmDialog
        isOpen={deleteCategoryId !== null}
        onClose={() => {
          setDeleteCategoryId(null);
          setDeleteCategoryName('');
        }}
        onConfirm={handleDeleteCategory}
        title="Kategorie löschen?"
        message={`Möchten Sie die Kategorie "${deleteCategoryName}" wirklich unwiderruflich löschen? Alle zugehörigen Produkte werden nicht gelöscht.`}
        confirmText="Löschen"
        cancelText="Abbrechen"
        variant="danger"
        icon="trash"
      />
    </div>
  );
}
