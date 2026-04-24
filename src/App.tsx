import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { useTheme } from './contexts/ThemeContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import SEOHead from './components/SEOHead';
import { CartItem, Product } from './types';

const HomeDynamic = lazy(() => import('./sections/HomeDynamic'));
const About = lazy(() => import('./sections/About'));
const Seminare = lazy(() => import('./sections/Seminare'));
const Coaching = lazy(() => import('./sections/Coaching'));
const Keynotes = lazy(() => import('./sections/Keynotes'));
const Events = lazy(() => import('./sections/Events'));
const Corporate = lazy(() => import('./sections/Corporate'));
const Resources = lazy(() => import('./sections/Resources'));
const Shop = lazy(() => import('./sections/Shop'));
const Blog = lazy(() => import('./sections/Blog'));
const FAQ = lazy(() => import('./sections/FAQ'));
const Contact = lazy(() => import('./sections/Contact'));
const Booking = lazy(() => import('./sections/Booking'));
const Impressum = lazy(() => import('./sections/Impressum'));
const Datenschutz = lazy(() => import('./sections/Datenschutz'));
const ConsciousnessQuiz = lazy(() => import('./sections/ConsciousnessQuiz'));
const Anamnesis = lazy(() => import('./sections/Anamnesis'));
const Transformation = lazy(() => import('./sections/Transformation'));
const Dashboard = lazy(() => import('./admin/Dashboard'));
const Login = lazy(() => import('./admin/Login'));

const CityServicePage = lazy(() => import('./sections/programmatic/CityServicePage'));
const CityOverviewPage = lazy(() => import('./sections/programmatic/CityOverviewPage'));
const TopicClusterPage = lazy(() => import('./sections/programmatic/TopicClusterPage'));
const GlossaryPage = lazy(() => import('./sections/programmatic/GlossaryPage'));
const FAQDetailPage = lazy(() => import('./sections/programmatic/FAQDetailPage'));
const CaseStudyPage = lazy(() => import('./sections/programmatic/CaseStudyPage'));

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

const cityServiceRoutes = ['seminare', 'coaching', 'keynotes', 'corporate', 'transformation', 'resources', 'booking'] as const;

function AppContent() {
  const { colors } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const rawPath = location.pathname.replace(/^\/(en|ru)/, '') || '/';
  const pathSegments = rawPath.split('/').filter(Boolean);
  const isFaqDetail = pathSegments[0] === 'faq' && pathSegments.length > 1;
  const currentSection =
    rawPath === '/'
      ? 'home'
      : isFaqDetail
        ? 'faq-detail'
        : pathSegments[0] || 'home';
  const navSection = isFaqDetail ? 'faq' : currentSection;

  useEffect(() => {
    const savedCart = localStorage.getItem('shop_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('shop_cart', JSON.stringify(newCart));
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      saveCart(cart.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item));
    } else {
      saveCart([...cart, { product, quantity }]);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) removeFromCart(productId);
    else saveCart(cart.map(item => item.product.id === productId ? { ...item, quantity } : item));
  };

  const removeFromCart = (productId: string) => saveCart(cart.filter(item => item.product.id !== productId));
  const clearCart = () => saveCart([]);

  useEffect(() => {
    checkAuth();
    try {
      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        setIsAdminAuthenticated(!!session);
        if (!session && currentSection === 'admin') {
          setShowAdminLogin(true);
          navigate('/');
        }
      });
      return () => { authListener.subscription.unsubscribe(); };
    } catch { return () => {}; }
  }, []);

  useEffect(() => {
    const checkRoute = async () => {
      if (location.pathname === '/admin') {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session) { setIsAdminAuthenticated(true); setShowAdminLogin(false); }
          else setShowAdminLogin(true);
        } catch { setShowAdminLogin(true); }
      } else {
        setShowAdminLogin(false);
      }
    };
    checkRoute();
  }, [location]);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAdminAuthenticated(!!session);
    } catch { setIsAdminAuthenticated(false); }
  };

  const handleAdminLogin = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) { setIsAdminAuthenticated(true); setShowAdminLogin(false); navigate('/admin'); }
    } catch { /* Supabase not configured */ }
  };

  const handleNavigate = (section: string) => {
    const path = section === 'home' ? '/' : `/${section}`;
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showNavAndFooter = !showAdminLogin && currentSection !== 'admin' && currentSection !== 'quiz' && currentSection !== 'anamnesis';
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const shopElement = (
    <Shop cart={cart} onAddToCart={addToCart} onUpdateQuantity={updateQuantity} onRemoveFromCart={removeFromCart} onClearCart={clearCart} isCartOpen={isCartOpen} onCartOpenChange={setIsCartOpen} />
  );

  const mainRoutes = (
    <>
      <Route path="/" element={<HomeDynamic />} />
      <Route path="/about" element={<About />} />
      <Route path="/seminare" element={<Seminare />} />
      <Route path="/coaching" element={<Coaching />} />
      <Route path="/keynotes" element={<Keynotes />} />
      <Route path="/events" element={<Events />} />
      <Route path="/corporate" element={<Corporate />} />
      <Route path="/geschaeftskunden" element={<Corporate />} />
      <Route path="/transformation" element={<Transformation />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/produkte" element={shopElement} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/kontakt" element={<Contact />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/quiz" element={<ConsciousnessQuiz />} />
      <Route path="/anamnesis" element={<Anamnesis />} />
      <Route path="/impressum" element={<Impressum />} />
      <Route path="/datenschutz" element={<Datenschutz />} />
    </>
  );

  const programmaticRoutes = (
    <>
      {cityServiceRoutes.map(svc => (
        <Route key={svc} path={`/${svc}/:city`} element={<CityServicePage service={svc} />} />
      ))}
      <Route path="/thema/:topic" element={<TopicClusterPage />} />
      <Route path="/glossar/:term" element={<GlossaryPage />} />
      <Route path="/faq/:slug" element={<FAQDetailPage />} />
      <Route path="/erfolgsgeschichte/:slug" element={<CaseStudyPage />} />
    </>
  );

  const localeRoutes = (langPrefix: string) => (
    <>
      {cityServiceRoutes.map(svc => (
        <Route key={`${langPrefix}-${svc}`} path={`/${langPrefix}/${svc}/:city`} element={<CityServicePage service={svc} />} />
      ))}
      <Route path={`/${langPrefix}/topic/:topic`} element={<TopicClusterPage />} />
      <Route path={`/${langPrefix}/glossary/:term`} element={<GlossaryPage />} />
      <Route path={`/${langPrefix}/faq/:slug`} element={<FAQDetailPage />} />
      <Route path={`/${langPrefix}/tema/:topic`} element={<TopicClusterPage />} />
      <Route path={`/${langPrefix}/glossarij/:term`} element={<GlossaryPage />} />

      <Route path={`/${langPrefix}/about`} element={<About />} />
      <Route path={`/${langPrefix}/seminare`} element={<Seminare />} />
      <Route path={`/${langPrefix}/coaching`} element={<Coaching />} />
      <Route path={`/${langPrefix}/keynotes`} element={<Keynotes />} />
      <Route path={`/${langPrefix}/events`} element={<Events />} />
      <Route path={`/${langPrefix}/corporate`} element={<Corporate />} />
      <Route path={`/${langPrefix}/transformation`} element={<Transformation />} />
      <Route path={`/${langPrefix}/blog`} element={<Blog />} />
      <Route path={`/${langPrefix}/produkte`} element={shopElement} />
      <Route path={`/${langPrefix}/resources`} element={<Resources />} />
      <Route path={`/${langPrefix}/faq`} element={<FAQ />} />
      <Route path={`/${langPrefix}/kontakt`} element={<Contact />} />
      <Route path={`/${langPrefix}/booking`} element={<Booking />} />
    </>
  );

  return (
    <div className="min-h-screen smooth-scroll overflow-x-hidden" style={{ backgroundColor: colors.bg.primary }}>
      <SEOHead section={currentSection} path={location.pathname} />
      {showNavAndFooter && (
        <Navigation currentSection={navSection} onNavigate={handleNavigate} cartItemCount={cartItemCount} onCartClick={() => setIsCartOpen(true)} />
      )}
      <main className="section-fade-in">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {mainRoutes}
            {programmaticRoutes}

            {/* City overview pages (must come after service routes) */}
            <Route path="/:city" element={<CityOverviewPage />} />

            {/* English locale */}
            {localeRoutes('en')}

            {/* Russian locale */}
            {localeRoutes('ru')}

            {/* Admin */}
            <Route path="/admin" element={
              showAdminLogin ? <Login onLogin={handleAdminLogin} /> :
              isAdminAuthenticated ? <Dashboard /> :
              <Login onLogin={handleAdminLogin} />
            } />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      {showNavAndFooter && <Footer onNavigate={handleNavigate} />}
      {showNavAndFooter && <CookieBanner />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
