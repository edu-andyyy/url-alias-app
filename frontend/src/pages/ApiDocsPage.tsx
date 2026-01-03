import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Book,
  Link2,
  Users,
  BarChart3,
  Globe,
  ChevronDown,
  ChevronRight,
  Copy,
  Check,
  Lock,
  ExternalLink,
  Code2,
  ArrowRight
} from 'lucide-react';

interface EndpointProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  title: string;
  description: string;
  auth?: boolean;
  requestBody?: {
    type: string;
    fields: Array<{
      name: string;
      type: string;
      required: boolean;
      description: string;
    }>;
    example?: string;
  };
  queryParams?: Array<{
    name: string;
    type: string;
    required: boolean;
    default?: string;
    description: string;
  }>;
  pathParams?: Array<{
    name: string;
    type: string;
    description: string;
  }>;
  responses: Array<{
    status: number;
    description: string;
    example?: string;
  }>;
}

const methodColors: Record<string, string> = {
  GET: 'bg-green-100 text-green-700 border-green-200',
  POST: 'bg-blue-100 text-blue-700 border-blue-200',
  PUT: 'bg-amber-100 text-amber-700 border-amber-200',
  DELETE: 'bg-red-100 text-red-700 border-red-200',
  PATCH: 'bg-purple-100 text-purple-700 border-purple-200',
};

const CodeBlock: React.FC<{ code: string; language?: string }> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-gray-300" />
        )}
      </button>
    </div>
  );
};

const Endpoint: React.FC<EndpointProps> = ({
  method,
  path,
  title,
  description,
  auth,
  requestBody,
  queryParams,
  pathParams,
  responses,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left"
      >
        <span className={`px-3 py-1 rounded-md text-xs font-bold border ${methodColors[method]}`}>
          {method}
        </span>
        <code className="text-sm text-gray-700 font-mono flex-1">{path}</code>
        {auth && (
          <span className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
            <Lock className="w-3 h-3" />
            Auth
          </span>
        )}
        <span className="text-gray-500 text-sm hidden sm:block">{title}</span>
        {isOpen ? (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {isOpen && (
        <div className="border-t border-gray-200 p-6 space-y-6 bg-gray-50">
          <p className="text-gray-700">{description}</p>

          {auth && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-amber-700 font-medium mb-2">
                <Lock className="w-4 h-4" />
                Требуется аутентификация
              </div>
              <p className="text-sm text-amber-600">
                Используйте HTTP Basic Auth с вашим именем пользователя и паролем.
              </p>
            </div>
          )}

          {pathParams && pathParams.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Параметры пути</h4>
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left p-3 font-medium text-gray-700">Параметр</th>
                      <th className="text-left p-3 font-medium text-gray-700">Тип</th>
                      <th className="text-left p-3 font-medium text-gray-700">Описание</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pathParams.map((param) => (
                      <tr key={param.name} className="border-t border-gray-200">
                        <td className="p-3">
                          <code className="text-indigo-600">{param.name}</code>
                        </td>
                        <td className="p-3 text-gray-600">{param.type}</td>
                        <td className="p-3 text-gray-600">{param.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {queryParams && queryParams.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Query параметры</h4>
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left p-3 font-medium text-gray-700">Параметр</th>
                      <th className="text-left p-3 font-medium text-gray-700">Тип</th>
                      <th className="text-left p-3 font-medium text-gray-700">По умолчанию</th>
                      <th className="text-left p-3 font-medium text-gray-700">Описание</th>
                    </tr>
                  </thead>
                  <tbody>
                    {queryParams.map((param) => (
                      <tr key={param.name} className="border-t border-gray-200">
                        <td className="p-3">
                          <code className="text-indigo-600">{param.name}</code>
                          {param.required && (
                            <span className="ml-2 text-xs text-red-500">*</span>
                          )}
                        </td>
                        <td className="p-3 text-gray-600">{param.type}</td>
                        <td className="p-3 text-gray-600">
                          {param.default ? <code>{param.default}</code> : '—'}
                        </td>
                        <td className="p-3 text-gray-600">{param.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {requestBody && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Тело запроса ({requestBody.type})</h4>
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-4">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left p-3 font-medium text-gray-700">Поле</th>
                      <th className="text-left p-3 font-medium text-gray-700">Тип</th>
                      <th className="text-left p-3 font-medium text-gray-700">Обязательное</th>
                      <th className="text-left p-3 font-medium text-gray-700">Описание</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requestBody.fields.map((field) => (
                      <tr key={field.name} className="border-t border-gray-200">
                        <td className="p-3">
                          <code className="text-indigo-600">{field.name}</code>
                        </td>
                        <td className="p-3 text-gray-600">{field.type}</td>
                        <td className="p-3">
                          {field.required ? (
                            <span className="text-green-600">Да</span>
                          ) : (
                            <span className="text-gray-400">Нет</span>
                          )}
                        </td>
                        <td className="p-3 text-gray-600">{field.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {requestBody.example && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Пример запроса:</p>
                  <CodeBlock code={requestBody.example} />
                </div>
              )}
            </div>
          )}

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Ответы</h4>
            <div className="space-y-4">
              {responses.map((response, idx) => (
                <div key={idx} className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-bold ${
                        response.status >= 200 && response.status < 300
                          ? 'bg-green-100 text-green-700'
                          : response.status >= 400
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {response.status}
                    </span>
                    <span className="text-gray-600">{response.description}</span>
                  </div>
                  {response.example && <CodeBlock code={response.example} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ApiDocsPage: React.FC = () => {
  const sections = [
    { id: 'overview', title: 'Обзор', icon: Book },
    { id: 'auth', title: 'Аутентификация', icon: Lock },
    { id: 'users', title: 'Пользователи', icon: Users },
    { id: 'links', title: 'Ссылки', icon: Link2 },
    { id: 'stats', title: 'Статистика', icon: BarChart3 },
    { id: 'redirect', title: 'Редирект', icon: Globe },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="py-10 px-6 sm:px-8 lg:px-12 bg-gray-50 min-h-[calc(100vh-64px)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar / Table of Contents */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-24 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Book className="w-5 h-5 text-indigo-500" />
                Содержание
              </h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors text-left"
                  >
                    <section.icon className="w-4 h-4" />
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-12">
            {/* Header */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Code2 className="w-10 h-10" />
                <h1 className="text-3xl font-bold">API Документация</h1>
              </div>
              <p className="text-indigo-100 text-lg max-w-2xl">
                Полная документация по REST API сервиса ShortLink. Создавайте короткие ссылки,
                отслеживайте статистику и управляйте пользователями.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="bg-white/10 backdrop-blur rounded-lg px-4 py-2">
                  <span className="text-indigo-200 text-sm">Base URL</span>
                  <p className="font-mono text-white">/api</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg px-4 py-2">
                  <span className="text-indigo-200 text-sm">Версия</span>
                  <p className="font-mono text-white">1.0.0</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg px-4 py-2">
                  <span className="text-indigo-200 text-sm">Формат</span>
                  <p className="font-mono text-white">JSON</p>
                </div>
              </div>
            </div>

            {/* Overview Section */}
            <section id="overview" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Book className="w-7 h-7 text-indigo-500" />
                Обзор
              </h2>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
                <p className="text-gray-700">
                  ShortLink API предоставляет RESTful интерфейс для создания и управления короткими ссылками.
                  API поддерживает все основные операции CRUD и предоставляет детальную статистику кликов.
                </p>
                <h3 className="font-semibold text-gray-900 pt-4">Основные возможности:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Создание коротких ссылок с настраиваемым сроком действия</li>
                  <li>Отслеживание кликов в реальном времени</li>
                  <li>Деактивация и управление ссылками</li>
                  <li>Получение детальной статистики по каждой ссылке</li>
                  <li>Фильтрация и пагинация результатов</li>
                </ul>
                <h3 className="font-semibold text-gray-900 pt-4">Формат ответов:</h3>
                <p className="text-gray-700 mb-3">Все ответы возвращаются в формате JSON. Успешные ответы имеют код 2xx.</p>
                <CodeBlock
                  code={`{
  "short_id": "abc123",
  "orig_url": "https://example.com/very/long/url",
  "is_active": true,
  "expire_at": "2026-01-10T12:00:00Z",
  "click_count": 42,
  "created_at": "2026-01-03T12:00:00Z"
}`}
                />
              </div>
            </section>

            {/* Authentication Section */}
            <section id="auth" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Lock className="w-7 h-7 text-indigo-500" />
                Аутентификация
              </h2>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
                <p className="text-gray-700">
                  API использует <strong>HTTP Basic Authentication</strong> для защищённых эндпоинтов.
                  Передайте имя пользователя и пароль в заголовке Authorization.
                </p>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Формат заголовка:</h3>
                  <CodeBlock code={`Authorization: Basic <base64(username:password)>`} />
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Пример запроса с curl:</h3>
                  <CodeBlock
                    code={`curl -X GET "http://localhost:8000/api/links/" \\
  -u "username:password" \\
  -H "Content-Type: application/json"`}
                  />
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Пример запроса с JavaScript:</h3>
                  <CodeBlock
                    code={`const credentials = btoa('username:password');

fetch('http://localhost:8000/api/links/', {
  headers: {
    'Authorization': \`Basic \${credentials}\`,
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));`}
                  />
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-700">
                    <strong>Важно:</strong> Некоторые эндпоинты (регистрация пользователя и редирект по короткой ссылке)
                    не требуют аутентификации.
                  </p>
                </div>
              </div>
            </section>

            {/* Users Section */}
            <section id="users" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Users className="w-7 h-7 text-indigo-500" />
                Пользователи
              </h2>
              <div className="space-y-4">
                <Endpoint
                  method="POST"
                  path="/api/users/register"
                  title="Регистрация"
                  description="Создание нового пользователя в системе. После регистрации можно использовать учётные данные для аутентификации."
                  requestBody={{
                    type: 'application/json',
                    fields: [
                      { name: 'username', type: 'string', required: true, description: 'Уникальное имя пользователя' },
                      { name: 'password', type: 'string', required: true, description: 'Пароль (минимум 4 символа)' },
                    ],
                    example: `{
  "username": "john_doe",
  "password": "securePassword123"
}`,
                  }}
                  responses={[
                    {
                      status: 200,
                      description: 'Пользователь успешно создан',
                      example: `{
  "id": 1,
  "username": "john_doe"
}`,
                    },
                    {
                      status: 400,
                      description: 'Пользователь с таким именем уже существует',
                      example: `{
  "detail": "User already exists"
}`,
                    },
                  ]}
                />

                <Endpoint
                  method="GET"
                  path="/api/users/me"
                  title="Текущий пользователь"
                  description="Получение информации о текущем аутентифицированном пользователе."
                  auth
                  responses={[
                    {
                      status: 200,
                      description: 'Информация о пользователе',
                      example: `{
  "id": 1,
  "username": "john_doe"
}`,
                    },
                    { status: 401, description: 'Неверные учётные данные' },
                  ]}
                />
              </div>
            </section>

            {/* Links Section */}
            <section id="links" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Link2 className="w-7 h-7 text-indigo-500" />
                Ссылки
              </h2>
              <div className="space-y-4">
                <Endpoint
                  method="POST"
                  path="/api/links/"
                  title="Создать ссылку"
                  description="Создание новой короткой ссылки. Можно указать время жизни ссылки в секундах."
                  auth
                  requestBody={{
                    type: 'application/json',
                    fields: [
                      { name: 'orig_url', type: 'string', required: true, description: 'Исходный URL для сокращения (должен быть валидным URL)' },
                      { name: 'expire_seconds', type: 'integer', required: false, description: 'Время жизни ссылки в секундах (по умолчанию 86400 = 1 день)' },
                    ],
                    example: `{
  "orig_url": "https://example.com/very/long/url/path",
  "expire_seconds": 604800
}`,
                  }}
                  responses={[
                    {
                      status: 200,
                      description: 'Ссылка успешно создана',
                      example: `{
  "short_id": "xK9mP2",
  "short_url": "http://localhost:8000/xK9mP2",
  "orig_url": "https://example.com/very/long/url/path",
  "is_active": true,
  "expire_at": "2026-01-10T12:00:00Z",
  "click_count": 0,
  "created_at": "2026-01-03T12:00:00Z"
}`,
                    },
                    { status: 401, description: 'Требуется аутентификация' },
                    { status: 422, description: 'Невалидный URL' },
                  ]}
                />

                <Endpoint
                  method="GET"
                  path="/api/links/"
                  title="Список ссылок"
                  description="Получение списка всех ссылок текущего пользователя с поддержкой пагинации и фильтрации."
                  auth
                  queryParams={[
                    { name: 'page', type: 'integer', required: false, default: '1', description: 'Номер страницы' },
                    { name: 'page_size', type: 'integer', required: false, default: '10', description: 'Количество элементов на странице' },
                    { name: 'is_valid', type: 'boolean', required: false, description: 'Фильтр по валидности (не истёк срок действия)' },
                    { name: 'is_active', type: 'boolean', required: false, description: 'Фильтр по активности' },
                  ]}
                  responses={[
                    {
                      status: 200,
                      description: 'Список ссылок с пагинацией',
                      example: `{
  "items": [
    {
      "short_id": "xK9mP2",
      "short_url": "http://localhost:8000/xK9mP2",
      "orig_url": "https://example.com/...",
      "is_active": true,
      "expire_at": "2026-01-10T12:00:00Z",
      "click_count": 42,
      "created_at": "2026-01-03T12:00:00Z"
    }
  ],
  "total_items": 25,
  "total_pages": 3,
  "current_page": 1
}`,
                    },
                    { status: 401, description: 'Требуется аутентификация' },
                  ]}
                />

                <Endpoint
                  method="GET"
                  path="/api/links/{short_id}"
                  title="Получить ссылку"
                  description="Получение информации о конкретной ссылке по её короткому идентификатору."
                  auth
                  pathParams={[{ name: 'short_id', type: 'string', description: 'Короткий идентификатор ссылки' }]}
                  responses={[
                    {
                      status: 200,
                      description: 'Информация о ссылке',
                      example: `{
  "short_id": "xK9mP2",
  "short_url": "http://localhost:8000/xK9mP2",
  "orig_url": "https://example.com/very/long/url/path",
  "is_active": true,
  "expire_at": "2026-01-10T12:00:00Z",
  "click_count": 42,
  "created_at": "2026-01-03T12:00:00Z"
}`,
                    },
                    { status: 401, description: 'Требуется аутентификация' },
                    { status: 404, description: 'Ссылка не найдена' },
                  ]}
                />

                <Endpoint
                  method="PUT"
                  path="/api/links/{short_id}"
                  title="Обновить ссылку"
                  description="Обновление исходного URL существующей ссылки."
                  auth
                  pathParams={[{ name: 'short_id', type: 'string', description: 'Короткий идентификатор ссылки' }]}
                  requestBody={{
                    type: 'application/json',
                    fields: [
                      { name: 'orig_url', type: 'string', required: true, description: 'Новый исходный URL' },
                    ],
                    example: `{
  "orig_url": "https://new-example.com/updated-url"
}`,
                  }}
                  responses={[
                    {
                      status: 200,
                      description: 'Ссылка успешно обновлена',
                      example: `{
  "short_id": "xK9mP2",
  "short_url": "http://localhost:8000/xK9mP2",
  "orig_url": "https://new-example.com/updated-url",
  "is_active": true,
  "expire_at": "2026-01-10T12:00:00Z",
  "click_count": 42,
  "created_at": "2026-01-03T12:00:00Z"
}`,
                    },
                    { status: 401, description: 'Требуется аутентификация' },
                    { status: 404, description: 'Ссылка не найдена' },
                  ]}
                />

                <Endpoint
                  method="DELETE"
                  path="/api/links/{short_id}"
                  title="Удалить ссылку"
                  description="Полное удаление ссылки из системы. Это действие необратимо."
                  auth
                  pathParams={[{ name: 'short_id', type: 'string', description: 'Короткий идентификатор ссылки' }]}
                  responses={[
                    { status: 204, description: 'Ссылка успешно удалена (без тела ответа)' },
                    { status: 401, description: 'Требуется аутентификация' },
                    { status: 404, description: 'Ссылка не найдена' },
                  ]}
                />

                <Endpoint
                  method="PATCH"
                  path="/api/links/{short_id}/deactivate"
                  title="Деактивировать ссылку"
                  description="Деактивация ссылки. Деактивированная ссылка перестаёт работать, но остаётся в системе и может быть просмотрена."
                  auth
                  pathParams={[{ name: 'short_id', type: 'string', description: 'Короткий идентификатор ссылки' }]}
                  responses={[
                    {
                      status: 200,
                      description: 'Ссылка деактивирована',
                      example: `{
  "short_id": "xK9mP2",
  "short_url": "http://localhost:8000/xK9mP2",
  "orig_url": "https://example.com/...",
  "is_active": false,
  "expire_at": "2026-01-10T12:00:00Z",
  "click_count": 42,
  "created_at": "2026-01-03T12:00:00Z"
}`,
                    },
                    { status: 401, description: 'Требуется аутентификация' },
                    { status: 404, description: 'Ссылка не найдена' },
                  ]}
                />
              </div>
            </section>

            {/* Stats Section */}
            <section id="stats" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <BarChart3 className="w-7 h-7 text-indigo-500" />
                Статистика
              </h2>
              <div className="space-y-4">
                <Endpoint
                  method="GET"
                  path="/api/stats/"
                  title="Общая статистика"
                  description="Получение статистики кликов по всем ссылкам пользователя. Можно отсортировать по кликам за разные периоды."
                  auth
                  queryParams={[
                    { name: 'top', type: 'integer', required: false, default: '10', description: 'Количество записей в выборке' },
                    { name: 'sort_by', type: 'string', required: false, default: 'all', description: 'Сортировка: "hour", "day" или "all"' },
                  ]}
                  responses={[
                    {
                      status: 200,
                      description: 'Статистика кликов',
                      example: `{
  "items": [
    {
      "short_id": "xK9mP2",
      "orig_url": "https://example.com/...",
      "all_clicks": 1234,
      "last_day_clicks": 56,
      "last_hour_clicks": 12
    },
    {
      "short_id": "aB3cD4",
      "orig_url": "https://another.com/...",
      "all_clicks": 890,
      "last_day_clicks": 34,
      "last_hour_clicks": 5
    }
  ]
}`,
                    },
                    { status: 401, description: 'Требуется аутентификация' },
                  ]}
                />

                <Endpoint
                  method="GET"
                  path="/api/stats/{short_id}"
                  title="Статистика ссылки"
                  description="Получение детальной статистики кликов для конкретной ссылки."
                  auth
                  pathParams={[{ name: 'short_id', type: 'string', description: 'Короткий идентификатор ссылки' }]}
                  responses={[
                    {
                      status: 200,
                      description: 'Статистика конкретной ссылки',
                      example: `{
  "short_id": "xK9mP2",
  "orig_url": "https://example.com/very/long/url/path",
  "all_clicks": 1234,
  "last_day_clicks": 56,
  "last_hour_clicks": 12
}`,
                    },
                    { status: 401, description: 'Требуется аутентификация' },
                    { status: 404, description: 'Ссылка не найдена' },
                  ]}
                />
              </div>
            </section>

            {/* Redirect Section */}
            <section id="redirect" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Globe className="w-7 h-7 text-indigo-500" />
                Редирект
              </h2>
              <div className="space-y-4">
                <Endpoint
                  method="GET"
                  path="/{short_id}"
                  title="Переход по ссылке"
                  description="Публичный эндпоинт для перехода по короткой ссылке. Не требует аутентификации. При переходе автоматически записывается клик в статистику."
                  pathParams={[{ name: 'short_id', type: 'string', description: 'Короткий идентификатор ссылки' }]}
                  responses={[
                    { status: 302, description: 'Редирект на исходный URL' },
                    { status: 302, description: 'Редирект на /not-found (ссылка не найдена)' },
                    { status: 302, description: 'Редирект на /link-expired (ссылка истекла)' },
                    { status: 302, description: 'Редирект на /link-inactive (ссылка деактивирована)' },
                  ]}
                />
              </div>
            </section>

            {/* CTA */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Готовы начать?</h3>
              <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                Зарегистрируйтесь и начните использовать API для сокращения ссылок уже сегодня.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                >
                  Создать аккаунт
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="http://localhost:8080/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
                >
                  <ExternalLink className="w-5 h-5" />
                  Swagger UI
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ApiDocsPage;
