import { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { RecognizeBreed } from './components/RecognizeBreed';
import { BreedHub } from './components/BreedHub';
import { BreedDetail } from './components/BreedDetail';
import { Profile } from './components/Profile';
import { Toaster } from './components/ui/sonner';
import { Home, Camera, BookOpen, User, LogOut, Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from './components/ui/button';

type Page = 'dashboard' | 'recognize' | 'breeds' | 'profile';

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [selectedBreed, setSelectedBreed] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const userName = 'Jim Henderson';

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleNavigate = (page: string, breedId?: string) => {
    if (breedId) {
      setSelectedBreed(breedId);
    } else {
      setSelectedBreed(null);
    }
    setCurrentPage(page as Page);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowLanding(true);
    setCurrentPage('dashboard');
    setSelectedBreed(null);
  };

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLanding(false);
  };

  if (showLanding) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'recognize', label: 'Recognize Breed', icon: Camera },
    { id: 'breeds', label: 'Breed Hub', icon: BookOpen },
    { id: 'profile', label: 'My Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />
      
      {/* Mobile Menu Button - Floating */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 bg-background border-2 border-primary shadow-lg"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-0 left-0 h-screen bg-sidebar border-r border-sidebar-border 
            transition-transform duration-300 z-50
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            w-64
          `}
        >
          <div className="h-full flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-sidebar-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-accent-foreground" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C10.34 2 9 3.34 9 5C9 6.66 10.34 8 12 8C13.66 8 15 6.66 15 5C15 3.34 13.66 2 12 2M12 10C9.33 10 4 11.33 4 14V16H20V14C20 11.33 14.67 10 12 10Z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sidebar-foreground text-lg leading-tight">The Cattle-Net</div>
                  
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id && !selectedBreed;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                      ${
                        isActive
                          ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                          : 'text-sidebar-foreground hover:bg-sidebar-accent'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Dark Mode Toggle & User Info */}
            <div className="p-4 border-t border-sidebar-border space-y-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
              >
                {darkMode ? (
                  <>
                    <Sun className="w-5 h-5" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
              
              <div className="px-4 py-2 bg-sidebar-accent rounded-lg">
                <div className="text-sm text-sidebar-foreground">{userName}</div>
                <div className="text-xs text-sidebar-foreground/70">farmer@ranch.com</div>
              </div>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {currentPage === 'dashboard' && !selectedBreed && (
              <Dashboard onNavigate={handleNavigate} userName={userName} />
            )}
            {currentPage === 'recognize' && !selectedBreed && (
              <RecognizeBreed onNavigate={handleNavigate} />
            )}
            {currentPage === 'breeds' && !selectedBreed && (
              <BreedHub onNavigate={handleNavigate} />
            )}
            {currentPage === 'breeds' && selectedBreed && (
              <BreedDetail breedId={selectedBreed} onNavigate={handleNavigate} />
            )}
            {currentPage === 'profile' && !selectedBreed && (
              <Profile userName={userName} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
