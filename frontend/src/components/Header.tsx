import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Link2, Menu, X, Book } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { isLoggedIn, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Check if we're on landing page (to show anchor links)
  const isLandingPage = location.pathname === '/';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 text-xl font-bold text-gray-900">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Link2 className="w-5 h-5 text-white" />
            </div>
            <span>ShortLink</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            ) : !isLoggedIn ? (
              <>
                {isLandingPage && (
                  <>
                    <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Преимущества
                    </a>
                    <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Особенности
                    </a>
                    <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Цены
                    </a>
                    <a href="#api" className="text-gray-600 hover:text-gray-900 transition-colors">
                      API
                    </a>
                  </>
                )}
                <Link
                  to="/api-docs"
                  className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
                >
                  <Book className="w-4 h-4" />
                  Документация
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
                >
                  Вход
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                >
                  Регистрация
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Мои ссылки
                </Link>
                <Link
                  to="/stats"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Статистика
                </Link>
                <Link
                  to="/api-docs"
                  className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
                >
                  <Book className="w-4 h-4" />
                  Документация
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-red-600 font-medium hover:text-red-700 transition-colors"
                >
                  Выход
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-4">
              {!isLoggedIn ? (
                <>
                  {isLandingPage && (
                    <>
                      <a
                        href="#features"
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Преимущества
                      </a>
                      <a
                        href="#how-it-works"
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Особенности
                      </a>
                      <a
                        href="#pricing"
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Цены
                      </a>
                      <a
                        href="#api"
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        API
                      </a>
                    </>
                  )}
                  <Link
                    to="/api-docs"
                    className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Book className="w-4 h-4" />
                    Документация
                  </Link>
                  <Link
                    to="/login"
                    className="text-indigo-600 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Вход
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Регистрация
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/dashboard"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Мои ссылки
                  </Link>
                  <Link
                    to="/stats"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Статистика
                  </Link>
                  <Link
                    to="/api-docs"
                    className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Book className="w-4 h-4" />
                    Документация
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-red-600 font-medium text-left"
                  >
                    Выход
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
