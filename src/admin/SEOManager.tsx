import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { X, Plus, Save, Trash2, Search, Globe, Database, FileText, BarChart3 } from 'lucide-react';

type TabType = 'meta-tags' | 'keywords' | 'schema' | 'geo-content' | 'performance';

interface MetaTag {
  id: string;
  page_path: string;
  language: string;
  country_code: string | null;
  title: string;
  description: string;
  keywords: string[];
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  canonical_url: string | null;
  robots: string;
  is_active: boolean;
}

interface Keyword {
  id: string;
  keyword: string;
  cluster_id: string | null;
  intent_type: 'info' | 'decision' | 'action';
  priority: 'head' | 'long-tail' | 'conversational' | 'voice';
  language: string;
  search_volume: number;
  difficulty: number;
  is_active: boolean;
}

interface KeywordCluster {
  id: string;
  cluster_name: string;
  display_name_de: string;
  display_name_en: string;
  description: string | null;
  priority: number;
}

interface SchemaMarkup {
  id: string;
  page_path: string;
  schema_type: string;
  schema_json: Record<string, unknown>;
  language: string;
  is_active: boolean;
}

interface GeoContent {
  id: string;
  page_path: string;
  country_code: string;
  language_code: string;
  title: string;
  description: string | null;
  h1: string | null;
  is_canonical: boolean;
  canonical_url: string | null;
}

export default function SEOManager() {
  const [activeTab, setActiveTab] = useState<TabType>('meta-tags');
  const [metaTags, setMetaTags] = useState<MetaTag[]>([]);
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [clusters, setClusters] = useState<KeywordCluster[]>([]);
  const [schemas, setSchemas] = useState<SchemaMarkup[]>([]);
  const [geoContent, setGeoContent] = useState<GeoContent[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    try {
      switch (activeTab) {
        case 'meta-tags':
          const { data: metaData } = await supabase
            .from('seo_meta_tags')
            .select('*')
            .order('page_path');
          setMetaTags(metaData || []);
          break;

        case 'keywords':
          const [{ data: keywordsData }, { data: clustersData }] = await Promise.all([
            supabase.from('seo_keywords').select('*').order('keyword'),
            supabase.from('seo_keyword_clusters').select('*').order('priority', { ascending: false })
          ]);
          setKeywords(keywordsData || []);
          setClusters(clustersData || []);
          break;

        case 'schema':
          const { data: schemaData } = await supabase
            .from('seo_schema_markup')
            .select('*')
            .order('page_path');
          setSchemas(schemaData || []);
          break;

        case 'geo-content':
          const { data: geoData } = await supabase
            .from('seo_geo_content')
            .select('*')
            .order('page_path');
          setGeoContent(geoData || []);
          break;
      }
    } catch (error) {
      console.error('Error loading SEO data:', error);
    }
  };

  const handleSaveMetaTag = async (item: Partial<MetaTag>) => {
    try {
      if (item.id) {
        await supabase
          .from('seo_meta_tags')
          .update(item)
          .eq('id', item.id);
      } else {
        await supabase
          .from('seo_meta_tags')
          .insert([item]);
      }
      loadData();
      setShowAddModal(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving meta tag:', error);
      alert('Fehler beim Speichern');
    }
  };

  const handleSaveKeyword = async (item: Partial<Keyword>) => {
    try {
      if (item.id) {
        await supabase
          .from('seo_keywords')
          .update(item)
          .eq('id', item.id);
      } else {
        await supabase
          .from('seo_keywords')
          .insert([item]);
      }
      loadData();
      setShowAddModal(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving keyword:', error);
      alert('Fehler beim Speichern');
    }
  };

  const handleDelete = async (id: string, table: string) => {
    if (!confirm('Wirklich löschen?')) return;

    try {
      await supabase.from(table).delete().eq('id', id);
      loadData();
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Fehler beim Löschen');
    }
  };

  const renderMetaTags = () => {
    const filteredTags = metaTags.filter(tag =>
      tag.page_path.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tag.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Suche nach Seite oder Titel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            onClick={() => {
              setEditingItem({
                page_path: '/',
                language: 'de',
                title: '',
                description: '',
                keywords: [],
                robots: 'index, follow',
                is_active: true
              });
              setShowAddModal(true);
            }}
            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Neuer Meta Tag
          </button>
        </div>

        <div className="grid gap-4">
          {filteredTags.map((tag) => (
            <div key={tag.id} className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                      {tag.language}
                    </span>
                    {tag.country_code && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                        {tag.country_code}
                      </span>
                    )}
                    <span className={`px-2 py-1 text-xs font-semibold rounded ${tag.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {tag.is_active ? 'Aktiv' : 'Inaktiv'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{tag.page_path}</h3>
                  <p className="text-sm text-gray-600 mb-2">{tag.title}</p>
                  <p className="text-xs text-gray-500">{tag.description}</p>
                  {tag.keywords && tag.keywords.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {tag.keywords.map((kw, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                          {kw}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingItem(tag);
                      setShowAddModal(true);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <FileText className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(tag.id, 'seo_meta_tags')}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderKeywords = () => {
    const filteredKeywords = keywords.filter(kw =>
      kw.keyword.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Suche nach Keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            onClick={() => {
              setEditingItem({
                keyword: '',
                cluster_id: null,
                intent_type: 'info',
                priority: 'long-tail',
                language: 'de',
                search_volume: 0,
                difficulty: 50,
                is_active: true
              });
              setShowAddModal(true);
            }}
            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Neues Keyword
          </button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Keyword</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cluster</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Intent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priorität</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Volume</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Difficulty</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aktionen</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredKeywords.map((kw) => {
                const cluster = clusters.find(c => c.id === kw.cluster_id);
                return (
                  <tr key={kw.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{kw.keyword}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cluster ? cluster.display_name_de : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${
                        kw.intent_type === 'action' ? 'bg-green-100 text-green-800' :
                        kw.intent_type === 'decision' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {kw.intent_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{kw.priority}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{kw.search_volume}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{kw.difficulty}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          setEditingItem(kw);
                          setShowAddModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Bearbeiten
                      </button>
                      <button
                        onClick={() => handleDelete(kw.id, 'seo_keywords')}
                        className="text-red-600 hover:text-red-900"
                      >
                        Löschen
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'meta-tags':
        return renderMetaTags();
      case 'keywords':
        return renderKeywords();
      case 'schema':
        return <div className="text-center text-gray-500 py-12">Schema Management - Coming Soon</div>;
      case 'geo-content':
        return <div className="text-center text-gray-500 py-12">GEO Content Management - Coming Soon</div>;
      case 'performance':
        return <div className="text-center text-gray-500 py-12">Performance Tracking - Coming Soon</div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SEO Dominance System</h1>
          <p className="text-gray-600">Global Authority Engine – Multi-Country SEO Management</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('meta-tags')}
              className={`px-6 py-4 font-medium flex items-center gap-2 ${
                activeTab === 'meta-tags'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FileText className="w-5 h-5" />
              Meta Tags
            </button>
            <button
              onClick={() => setActiveTab('keywords')}
              className={`px-6 py-4 font-medium flex items-center gap-2 ${
                activeTab === 'keywords'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Search className="w-5 h-5" />
              Keywords
            </button>
            <button
              onClick={() => setActiveTab('schema')}
              className={`px-6 py-4 font-medium flex items-center gap-2 ${
                activeTab === 'schema'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Database className="w-5 h-5" />
              Schema.org
            </button>
            <button
              onClick={() => setActiveTab('geo-content')}
              className={`px-6 py-4 font-medium flex items-center gap-2 ${
                activeTab === 'geo-content'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Globe className="w-5 h-5" />
              GEO Content
            </button>
            <button
              onClick={() => setActiveTab('performance')}
              className={`px-6 py-4 font-medium flex items-center gap-2 ${
                activeTab === 'performance'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              Performance
            </button>
          </div>

          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {editingItem?.id ? 'Bearbeiten' : 'Neu erstellen'}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingItem(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <MetaTagForm
                item={editingItem}
                onSave={activeTab === 'meta-tags' ? handleSaveMetaTag : handleSaveKeyword}
                onCancel={() => {
                  setShowAddModal(false);
                  setEditingItem(null);
                }}
                type={activeTab}
                clusters={clusters}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MetaTagForm({ item, onSave, onCancel, type, clusters }: {
  item: any;
  onSave: (item: any) => void;
  onCancel: () => void;
  type: string;
  clusters: KeywordCluster[];
}) {
  const [formData, setFormData] = useState(item);

  if (type === 'keywords') {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Keyword</label>
          <input
            type="text"
            value={formData.keyword || ''}
            onChange={(e) => setFormData({ ...formData, keyword: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cluster</label>
          <select
            value={formData.cluster_id || ''}
            onChange={(e) => setFormData({ ...formData, cluster_id: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Kein Cluster</option>
            {clusters.map(cluster => (
              <option key={cluster.id} value={cluster.id}>{cluster.display_name_de}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Intent Type</label>
            <select
              value={formData.intent_type || 'info'}
              onChange={(e) => setFormData({ ...formData, intent_type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="info">Info</option>
              <option value="decision">Decision</option>
              <option value="action">Action</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priorität</label>
            <select
              value={formData.priority || 'long-tail'}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="head">Head</option>
              <option value="long-tail">Long-Tail</option>
              <option value="conversational">Conversational</option>
              <option value="voice">Voice</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sprache</label>
            <input
              type="text"
              value={formData.language || 'de'}
              onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Volume</label>
            <input
              type="number"
              value={formData.search_volume || 0}
              onChange={(e) => setFormData({ ...formData, search_volume: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
            <input
              type="number"
              min="1"
              max="100"
              value={formData.difficulty || 50}
              onChange={(e) => setFormData({ ...formData, difficulty: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.is_active || false}
            onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
            className="w-4 h-4 text-blue-600 rounded"
          />
          <label className="ml-2 text-sm text-gray-700">Aktiv</label>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Abbrechen
          </button>
          <button
            onClick={() => onSave(formData)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            Speichern
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Page Path</label>
        <input
          type="text"
          value={formData.page_path || ''}
          onChange={(e) => setFormData({ ...formData, page_path: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          placeholder="/"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sprache</label>
          <select
            value={formData.language || 'de'}
            onChange={(e) => setFormData({ ...formData, language: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="de">Deutsch</option>
            <option value="en">English</option>
            <option value="ru">Русский</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Country Code (optional)</label>
          <input
            type="text"
            value={formData.country_code || ''}
            onChange={(e) => setFormData({ ...formData, country_code: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="DE, AT, CH..."
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Keywords (kommagetrennt)</label>
        <input
          type="text"
          value={(formData.keywords || []).join(', ')}
          onChange={(e) => setFormData({
            ...formData,
            keywords: e.target.value.split(',').map(k => k.trim()).filter(Boolean)
          })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Robots</label>
        <input
          type="text"
          value={formData.robots || 'index, follow'}
          onChange={(e) => setFormData({ ...formData, robots: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={formData.is_active !== false}
          onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
          className="w-4 h-4 text-blue-600 rounded"
        />
        <label className="ml-2 text-sm text-gray-700">Aktiv</label>
      </div>
      <div className="flex justify-end gap-3 pt-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Abbrechen
        </button>
        <button
          onClick={() => onSave(formData)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Save className="w-5 h-5" />
          Speichern
        </button>
      </div>
    </div>
  );
}
