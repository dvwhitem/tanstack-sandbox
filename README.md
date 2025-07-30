# TanStack Query Sandbox

Educational project for learning and practicing TanStack Query (React Query), nuqs, shadcn/ui, and Next.js App Router.

## 🚀 Tech Stack

* **Next.js** (App Router, TypeScript)
* **React 18+**
* **@tanstack/react-query** — data-fetching and caching
* **@tanstack/react-query-devtools** — Devtools for query debugging
* **nuqs** — stateful URL query parameter management
* **zod** — query param validation and transformation
* **shadcn/ui** — modern UI component library
* **Tailwind CSS** — utility-first CSS framework

## 📂 Project Structure

```
/src
├── app
│   └── users
│       ├── page.tsx          // server-side component (App Router)
│       └── users-list.tsx    // client-side component using useQuery & nuqs
├── components/ui            // shadcn UI components
├── hooks
├── provider
│   └── react-query-provider.tsx
```

## 📄 Features Implemented

* ⚛️ QueryClient initialized using `useState(() => new QueryClient())`
* 🔄 Fetching user list from JSONPlaceholder API
* 📊 Sorting users by name (asc/desc) using `useQueryState('sort')`
* 📄 Pagination with `page` param and dynamic enabling/disabling of navigation buttons
* ✅ Validation of query params using `zod`
* 💡 SSR-compatible layout + isolated Client Components
* 🔍 React Query Devtools enabled

## 💡 Project Goal

To practice modern approaches for asynchronous data fetching, caching, and URL state management in real-world React (Next.js) applications.

## 📦 Getting Started

```bash
yarn install
yarn dev
```

---

This project will continue to grow with more examples: filters, forms, optimistic UI, mutations, local storage persist, and advanced query use-cases.
