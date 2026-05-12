import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Image as ImageIcon, Tag, Calendar, Eye, EyeOff, Star, Upload, FileImage } from 'lucide-react';
import { supabase } from '../lib/supabase';
import ConfirmDialog from './ConfirmDialog';

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  display_order: number;
}

interface BlogPost {
  id?: string;
  category_id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author_name: string;
  author_image: string;
  reading_time: number;
  tags: string[];
  is_published: boolean;
  is_featured: boolean;
  published_at: string;
  views_count: number;
}

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<BlogPost>({
    category_id: '',
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: '',
    author_name: 'Anatoly Mook',
    author_image: '',
    reading_time: 5,
    tags: [],
    is_published: false,
    is_featured: false,
    published_at: new Date().toISOString(),
    views_count: 0
  });
  const [tagInput, setTagInput] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [deleteBlogId, setDeleteBlogId] = useState<string | null>(null);
  const [deleteBlogTitle, setDeleteBlogTitle] = useState<string>('');

  useEffect(() => {
    loadCategories();
    loadPosts();
  }, []);

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('display_order');
      if (error) throw error;
      if (data) setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('published_at', { ascending: false });
      if (error) throw error;
      if (data) setPosts(data);
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPost?.id) {
        const { error } = await supabase
          .from('blog_posts')
          .update(formData)
          .eq('id', editingPost.id);
        if (error) throw error;
        alert('Blog-Post erfolgreich aktualisiert!');
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([formData]);
        if (error) throw error;
        alert('Blog-Post erfolgreich erstellt!');
      }
      resetForm();
      loadPosts();
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Fehler beim Speichern des Posts');
    }
  };

  const handleDelete = (id: string, title: string) => {
    setDeleteBlogId(id);
    setDeleteBlogTitle(title);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteBlogId) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', deleteBlogId);
      if (error) throw error;
      setDeleteBlogId(null);
      setDeleteBlogTitle('');
      loadPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Fehler beim Löschen des Posts');
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData(post);
    setIsCreating(true);
  };

  const resetForm = () => {
    setFormData({
      category_id: '',
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      featured_image: '',
      author_name: 'Anatoly Mook',
      author_image: '',
      reading_time: 5,
      tags: [],
      is_published: false,
      is_featured: false,
      published_at: new Date().toISOString(),
      views_count: 0
    });
    setEditingPost(null);
    setIsCreating(false);
    setTagInput('');
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title)
    });
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  const handleContentChange = (content: string) => {
    setFormData({
      ...formData,
      content,
      reading_time: estimateReadingTime(content)
    });
  };

  const uploadImage = async (file: File) => {
    try {
      setUploadingImage(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      setFormData({ ...formData, featured_image: publicUrl });
      setUploadingImage(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Fehler beim Hochladen des Bildes');
      setUploadingImage(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        uploadImage(file);
      } else {
        alert('Bitte nur Bilddateien hochladen');
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        uploadImage(file);
      } else {
        alert('Bitte nur Bilddateien hochladen');
      }
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Verwalten Sie Ihre Blog-Artikel</p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors whitespace-nowrap"
        >
          <Plus size={20} />
          <span>Neuer Blog-Post</span>
        </button>
      </div>

      {isCreating ? (
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-br from-amber-400/20 via-orange-400/20 to-rose-400/20 rounded-2xl blur-2xl" />
          <div className="relative bg-white rounded-xl shadow-xl border border-gray-200/60 overflow-hidden">
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 sm:p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
                    <FileImage className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                      {editingPost ? 'Blog-Post bearbeiten' : 'Neuer Blog-Post'}
                    </h2>
                    <p className="text-xs sm:text-sm text-amber-50/80 mt-0.5">
                      Erstellen Sie ansprechende Inhalte für Ihre Leser
                    </p>
                  </div>
                </div>
                <button
                  onClick={resetForm}
                  type="button"
                  className="p-1.5 sm:p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg transition-all hover:scale-105"
                >
                  <X size={20} className="sm:w-5 sm:h-5" strokeWidth={2.5} />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6 lg:space-y-7">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
              <div className="group">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                  Titel *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all hover:border-amber-400 bg-white shadow-sm placeholder:text-gray-400"
                  placeholder="Der Titel Ihres Blog-Posts"
                />
              </div>

              <div className="group">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                  Slug (URL) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all hover:border-amber-400 bg-white shadow-sm font-mono placeholder:text-gray-400"
                  placeholder="url-freundlicher-name"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
              <div className="group">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                  Kategorie *
                </label>
                <select
                  required
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all hover:border-amber-400 bg-white shadow-sm"
                >
                  <option value="">Kategorie wählen...</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="group">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  Autor
                </label>
                <input
                  type="text"
                  value={formData.author_name}
                  onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all hover:border-amber-400 bg-white shadow-sm placeholder:text-gray-400"
                  placeholder="Autor Name"
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                Kurzbeschreibung / Excerpt *
              </label>
              <textarea
                required
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={3}
                className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all hover:border-amber-400 bg-white shadow-sm resize-none placeholder:text-gray-400"
                placeholder="Eine kurze Zusammenfassung des Artikels..."
              />
            </div>

            <div className="group">
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                Inhalt * (Markdown unterstützt)
              </label>
              <div className="relative">
                <textarea
                  required
                  value={formData.content}
                  onChange={(e) => handleContentChange(e.target.value)}
                  rows={10}
                  className="w-full px-3 sm:px-4 py-2.5 text-xs sm:text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all hover:border-amber-400 bg-white shadow-sm font-mono resize-none placeholder:text-gray-400"
                  placeholder="# Überschrift 1&#10;## Überschrift 2&#10;### Überschrift 3&#10;&#10;Normaler Text...&#10;&#10;**Fett gedruckter abschließender Text**"
                />
                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md shadow-sm border border-gray-200">
                  <p className="text-[10px] sm:text-xs font-medium text-gray-600">
                    {formData.reading_time} Min Lesezeit
                  </p>
                </div>
              </div>
            </div>

            <div className="group">
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                Featured Image *
              </label>

              {!formData.featured_image ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`relative border-2 border-dashed rounded-xl transition-all duration-300 ${
                    dragActive
                      ? 'border-amber-500 bg-amber-50/50'
                      : 'border-gray-300 hover:border-amber-400 bg-gray-50/50 hover:bg-amber-50/30'
                  }`}
                >
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center py-8 sm:py-12 lg:py-16 px-4 cursor-pointer"
                  >
                    <div className="relative mb-4">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl blur-xl opacity-20 animate-pulse" />
                      <div className="relative p-4 sm:p-5 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-lg">
                        <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-white" strokeWidth={2} />
                      </div>
                    </div>
                    <p className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                      {uploadingImage ? 'Wird hochgeladen...' : 'Bild hochladen'}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mb-3 text-center">
                      Klicken oder Datei hierher ziehen
                    </p>
                    <p className="text-xs text-gray-400">
                      PNG, JPG, WEBP bis zu 10MB
                    </p>
                  </label>
                  {uploadingImage && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin" />
                        <p className="text-sm font-medium text-gray-700">Lädt hoch...</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur" />
                  <div className="relative bg-white border-2 border-gray-200 rounded-xl p-3 sm:p-4 shadow-sm">
                    <div className="flex gap-3 sm:gap-4 items-start">
                      <img
                        src={formData.featured_image}
                        alt="Featured"
                        className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg shadow-md"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2 mb-2">
                          <FileImage className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm font-semibold text-gray-900 mb-1">
                              Bild erfolgreich hochgeladen
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {formData.featured_image.split('/').pop()}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, featured_image: '' })}
                          className="mt-2 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5"
                        >
                          <X size={14} />
                          <span>Bild entfernen</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="group">
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Tag size={14} className="text-gray-600" />
                Tags
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 px-3 sm:px-4 py-2.5 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all hover:border-amber-400 bg-white shadow-sm placeholder:text-gray-400"
                  placeholder="Tag hinzufügen..."
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-3 sm:px-4 py-2.5 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all shadow-sm hover:shadow-md"
                >
                  <Plus size={18} className="sm:w-5 sm:h-5" strokeWidth={2.5} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-br from-amber-50 to-orange-50 text-amber-700 border border-amber-200 rounded-lg text-xs sm:text-sm font-medium shadow-sm hover:shadow-md transition-all"
                  >
                    <Tag size={12} className="sm:w-3.5 sm:h-3.5" />
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-amber-900 p-0.5 hover:bg-amber-100 rounded transition-colors"
                    >
                      <X size={12} className="sm:w-3.5 sm:h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-4 sm:p-5 border border-gray-200 shadow-sm">
              <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                Veröffentlichung
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="group">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    Veröffentlichungsdatum
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.published_at.slice(0, 16)}
                    onChange={(e) => setFormData({ ...formData, published_at: new Date(e.target.value).toISOString() })}
                    className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all hover:border-amber-400 bg-white shadow-sm"
                  />
                </div>

                <div className="flex flex-col justify-end gap-3">
                  <label className="flex items-center gap-2.5 cursor-pointer group/check p-2.5 rounded-lg hover:bg-white/80 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.is_published}
                      onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                      className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
                    />
                    <span className="text-xs sm:text-sm font-semibold text-gray-700 group-hover/check:text-gray-900">Veröffentlicht</span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer group/check p-2.5 rounded-lg hover:bg-white/80 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                      className="w-5 h-5 text-amber-600 border-gray-300 rounded focus:ring-amber-500 cursor-pointer"
                    />
                    <span className="text-xs sm:text-sm font-semibold text-gray-700 group-hover/check:text-gray-900 flex items-center gap-1.5">
                      <Star size={14} className="text-amber-500" />
                      Featured
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 text-sm sm:text-base"
              >
                <Save size={20} strokeWidth={2.5} />
                {editingPost ? 'Aktualisieren' : 'Blog-Post Erstellen'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="sm:w-auto px-6 py-3.5 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all shadow-sm text-sm sm:text-base"
              >
                Abbrechen
              </button>
            </div>
          </form>
        </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Post
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategorie
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Datum
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aktionen
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {posts.map((post) => {
                  const category = categories.find(cat => cat.id === post.category_id);
                  return (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={post.featured_image}
                            alt={post.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <div className="font-medium text-gray-900 flex items-center gap-2">
                              {post.title}
                              {post.is_featured && (
                                <Star size={16} className="text-amber-500 fill-amber-500" />
                              )}
                            </div>
                            <div className="text-sm text-gray-500">{post.reading_time} Min Lesezeit</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {category && (
                          <span
                            className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                            style={{ backgroundColor: category.color }}
                          >
                            {category.name}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {post.is_published ? (
                            <span className="flex items-center gap-1 text-green-600 text-sm">
                              <Eye size={16} />
                              Veröffentlicht
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-gray-400 text-sm">
                              <EyeOff size={16} />
                              Entwurf
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {new Date(post.published_at).toLocaleDateString('de-DE')}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(post)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => post.id && handleDelete(post.id, post.title)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="lg:hidden divide-y divide-gray-100">
            {posts.map((post) => {
              const category = categories.find(cat => cat.id === post.category_id);
              return (
                <div key={post.id} className="p-3 sm:p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-1.5 mb-1">
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 flex-1">
                          {post.title}
                        </h3>
                        {post.is_featured && (
                          <Star size={14} className="text-amber-500 fill-amber-500 flex-shrink-0 sm:w-4 sm:h-4" />
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500 mb-2">
                        {post.reading_time} Min Lesezeit
                      </p>
                      {category && (
                        <span
                          className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold text-white"
                          style={{ backgroundColor: category.color }}
                        >
                          {category.name}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
                    <div className="flex items-center gap-1.5">
                      {post.is_published ? (
                        <>
                          <Eye size={14} className="text-green-600 sm:w-4 sm:h-4" />
                          <span className="text-xs sm:text-sm text-green-600 font-medium">Veröffentlicht</span>
                        </>
                      ) : (
                        <>
                          <EyeOff size={14} className="text-gray-400 sm:w-4 sm:h-4" />
                          <span className="text-xs sm:text-sm text-gray-400 font-medium">Entwurf</span>
                        </>
                      )}
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500">
                      {new Date(post.published_at).toLocaleDateString('de-DE')}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(post)}
                      className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-1.5 text-xs sm:text-sm font-medium"
                    >
                      <Edit size={14} strokeWidth={2} className="sm:w-4 sm:h-4" />
                      <span>Bearbeiten</span>
                    </button>
                    <button
                      onClick={() => post.id && handleDelete(post.id, post.title)}
                      className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center justify-center gap-1.5 text-xs sm:text-sm font-medium"
                    >
                      <Trash2 size={14} strokeWidth={2} className="sm:w-4 sm:h-4" />
                      <span>Löschen</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Noch keine Blog-Posts vorhanden</p>
            </div>
          )}
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteBlogId !== null}
        onClose={() => {
          setDeleteBlogId(null);
          setDeleteBlogTitle('');
        }}
        onConfirm={handleDeleteConfirm}
        title="Blog-Post löschen?"
        message={`Möchten Sie den Blog-Post "${deleteBlogTitle}" wirklich unwiderruflich löschen?`}
        confirmText="Löschen"
        cancelText="Abbrechen"
        variant="danger"
        icon="trash"
      />
    </div>
  );
}
