import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { useTheme } from './contexts/ThemeContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import SEOHead from './components/SEOHead';
import HomeDynamic from './sections/HomeDynamic';
import About from './sections/About';
import Seminare from './sections/Seminare';
import Coaching from './sections/Coaching';
import Keynotes from './sections/Keynotes';
import Events from './sections/Events';
import Corporate from './sections/Corporate';
import Resources from './sections/Resources';
import Shop from './sections/Shop';
import Blog from './sections/Blog';
import FAQ from './sections/FAQ';
import Contact from './sections/Contact';
import Booking from './sections/Booking';
import Impressum from './sections/Impressum';
import Datenschutz from './sections/Datenschutz';
import ConsciousnessQuiz from './sections/ConsciousnessQuiz';
import Anamnesis from './sections/Anamnesis';
import Transformation from './sections/Transformation';
import Dashboard from './admin/Dashboard';
import Login from './admin/Login';
import { CartItem, Product } from './types';

function AppContent() {
  const { colors } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const currentSection = location.pathname === '/' ? 'home' : location.pathname.substring(1);

  useEffect(() => {
    const savedCart = localStorage.getItem('shop_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('shop_cart', JSON.stringify(newCart));
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      saveCart(cart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      saveCart([...cart, { product, quantity }]);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveCart(cart.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const removeFromCart = (productId: string) => {
    saveCart(cart.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    saveCart([]);
  };

  useEffect(() => {
    checkAuth();

    try {
      const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
        setIsAdminAuthenticated(!!session);
        if (!session && currentSection === 'admin') {
          setShowAdminLogin(true);
          navigate('/');
        }
      });
      return () => {
        authListener.subscription.unsubscribe();
      };
    } catch {
      return () => {};
    }
  }, []);

  useEffect(() => {
    const checkRoute = async () => {
      const path = location.pathname;
      if (path === '/admin') {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            setIsAdminAuthenticated(true);
            setShowAdminLogin(false);
          } else {
            setShowAdminLogin(true);
          }
        } catch {
          setShowAdminLogin(true);
        }
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
    } catch {
      setIsAdminAuthenticated(false);
    }
  };

  const handleAdminLogin = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsAdminAuthenticated(true);
        setShowAdminLogin(false);
        navigate('/admin');
      }
    } catch {
      // Supabase nicht konfiguriert oder Fehler – Login überspringen
    }
  };

  const handleNavigate = (section: string) => {
    const path = section === 'home' ? '/' : `/${section}`;
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showNavAndFooter = !showAdminLogin && currentSection !== 'admin' && currentSection !== 'quiz' && currentSection !== 'anamnesis';
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen smooth-scroll overflow-x-hidden" style={{ backgroundColor: colors.bg.primary }}>
      <SEOHead section={currentSection} />
      {showNavAndFooter && (
        <Navigation
          currentSection={currentSection}
          onNavigate={handleNavigate}
          cartItemCount={cartItemCount}
          onCartClick={() => setIsCartOpen(true)}
        />
      )}
      <main className="section-fade-in">
        <Routes>
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
          <Route path="/produkte" element={
            <Shop
              cart={cart}
              onAddToCart={addToCart}
              onUpdateQuantity={updateQuantity}
              onRemoveFromCart={removeFromCart}
              onClearCart={clearCart}
              isCartOpen={isCartOpen}
              onCartOpenChange={setIsCartOpen}
            />
          } />
          <Route path="/resources" element={<Resources />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/quiz" element={<ConsciousnessQuiz />} />
          <Route path="/anamnesis" element={<Anamnesis />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/admin" element={
            showAdminLogin ? (
              <Login onLogin={handleAdminLogin} />
            ) : isAdminAuthenticated ? (
              <Dashboard />
            ) : (
              <Login onLogin={handleAdminLogin} />
            )
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
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
