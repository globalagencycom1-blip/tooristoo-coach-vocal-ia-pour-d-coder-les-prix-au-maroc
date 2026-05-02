import { Toaster } from "@/components/ui/toaster"
import { HelmetProvider } from 'react-helmet-async'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import { LanguageProvider, useLang } from './lib/LanguageContext';
import Landing from './pages/Landing';
import AppPage from './pages/App';
import FAQ from './pages/FAQ';
import About from './pages/About';
import Providers from './pages/Providers';
import Alerts from './pages/Alerts';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogArticle from './pages/BlogArticle';
import LegalNotice from './pages/LegalNotice';
import Profile from './pages/Profile';
import AdminProviders from './pages/AdminProviders';
import ChatBot from './components/ChatBot';
import CookieBanner from './components/CookieBanner';
import CanonicalRedirect from './components/CanonicalRedirect';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();
  const { lang } = useLang();

  // Show minimal loading state while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="min-h-screen bg-shield-dark">
        <div className="max-w-7xl mx-auto px-4 py-20 space-y-6">
          <div className="h-12 bg-shield-border/30 rounded-xl animate-pulse"></div>
          <div className="space-y-3">
            <div className="h-6 bg-shield-border/30 rounded w-3/4 animate-pulse"></div>
            <div className="h-6 bg-shield-border/30 rounded w-1/2 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <>
      <CanonicalRedirect />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<AppPage />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/about" element={<About />} />
        <Route path="/providers" element={<Providers />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogArticle />} />
        <Route path="/legal" element={<LegalNotice />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/providers" element={<AdminProviders />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ChatBot lang={lang} />
      <CookieBanner lang={lang} />
    </>
  );
};


function App() {

  return (
    <HelmetProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <LanguageProvider>
            <Router>
              <AuthenticatedApp />
            </Router>
            <Toaster />
          </LanguageProvider>
        </QueryClientProvider>
      </AuthProvider>
    </HelmetProvider>
  )
}

export default App