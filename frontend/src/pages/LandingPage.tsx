import React from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  BarChart3,
  Shield,
  Globe,
  Clock,
  Code2,
  ArrowRight,
  Check,
  MousePointer,
  TrendingUp,
  Settings
} from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50 scroll-mt-24 sm:scroll-mt-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-100 rounded-full text-indigo-700 font-medium text-sm mb-8">
              <Zap className="w-4 h-4" />
              <span>Быстро, надежно, бесплатно</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Сокращайте ссылки,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
                {' '}увеличивайте конверсию
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Превратите длинные и непривлекательные URL в короткие, запоминающиеся ссылки.
              Отслеживайте клики и анализируйте эффективность в реальном времени.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/register"
                className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
              >
                Начать бесплатно
                <ArrowRight className="w-5 h-5" />
              </Link>

              <a
                href="#features"
                className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold text-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center justify-center"
              >
                Узнать больше
              </a>
            </div>
          </div>

          {/* Demo Preview */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 pointer-events-none h-full" />
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 sm:p-8 max-w-3xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                <div className="flex-1 w-full bg-gray-100 rounded-lg p-4">
                  <span className="text-gray-500 text-sm">Ваша длинная ссылка</span>
                  <p className="text-gray-700 truncate mt-1">https://example.com/very/long/url/that/nobody/wants/to/type...</p>
                </div>

                <div className="text-indigo-500 rotate-90 sm:rotate-0">
                  <ArrowRight className="w-6 h-6" />
                </div>

                <div className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-4 text-white">
                  <span className="text-indigo-200 text-sm">Короткая ссылка</span>
                  <p className="font-semibold mt-1">short.link/abc123</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                  <MousePointer className="w-6 h-6 text-indigo-500 mx-auto mb-3" />
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">1,234</p>
                  <p className="text-sm text-gray-500 mt-1">Клики</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                  <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-3" />
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">+24%</p>
                  <p className="text-sm text-gray-500 mt-1">CTR</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                  <Globe className="w-6 h-6 text-purple-500 mx-auto mb-3" />
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">15</p>
                  <p className="text-sm text-gray-500 mt-1">Стран</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white scroll-mt-24 sm:scroll-mt-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Преимущества сервиса</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Все необходимые инструменты для эффективной работы с ссылками
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 hover:shadow-lg transition-shadow text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Мгновенное создание</h3>
              <p className="text-gray-600">
                Сокращайте ссылки за доли секунды. Никаких ожиданий и лишних кликов.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 hover:shadow-lg transition-shadow text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Детальная аналитика</h3>
              <p className="text-gray-600">
                Отслеживайте клики за час, день и всё время. Понимайте свою аудиторию.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 hover:shadow-lg transition-shadow text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Безопасность</h3>
              <p className="text-gray-600">
                Ваши ссылки защищены. Авторизация по паролю и контроль доступа.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 hover:shadow-lg transition-shadow text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Срок действия</h3>
              <p className="text-gray-600">
                Устанавливайте время жизни ссылок. Автоматическое истечение по расписанию.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8 hover:shadow-lg transition-shadow text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Settings className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Управление</h3>
              <p className="text-gray-600">
                Активируйте и деактивируйте ссылки в любой момент. Полный контроль.
              </p>
            </div>

            <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-8 hover:shadow-lg transition-shadow text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Без ограничений</h3>
              <p className="text-gray-600">
                Создавайте столько ссылок, сколько нужно. Никаких лимитов.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 bg-gray-50 scroll-mt-24 sm:scroll-mt-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Как это работает</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Три простых шага к коротким и эффективным ссылкам
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Зарегистрируйтесь</h3>
              <p className="text-gray-600 leading-relaxed">
                Создайте аккаунт за несколько секунд. Просто введите логин и пароль.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Вставьте ссылку</h3>
              <p className="text-gray-600 leading-relaxed">
                Скопируйте длинную ссылку и вставьте в поле. Нажмите кнопку создания.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Поделитесь</h3>
              <p className="text-gray-600 leading-relaxed">
                Получите короткую ссылку и используйте её везде. Отслеживайте статистику.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white scroll-mt-24 sm:scroll-mt-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Простые цены</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Начните бесплатно, без скрытых платежей
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Бесплатно</h3>
              <p className="text-gray-500 mb-6">Для личного использования</p>
              <div className="mb-8">
                <span className="text-4xl font-bold text-gray-900">$0</span>
                <span className="text-gray-500">/месяц</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 justify-center text-gray-600">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  Неограниченные ссылки
                </li>
                <li className="flex items-center gap-3 justify-center text-gray-600">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  Базовая аналитика
                </li>
                <li className="flex items-center gap-3 justify-center text-gray-600">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  REST API доступ
                </li>
              </ul>
              <Link
                to="/register"
                className="block w-full py-4 text-center bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Начать бесплатно
              </Link>
            </div>

            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white transform md:scale-105 shadow-xl text-center">
              <div className="inline-block px-4 py-1.5 bg-white/20 rounded-full text-sm font-medium mb-4">
                Популярный
              </div>
              <h3 className="text-xl font-bold mb-3">Про</h3>
              <p className="text-indigo-100 mb-6">Для профессионалов</p>
              <div className="mb-8">
                <span className="text-4xl font-bold">$9</span>
                <span className="text-indigo-200">/месяц</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 justify-center">
                  <Check className="w-5 h-5 flex-shrink-0" />
                  Всё из бесплатного
                </li>
                <li className="flex items-center gap-3 justify-center">
                  <Check className="w-5 h-5 flex-shrink-0" />
                  Расширенная аналитика
                </li>
                <li className="flex items-center gap-3 justify-center">
                  <Check className="w-5 h-5 flex-shrink-0" />
                  Приоритетная поддержка
                </li>
                <li className="flex items-center gap-3 justify-center">
                  <Check className="w-5 h-5 flex-shrink-0" />
                  Кастомные ссылки
                </li>
              </ul>
              <button className="block w-full py-4 text-center bg-white text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-colors">
                Скоро
              </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Бизнес</h3>
              <p className="text-gray-500 mb-6">Для команд</p>
              <div className="mb-8">
                <span className="text-4xl font-bold text-gray-900">$29</span>
                <span className="text-gray-500">/месяц</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 justify-center text-gray-600">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  Всё из Про
                </li>
                <li className="flex items-center gap-3 justify-center text-gray-600">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  Командный доступ
                </li>
                <li className="flex items-center gap-3 justify-center text-gray-600">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  SLA гарантия
                </li>
                <li className="flex items-center gap-3 justify-center text-gray-600">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  Белая метка
                </li>
              </ul>
              <button className="block w-full py-4 text-center bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                Скоро
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* API Section */}
      <section id="api" className="py-20 bg-gray-900 text-white scroll-mt-24 sm:scroll-mt-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-500/20 rounded-full text-indigo-300 font-medium text-sm mb-8">
                <Code2 className="w-4 h-4" />
                <span>REST API</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Мощный API для разработчиков</h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Интегрируйте сервис сокращения ссылок в свои приложения.
                Простой REST API с авторизацией через HTTP Basic Auth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link
                  to="/api-docs"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all"
                >
                  <Code2 className="w-5 h-5" />
                  Документация API
                </Link>
                <a
                  href="http://localhost:8080/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent text-white rounded-xl font-semibold border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all"
                >
                  <Settings className="w-5 h-5" />
                  Swagger UI
                </a>
              </div>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Создание коротких ссылок</span>
                </div>
                <div className="flex items-center gap-4">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Получение статистики кликов</span>
                </div>
                <div className="flex items-center gap-4">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Управление ссылками</span>
                </div>
                <div className="flex items-center gap-4">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Фильтрация и пагинация</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-2xl p-6 font-mono text-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <pre className="text-gray-300 overflow-x-auto whitespace-pre-wrap">
{`# Создание короткой ссылки
curl -X POST /api/links/ \\
  -H "Authorization: Basic base64(user:pass)" \\
  -H "Content-Type: application/json" \\
  -d '{"orig_url": "https://example.com"}'

# Ответ
{
  "id": 1,
  "short_id": "abc123",
  "short_url": "https://short.link/abc123",
  "orig_url": "https://example.com",
  "created_at": "2024-01-01T12:00:00",
  "expire_at": "2024-01-02T12:00:00",
  "is_active": true
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Готовы начать?</h2>
          <p className="text-lg sm:text-xl text-indigo-100 mb-10">
            Присоединяйтесь к тысячам пользователей, которые уже используют наш сервис
          </p>
          <Link
            to="/register"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold text-lg hover:bg-indigo-50 transition-all shadow-lg"
          >
            Создать аккаунт бесплатно
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
