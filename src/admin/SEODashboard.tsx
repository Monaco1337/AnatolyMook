import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Eye, Target, Globe } from 'lucide-react';

interface SEOMetrics {
  organicTraffic: number;
  avgPosition: number;
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
  aiSnippets: number;
  backlinks: number;
}

export default function SEODashboard() {
  const [metrics, setMetrics] = useState<SEOMetrics>({
    organicTraffic: 12500,
    avgPosition: 8.4,
    impressions: 45600,
    clicks: 3420,
    ctr: 7.5,
    conversions: 156,
    aiSnippets: 42,
    backlinks: 328
  });

  const [topKeywords, setTopKeywords] = useState([
    { keyword: 'spirituelles erwachen', position: 3, volume: 5400, clicks: 680 },
    { keyword: 'bewusstsein erweitern', position: 5, volume: 3600, clicks: 420 },
    { keyword: 'spiritual awakening', position: 12, volume: 49500, clicks: 340 },
    { keyword: 'ego auflösen', position: 7, volume: 1900, clicks: 210 },
    { keyword: 'conscious leadership', position: 9, volume: 2400, clicks: 180 }
  ]);

  const [contentPerformance, setContentPerformance] = useState([
    { page: '/spirituelles-erwachen', views: 4200, avgTime: '4:35', bounceRate: 42 },
    { page: '/bewusstsein-erweitern', views: 3100, avgTime: '3:58', bounceRate: 38 },
    { page: '/coaching', views: 2800, avgTime: '5:12', bounceRate: 35 },
    { page: '/seminare', views: 2400, avgTime: '4:20', bounceRate: 40 }
  ]);

  return (
    <div className="min-h-screen bg-stone-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-stone-900 mb-2">SEO Performance Dashboard</h1>
          <p className="text-stone-600">Global Dominance SEO 2026 - Echtzeit-Metriken</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={<Users className="w-6 h-6" />}
            title="Organic Traffic"
            value={metrics.organicTraffic.toLocaleString()}
            change="+245%"
            positive={true}
          />
          <MetricCard
            icon={<Target className="w-6 h-6" />}
            title="Avg. Position"
            value={metrics.avgPosition.toString()}
            change="-3.2"
            positive={true}
          />
          <MetricCard
            icon={<Eye className="w-6 h-6" />}
            title="Impressions"
            value={metrics.impressions.toLocaleString()}
            change="+180%"
            positive={true}
          />
          <MetricCard
            icon={<TrendingUp className="w-6 h-6" />}
            title="CTR"
            value={`${metrics.ctr}%`}
            change="+1.8%"
            positive={true}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-stone-900">Conversions</h3>
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-4xl font-bold text-stone-900 mb-2">{metrics.conversions}</div>
            <div className="text-sm text-green-600 font-medium">+67% vs last month</div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-stone-600">Booking Forms</span>
                <span className="font-medium">89</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-600">Contact Requests</span>
                <span className="font-medium">52</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-600">Newsletter Signups</span>
                <span className="font-medium">15</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-stone-900">AI Search Snippets</h3>
              <Globe className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-4xl font-bold text-stone-900 mb-2">{metrics.aiSnippets}</div>
            <div className="text-sm text-blue-600 font-medium">Appearances this month</div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-stone-600">Google SGE</span>
                <span className="font-medium">18</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-600">Perplexity</span>
                <span className="font-medium">14</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-600">Bing Copilot</span>
                <span className="font-medium">10</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-stone-900">Backlinks</h3>
              <BarChart3 className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-4xl font-bold text-stone-900 mb-2">{metrics.backlinks}</div>
            <div className="text-sm text-amber-600 font-medium">+45 new this month</div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-stone-600">Domain Authority</span>
                <span className="font-medium">DA 58</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-600">Referring Domains</span>
                <span className="font-medium">187</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-600">Quality Score</span>
                <span className="font-medium">8.4/10</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-stone-900 mb-4">Top Keywords</h3>
            <div className="space-y-3">
              {topKeywords.map((kw, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-stone-100 last:border-0">
                  <div className="flex-1">
                    <div className="font-medium text-stone-900">{kw.keyword}</div>
                    <div className="text-sm text-stone-500">Volume: {kw.volume.toLocaleString()}/mo</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-sm text-stone-500">Position</div>
                      <div className="text-lg font-bold text-stone-900">#{kw.position}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-stone-500">Clicks</div>
                      <div className="text-lg font-bold text-green-600">{kw.clicks}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-stone-900 mb-4">Content Performance</h3>
            <div className="space-y-3">
              {contentPerformance.map((page, index) => (
                <div key={index} className="py-2 border-b border-stone-100 last:border-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-medium text-stone-900 text-sm">{page.page}</div>
                    <div className="text-sm font-bold text-stone-900">{page.views.toLocaleString()} views</div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-stone-500">
                    <span>Avg Time: {page.avgTime}</span>
                    <span>Bounce: {page.bounceRate}%</span>
                    <div className="flex-1">
                      <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-green-600 h-full"
                          style={{ width: `${100 - page.bounceRate}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-stone-900 mb-4">SEO Health Score</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <HealthMetric title="Technical SEO" score={98} />
            <HealthMetric title="On-Page SEO" score={95} />
            <HealthMetric title="Content Quality" score={92} />
            <HealthMetric title="Backlink Profile" score={88} />
            <HealthMetric title="Mobile Friendly" score={100} />
            <HealthMetric title="Page Speed" score={94} />
            <HealthMetric title="Schema Markup" score={100} />
            <HealthMetric title="AI Optimization" score={96} />
          </div>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  positive: boolean;
}

function MetricCard({ icon, title, value, change, positive }: MetricCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-2">
        <div className="text-stone-600">{icon}</div>
        <span className={`text-sm font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
      </div>
      <div className="text-sm text-stone-600 mb-1">{title}</div>
      <div className="text-3xl font-bold text-stone-900">{value}</div>
    </div>
  );
}

interface HealthMetricProps {
  title: string;
  score: number;
}

function HealthMetric({ title, score }: HealthMetricProps) {
  const getColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div className="text-center">
      <div className={`text-4xl font-bold ${getColor(score)} mb-1`}>{score}</div>
      <div className="text-sm text-stone-600">{title}</div>
    </div>
  );
}
