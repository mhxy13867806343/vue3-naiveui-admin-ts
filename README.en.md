English | [中文](./README.md)

# Vue3 Naive UI Admin TS

An admin dashboard template built with Vue 3 + TypeScript + Vite 8 + Naive UI.

## 🚀 Tech Stack

| Technology | Version | Description |
|------------|---------|-------------|
| Vue | 3.5+ | Progressive JavaScript framework |
| TypeScript | 5.8+ | Type safety |
| Vite | 8.0+ | Next-generation frontend build tool |
| Naive UI | 2.41+ | Vue 3 component library |
| Pinia | 3.0+ | State management |
| Vue Router | 4.5+ | Routing |
| vue-i18n | 11+ | Internationalization (Chinese / English) |
| Axios | 1.9+ | HTTP client |
| Tailwind CSS | 4.2+ | Utility-first CSS framework |
| ECharts | 6.0+ | Data visualization charts |
| MockJS | 1.1+ | Mock data simulation |

## ✨ Features

- 🔐 **Dynamic Routes & Permission Control** — Role-based dynamic route registration, v-permission directive
- 🌍 **Internationalization** — Chinese / English toggle with language switcher
- 📱 **Multiple Login Methods** — Username / Phone / Email login with 5 switchable templates
- 📝 **Registration Pages** — Username / Phone / Email registration with 5 templates
- 🎨 **Naive UI** — On-demand import with auto-registered components
- 📦 **Auto Import** — unplugin-auto-import + unplugin-vue-components
- 🗂 **Mock Data** — MockJS API simulation, toggled via environment variables
- 🔧 **Utility Libraries** — dayjs / lodash-es wrappers, common validation rules
- 📊 **Chart Components** — ECharts wrappers for line / bar / pie / radar charts
- 🧩 **Third-Party Components** — Rich text editor / drag-and-drop list wrappers
- 🏗 **Build Optimization** — gzip + brotli compression, chunk splitting, terser minification
- 📐 **Code Standards** — ESLint + Prettier
- 📋 **CRUD Management** — Full create / read / update / delete for users, menus, departments, articles, categories, and tags

## 📸 Screenshots

<!-- Add project screenshots here -->
> Screenshots coming soon

## 📦 Quick Start

```bash
# Clone the repository
git clone https://github.com/mhxy13867806343/vue3-naiveui-admin-ts.git
cd vue3-naiveui-admin-ts

# Install dependencies
pnpm install

# Start the development server
pnpm dev

# Build for production
pnpm build
```

## 🔑 Test Accounts

| Role | Username | Password | Permissions |
|------|----------|----------|-------------|
| Admin | admin | admin123 | Full access |
| User | user | user123 | Basic access |

## 📁 Directory Structure

```
src/
├── api/                    # HTTP requests & Mock
│   ├── http.ts             # Axios wrapper
│   └── mock/               # Mock data
├── assets/                 # Static assets
├── composables/            # Vue 3 Composable Hooks
│   ├── useLoading.ts       # Loading state
│   ├── usePermission.ts    # Permission checks
│   ├── usePagination.ts    # Pagination logic
│   └── useSmsCountdown.ts  # SMS countdown
├── components/             # Shared components
│   └── third-party/        # Third-party component wrappers
├── directives/             # Custom directives
│   └── permission.ts       # v-permission
├── layouts/                # Layout components
│   ├── AdminLayout.vue     # Admin layout
│   ├── Sidebar.vue         # Sidebar
│   └── Header.vue          # Header
├── locales/                # i18n language packs
├── router/                 # Router configuration
│   ├── index.ts            # Static routes
│   ├── dynamic-routes.ts   # Dynamic route definitions
│   ├── dynamic-router.ts   # Dynamic registration logic
│   └── guard.ts            # Route guards
├── stores/                 # Pinia state management
│   ├── auth.ts             # Authentication state
│   └── permission.ts       # Permission state
├── styles/                 # Global styles
├── types/                  # TypeScript type definitions
├── utils/                  # Utility functions
│   ├── env.ts              # Environment variables
│   ├── validators.ts       # Common validation patterns
│   ├── form-rules.ts       # Form validation rule factory
│   ├── dayjs.ts            # dayjs wrapper
│   └── lodash.ts           # lodash-es wrapper
├── views/                  # Pages
│   ├── login/              # Login pages (5 templates)
│   ├── register/           # Registration pages (5 templates)
│   ├── dashboard/          # Dashboard
│   ├── system/             # System management (users / menus / departments)
│   ├── content/            # Content management (articles / categories / tags)
│   ├── permission/         # Permission management
│   └── error/              # Error pages (401 / 403 / 404 / 500)
├── App.vue                 # Root component
└── main.ts                 # Entry point
```

## 🛠 Available Commands

```bash
pnpm dev            # Start dev server (localhost:3100)
pnpm build          # Build for production
pnpm build:analyze  # Build with bundle analysis
pnpm preview        # Preview production build
pnpm lint           # Run ESLint
pnpm format         # Run Prettier
```

## 🌐 Environment Variables

| Variable | Description | Dev Default | Prod Default |
|----------|-------------|-------------|--------------|
| VITE_APP_TITLE | App title | Admin Dashboard | Admin Dashboard |
| VITE_APP_API_BASE_URL | API base URL | http://localhost:3000/api | /api |
| VITE_APP_MOCK_ENABLED | Enable mock data | true | false |

## 📄 License

MIT
