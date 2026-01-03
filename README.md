# 🔗 URL Alias App

> Сервис для создания коротких URL с возможностью просмотра статистики переходов

[![Python](https://img.shields.io/badge/Python-3.13-blue?logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.126.0-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13-4169E1?logo=postgresql&logoColor=white)](https://postgresql.org)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)](https://docker.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📋 Описание проекта

**URL Alias App** — это полнофункциональное веб-приложение для сокращения URL-адресов с расширенной аналитикой. Сервис позволяет пользователям создавать короткие, легко запоминающиеся ссылки и отслеживать статистику их использования в реальном времени.

### Основные сценарии использования:

- 🔗 **Маркетологи** — отслеживание эффективности рекламных кампаний
- 📱 **SMM-специалисты** — создание коротких ссылок для социальных сетей
- 📧 **Email-маркетинг** — компактные ссылки для email-рассылок
- 📊 **Аналитики** — сбор данных о переходах по ссылкам

---

## ✨ Возможности

### Управление ссылками

| Функция | Описание |
|---------|----------|
| ➕ Создание | Генерация короткого URL из длинной ссылки |
| ⏰ Срок действия | Настраиваемое время жизни ссылки (1 час - 1 год) |
| 🔒 Деактивация | Возможность отключить ссылку вручную |
| 📋 Список | Просмотр всех созданных ссылок с пагинацией |
| 🔍 Фильтрация | Фильтр по статусу (активные/неактивные, действующие/истекшие) |

### Аналитика

| Метрика | Описание |
|---------|----------|
| 📈 Клики за час | Количество переходов за последний час |
| 📊 Клики за день | Количество переходов за последние 24 часа |
| 📉 Всего кликов | Общее количество переходов |
| 🏆 Топ ссылок | Рейтинг самых популярных ссылок |
| 🔄 Сортировка | Сортировка по различным временным периодам |

### Пользователи

- 📝 Регистрация новых пользователей
- 🔐 Аутентификация через HTTP Basic Auth
- 👤 Изоляция данных пользователей
- ⛔ Возможность деактивации аккаунтов

---

## 🏗️ Архитектура

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│    Frontend     │────▶│     Nginx       │────▶│    Backend      │
│    (React)      │     │   (Reverse      │     │   (FastAPI)     │
│    Port: 3000   │     │    Proxy)       │     │   Port: 8080    │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └────────┬────────┘
                                                         │
                                                         ▼
                                               ┌─────────────────┐
                                               │                 │
                                               │   PostgreSQL    │
                                               │   Port: 5432    │
                                               │                 │
                                               └─────────────────┘
```

### Потоки данных

1. **Создание короткой ссылки:**
   ```
   User → Frontend → API /api/links (POST) → Generate short_id → Save to DB → Return short URL
   ```

2. **Переход по короткой ссылке:**
   ```
   User → /{short_id} → Backend → Check validity → Log click → Redirect to original URL
   ```

3. **Получение статистики:**
   ```
   User → Frontend → API /api/stats → Aggregate clicks → Return metrics
   ```

---

## 🛠️ Технологический стек

### Backend

| Технология | Версия | Назначение |
|------------|--------|------------|
| **Python** | 3.13 | Язык программирования |
| **FastAPI** | 0.126.0 | Web-фреймворк |
| **SQLAlchemy** | 2.0.45 | ORM для работы с БД |
| **Alembic** | 1.17.2 | Миграции базы данных |
| **Pydantic** | 2.12.5 | Валидация данных |
| **Uvicorn** | — | ASGI сервер |
| **psycopg2** | 2.9.11 | PostgreSQL драйвер |
| **bcrypt** | 4.3.0 | Хеширование паролей |
| **pytest** | 9.0.2 | Тестирование |

### Frontend

| Технология | Версия | Назначение |
|------------|--------|------------|
| **React** | 19.2.0 | UI библиотека |
| **TypeScript** | 5.9 | Типизированный JavaScript |
| **Vite** | 7.2.4 | Сборщик |
| **Tailwind CSS** | 4.1.18 | CSS фреймворк |
| **React Router** | 7.11.0 | Маршрутизация |
| **Lucide React** | 0.562.0 | Иконки |
| **react-hot-toast** | 2.6.0 | Уведомления |

### Инфраструктура

| Технология | Назначение |
|------------|------------|
| **Docker** | Контейнеризация |
| **Docker Compose** | Оркестрация |
| **Nginx** | Reverse proxy, статика |
| **PostgreSQL 13** | База данных |

---

## 🔄 CI/CD

CI/CD реализован через **GitHub Actions** (workflow-файлы в `.github/workflows`).

### ✅ CI: тестирование backend

Workflow: **Backend Tests** (`.github/workflows/backend-tests.yml`)

- Запускается на `pull_request` (ветки: `main`, `master`, `develop`) и на `push` в `main`/`master`.
- Срабатывает только при изменениях в `backend/**` (или `.github/workflows/backend-tests.yml`).
- Устанавливает зависимости из `backend/requirements.txt`.
- Запускает тесты: `pytest --cov=app --cov-report=xml --cov-report=term-missing -v`.
- Публикует `backend/coverage.xml` как artifact.

### 🐳 CI: сборка Docker-образов (проверка сборки)

Workflow: **Build Docker Images** (`.github/workflows/build.yml`)

- Запускается при пуше тега формата `v*` (например, `v1.0.0`).
- Собирает Docker-образы:
  - backend: `./backend` → `url-alias-backend:<tag>`
  - frontend: `./frontend` → `url-alias-frontend:<tag>`

## 📁 Структура проекта

```
url-alias-app/
├── 📄 docker-compose.yaml       # Docker Compose конфигурация
├── 📄 LICENSE                   # Лицензия MIT
├── 📄 README.md                 # Документация
│
├── 📂 backend/                  # Backend (FastAPI)
│   ├── 📄 Dockerfile            # Docker образ backend
│   ├── 📄 entrypoint.sh         # Точка входа контейнера
│   ├── 📄 requirements.txt      # Python зависимости
│   ├── 📄 alembic.ini           # Конфигурация Alembic
│   ├── 📄 create_default_user.py # Скрипт создания пользователя
│   │
│   ├── 📂 alembic/              # Миграции БД
│   │   ├── 📄 env.py
│   │   └── 📂 versions/         # Файлы миграций
│   │
│   ├── 📂 app/                  # Основное приложение
│   │   ├── 📄 main.py           # Точка входа FastAPI
│   │   ├── 📄 exceptions.py     # Кастомные исключения
│   │   │
│   │   ├── 📂 api/              # API слой
│   │   │   ├── 📄 deps.py       # Зависимости (DI)
│   │   │   └── 📂 routes/       # Эндпоинты
│   │   │       ├── 📄 links.py  # CRUD ссылок
│   │   │       ├── 📄 stats.py  # Статистика
│   │   │       ├── 📄 users.py  # Регистрация
│   │   │       └── 📄 public.py # Редиректы
│   │   │
│   │   ├── 📂 core/             # Конфигурация
│   │   │   └── 📄 config.py     # Настройки приложения
│   │   │
│   │   ├── 📂 crud/             # Операции с БД
│   │   │   ├── 📄 link.py       # CRUD ссылок
│   │   │   ├── 📄 stats.py      # Запросы статистики
│   │   │   └── 📄 user.py       # CRUD пользователей
│   │   │
│   │   ├── 📂 db/               # Подключение к БД
│   │   │   ├── 📄 base.py       # Базовая модель
│   │   │   └── 📄 session.py    # Сессии SQLAlchemy
│   │   │
│   │   ├── 📂 models/           # SQLAlchemy модели
│   │   │   ├── 📄 user.py       # Модель User
│   │   │   ├── 📄 link.py       # Модель Link
│   │   │   └── 📄 click.py      # Модель Click
│   │   │
│   │   ├── 📂 schemas/          # Pydantic схемы
│   │   │   ├── 📄 user.py       # Схемы пользователя
│   │   │   ├── 📄 link.py       # Схемы ссылки
│   │   │   └── 📄 stats.py      # Схемы статистики
│   │   │
│   │   └── 📂 utils/            # Утилиты
│   │       ├── 📄 hashing.py    # Хеширование паролей
│   │       └── 📄 short_id.py   # Генерация short_id
│   │
│   └── 📂 tests/                # Тесты
│       ├── 📄 conftest.py       # Pytest фикстуры
│       ├── 📂 api/              # Тесты API
│       ├── 📂 crud/             # Тесты CRUD
│       ├── 📂 utils/            # Тесты утилит
│       └── 📂 fixtures/         # Тестовые данные
│
└── 📂 frontend/                 # Frontend (React)
    ├── 📄 Dockerfile            # Docker образ frontend
    ├── 📄 nginx.conf            # Конфигурация Nginx
    ├── 📄 package.json          # NPM зависимости
    ├── 📄 vite.config.ts        # Конфигурация Vite
    ├── 📄 tsconfig.json         # Конфигурация TypeScript
    ├── 📄 index.html            # HTML шаблон
    │
    └── 📂 src/                  # Исходный код
        ├── 📄 main.tsx          # Точка входа
        ├── 📄 App.tsx           # Корневой компонент
        ├── 📄 index.css         # Глобальные стили
        │
        ├── 📂 api/              # API клиент
        │   └── 📄 index.ts      # API функции
        │
        ├── 📂 components/       # React компоненты
        │   ├── 📄 Header.tsx    # Навигация
        │   ├── 📄 Footer.tsx    # Подвал
        │   └── 📄 ProtectedRoute.tsx # Защищенный маршрут
        │
        ├── 📂 context/          # React контексты
        │   └── 📄 AuthContext.tsx # Контекст авторизации
        │
        ├── 📂 pages/            # Страницы
        │   ├── 📄 LandingPage.tsx   # Главная
        │   ├── 📄 LoginPage.tsx     # Вход
        │   ├── 📄 RegisterPage.tsx  # Регистрация
        │   ├── 📄 DashboardPage.tsx # Дашборд
        │   ├── 📄 StatsPage.tsx     # Статистика
        │   ├── 📄 ApiDocsPage.tsx   # API документация
        │   ├── 📄 NotFoundPage.tsx  # 404
        │   ├── 📄 LinkExpiredPage.tsx  # Ссылка истекла
        │   └── 📄 LinkInactivePage.tsx # Ссылка неактивна
        │
        └── 📂 types/            # TypeScript типы
            └── 📄 index.ts      # Интерфейсы
```

---

## 🚀 Быстрый старт

### Предварительные требования

- [Docker](https://docker.com/get-started) >= 20.10
- [Docker Compose](https://docs.docker.com/compose/install/) >= 2.0
- [Node.js](https://nodejs.org/) >= 20 (для локальной разработки)
- [Python](https://python.org/) >= 3.13 (для локальной разработки)

### Запуск через Docker Compose (рекомендуется)

1. **Клонируйте репозиторий:**
   ```bash
   git clone https://github.com/edu-andyy/url-alias-app.git
   cd url-alias-app
   ```

2. **Создайте файл окружения:**
   ```bash
   cp backend/.env.example backend/.env
   ```

3. **Настройте переменные окружения**

4. **Запустите контейнеры:**
   ```bash
   docker-compose up -d --build
   ```

5. **Проверьте работоспособность:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080/api/health
   - API Docs: http://localhost:8080/docs

### Локальная разработка

#### Backend

```bash
cd backend

# Создайте виртуальное окружение
python -m venv venv
source venv/bin/activate  # Linux/macOS
# или
.\venv\Scripts\activate   # Windows

# Установите зависимости
pip install -r requirements.txt

# Запустите миграции
alembic upgrade head

# Создайте пользователя по умолчанию
python create_default_user.py

# Запустите сервер разработки
uvicorn app.main:app --reload --host 0.0.0.0 --port 8080
```

#### Frontend

```bash
cd frontend

# Установите зависимости
npm install

# Запустите сервер разработки
npm run dev
```

---

## ⚙️ Конфигурация

### Переменные окружения (backend/.env)

```env
# PostgreSQL
POSTGRES_HOST=localhost        # Хост БД (db для Docker)
POSTGRES_PORT=5432             # Порт БД
POSTGRES_USER=postgres         # Пользователь БД
POSTGRES_PASSWORD=secret       # Пароль БД
POSTGRES_DB=url_alias          # Имя БД

# Пользователь по умолчанию
DEFAULT_USER_USERNAME=admin    # Логин по умолчанию
DEFAULT_USER_PASSWORD=admin    # Пароль по умолчанию
```

### Пример .env файла

```env
POSTGRES_HOST=db
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=supersecretpassword
POSTGRES_DB=url_alias

DEFAULT_USER_USERNAME=admin
DEFAULT_USER_PASSWORD=admin123
```

---

## 📚 API документация

### Интерактивная документация

После запуска доступны:
- **Swagger UI:** http://localhost:8080/docs
- **ReDoc:** http://localhost:8080/redoc

### Эндпоинты

#### 👤 Users (Пользователи)

| Метод | Эндпоинт | Описание | Auth |
|-------|----------|----------|------|
| `POST` | `/api/users` | Регистрация пользователя | ❌ |

**Пример запроса:**
```bash
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{"username": "newuser", "password": "password123"}'
```

**Ответ:**
```json
{
  "id": 1,
  "username": "newuser",
  "is_active": true
}
```

---

#### 🔗 Links (Ссылки)

| Метод | Эндпоинт | Описание | Auth |
|-------|----------|----------|------|
| `POST` | `/api/links/` | Создание ссылки | ✅ |
| `GET` | `/api/links/` | Список ссылок пользователя | ✅ |
| `PATCH` | `/api/links/{short_id}/deactivate` | Деактивация ссылки | ✅ |

**Создание ссылки:**
```bash
curl -X POST http://localhost:8080/api/links/ \
  -u "admin:admin123" \
  -H "Content-Type: application/json" \
  -d '{"orig_url": "https://example.com/very/long/url", "expire_seconds": 86400}'
```

**Ответ:**
```json
{
  "id": 1,
  "short_id": "Ab3Cd5Ef",
  "short_url": "http://localhost:8080/Ab3Cd5Ef",
  "orig_url": "https://example.com/very/long/url",
  "user_id": 1,
  "created_at": "2026-01-03T12:00:00Z",
  "expire_at": "2026-01-04T12:00:00Z",
  "is_active": true
}
```

**Получение списка с фильтрами:**
```bash
curl "http://localhost:8080/api/links/?page=1&page_size=10&is_active=true&is_valid=true" \
  -u "admin:admin123"
```

**Параметры фильтрации:**
| Параметр | Тип | Описание |
|----------|-----|----------|
| `page` | int | Номер страницы (по умолчанию: 1) |
| `page_size` | int | Размер страницы (1-100, по умолчанию: 10) |
| `is_valid` | bool | Фильтр по сроку действия |
| `is_active` | bool | Фильтр по статусу активности |

---

#### 📊 Stats (Статистика)

| Метод | Эндпоинт | Описание | Auth |
|-------|----------|----------|------|
| `GET` | `/api/stats/` | Топ ссылок по кликам | ✅ |
| `GET` | `/api/stats/{short_id}` | Статистика конкретной ссылки | ✅ |

**Получение топа:**
```bash
curl "http://localhost:8080/api/stats/?top=10&sort_by=all" \
  -u "admin:admin123"
```

**Параметры:**
| Параметр | Тип | Описание |
|----------|-----|----------|
| `top` | int | Количество ссылок (по умолчанию: 100) |
| `sort_by` | string | Сортировка: `hour`, `day`, `all` |

**Ответ:**
```json
{
  "items": [
    {
      "orig_url": "https://example.com",
      "short_url": "http://localhost:8080/Ab3Cd5Ef",
      "last_hour_clicks": 15,
      "last_day_clicks": 150,
      "all_clicks": 1234
    }
  ]
}
```

---

#### 🧭 Public (Редиректы)

| Метод | Эндпоинт | Описание | Auth |
|-------|----------|----------|------|
| `GET` | `/{short_id}` | Переход по короткой ссылке | ❌ |

**Возможные редиректы:**
- `302` → Оригинальный URL (успех)
- `302` → `/not-found` (ссылка не найдена)
- `302` → `/link-expired` (ссылка истекла)
- `302` → `/link-inactive` (ссылка деактивирована)

---

#### 👌 Health Check

| Метод | Эндпоинт | Описание | Auth |
|-------|----------|----------|------|
| `GET` | `/api/health` | Проверка работоспособности | ❌ |

```bash
curl http://localhost:8080/api/health
# {"status": "ok"}
```

---

## 🧪 Тестирование

### Запуск тестов

```bash
cd backend

# Запуск всех тестов
pytest

# Запуск с покрытием
pytest --cov=app --cov-report=html

# Запуск конкретного файла
pytest tests/api/test_links_routes.py

# Подробный вывод
pytest -v
```

### Структура тестов

```
tests/
├── api/                    # Интеграционные тесты API
│   ├── test_auth_required.py
│   ├── test_links_routes.py
│   ├── test_main_routes.py
│   ├── test_public_routes.py
│   ├── test_stats_routes.py
│   └── test_users_routes.py
│
├── crud/                   # Unit-тесты CRUD операций
│   ├── test_link_crud.py
│   ├── test_stats_crud.py
│   └── test_user_crud.py
│
├── utils/                  # Unit-тесты утилит
│   ├── test_hashing.py
│   └── test_short_id.py
│
├── fixtures/               # Тестовые фикстуры
│   ├── links.py
│   └── user.py
│
└── conftest.py             # Общие фикстуры pytest
```

### Тестовое окружение

Тесты используют SQLite in-memory базу данных для изоляции и скорости:

```python
DATABASE_URL = "sqlite+pysqlite:///:memory:"
```

---

## 🐳 Docker

### Сервисы

| Сервис | Образ | Порт | Описание |
|--------|-------|------|----------|
| `db` | postgres:13 | 5444:5432 | PostgreSQL база данных |
| `backend` | ./backend | 8080:8080 | FastAPI приложение |
| `frontend` | ./frontend | 3000:80 | React + Nginx |

### Volumes

| Volume | Назначение |
|--------|------------|
| `postgres_data` | Персистентное хранилище PostgreSQL |

### Entrypoint Backend

При запуске backend контейнера автоматически выполняются:

1. Применение миграций (`alembic upgrade head`)
2. Создание пользователя по умолчанию
3. Запуск Uvicorn сервера

---

## 📊 База данных

### Схема базы данных

```
┌─────────────────────────────────────────────────────────────┐
│                          users                              │
├─────────────────────────────────────────────────────────────┤
│ id            │ INTEGER     │ PK, AUTO INCREMENT            │
│ username      │ VARCHAR     │ UNIQUE, NOT NULL              │
│ password_hash │ VARCHAR     │ NOT NULL                      │
│ is_active     │ BOOLEAN     │ DEFAULT TRUE                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ 1:N
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                          links                              │
├─────────────────────────────────────────────────────────────┤
│ id            │ INTEGER     │ PK, AUTO INCREMENT            │
│ short_id      │ VARCHAR     │ UNIQUE, NOT NULL, INDEX       │
│ orig_url      │ VARCHAR     │ NOT NULL                      │
│ user_id       │ INTEGER     │ FK → users.id, ON DELETE CASCADE│
│ created_at    │ TIMESTAMP   │ NOT NULL, DEFAULT NOW()       │
│ expire_at     │ TIMESTAMP   │ NOT NULL                      │
│ is_active     │ BOOLEAN     │ DEFAULT TRUE                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ 1:N
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                          clicks                             │
├─────────────────────────────────────────────────────────────┤
│ id            │ INTEGER     │ PK, AUTO INCREMENT            │
│ link_id       │ INTEGER     │ FK → links.id, ON DELETE CASCADE│
│ clicked_at    │ TIMESTAMP   │ NOT NULL, DEFAULT NOW()       │
└─────────────────────────────────────────────────────────────┘
```

### Связи между таблицами

- **User → Links:** Один-ко-многим (пользователь может иметь много ссылок)
- **Link → Clicks:** Один-ко-многим (ссылка может иметь много кликов)

---

## 🔐 Аутентификация

### HTTP Basic Authentication

Сервис использует HTTP Basic Auth для защищённых эндпоинтов.

**Заголовок авторизации:**
```
Authorization: Basic base64(username:password)
```

**Пример с curl:**
```bash
curl -u "username:password" http://localhost:8080/api/links/
```

**Пример с JavaScript:**
```javascript
const credentials = btoa(`${username}:${password}`);
fetch('/api/links/', {
  headers: {
    'Authorization': `Basic ${credentials}`
  }
});
```

### Хеширование паролей

Пароли хешируются с использованием **bcrypt**:

```python
from app.utils.hashing import hash_password, verify_password

# Хеширование
hashed = hash_password("my_password")

# Проверка
is_valid = verify_password("my_password", hashed)
```

### Защищённые маршруты Frontend

React Router защищает приватные страницы через `ProtectedRoute`:

```tsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  }
/>
```

---

## 📱 Frontend

### Страницы приложения

| Путь | Компонент | Описание | Доступ |
|------|-----------|----------|--------|
| `/` | LandingPage | Главная страница | 🌐 Публичный |
| `/login` | LoginPage | Вход в систему | 🌐 Публичный |
| `/register` | RegisterPage | Регистрация | 🌐 Публичный |
| `/dashboard` | DashboardPage | Управление ссылками | 🔒 Приватный |
| `/stats` | StatsPage | Статистика | 🔒 Приватный |
| `/api-docs` | ApiDocsPage | Документация API | 🌐 Публичный |
| `/link-expired` | LinkExpiredPage | Ссылка истекла | 🌐 Публичный |
| `/link-inactive` | LinkInactivePage | Ссылка неактивна | 🌐 Публичный |
| `/not-found` | NotFoundPage | 404 страница | 🌐 Публичный |

### Ключевые компоненты

- **AuthContext** — управление состоянием авторизации
- **ProtectedRoute** — HOC для защиты приватных маршрутов
- **Header** — навигация с учётом статуса авторизации
- **Footer** — подвал сайта

### API клиент

Централизованный API клиент в `src/api/index.ts`:

```typescript
// Авторизация
login(username, password)
logout()
isAuthenticated()

// Ссылки
createLink(data)
getLinks(page, pageSize, isValid, isActive)
deactivateLink(shortId)

// Статистика
getStats(top, sortBy)
getLinkStats(shortId)

// Пользователи
registerUser(data)
```

### Сборка для production

```bash
cd frontend

# Сборка
npm run build

# Превью
npm run preview
```

Результат сборки в папке `dist/` копируется в Nginx контейнер.

---

## 🔧 Дополнительные возможности

### Генерация коротких идентификаторов

Алгоритм генерации `short_id`:
- Длина: 8 символов
- Алфавит: `a-z`, `A-Z`, `0-9` (62 символа)
- Комбинаций: 62^8 ≈ 218 триллионов
- Проверка уникальности в БД
- До 10 попыток генерации

```python
def generate_short_id(db: Session, length: int = 8) -> str:
    alphabet = ascii_letters + digits
    for _ in range(10):
        short_id = "".join(choices(alphabet, k=length))
        if crud_get_link_by_short_id(db, short_id) is None:
            return short_id
    raise ShortIdGenerationError("Failed to generate unique short ID")
```

### Обработка ошибок

Кастомные исключения в `app/exceptions.py`:
- `LinkCreateError` — ошибка создания ссылки
- `LinkNotFoundError` — ссылка не найдена
- `LinkUpdateError` — ошибка обновления ссылки
- `UserAlreadyExistsError` — пользователь уже существует
- `UserCreateError` — ошибка создания пользователя
- `ShortIdGenerationError` — ошибка генерации ID
- `ClickLogError` — ошибка логирования клика
