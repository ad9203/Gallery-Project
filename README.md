# PixelGallery 📸 [link - https://pixelgallery-rho.vercel.app/ ]

A high-performance, modern photo gallery web application built with React 19, Vite, and Tailwind CSS.

## 🚀 Performance Improvements & Features
- **95%+ Faster Image Loading:** Replaced raw multi-megabyte downloads with optimized WebP responsive thumbnails (`picsum.photos/id/{id}/600/420.webp`).
- **Zero-Latency In-Memory Cache:** Navigating back and forth between previously visited pages happens instantaneously with 0ms delay.
- **Background Prefetching:** The next page is preloaded in the background as you view the current page.
- **Progressive Image Loading & Skeletons:** Smooth shimmer skeleton cards while fetching, with graceful fade-in once images are decoded.
- **Interactive Lightbox Modal:** Full-screen high-res preview with keyboard navigation (Esc, Left, Right), dimensions, and Unsplash links.
- **Real-Time Search & Filtering:** Filter photos by photographer name instantly.
- **Favorites System:** Save photos to favorites with persistence in `localStorage`.
- **One-Click Downloads:** Download full-resolution photos directly to your device.
- **Customizable Pagination:** Page jumper and customizable per-page count (15, 20, 30, 40).

---

## 📁 Project Architecture & Folder Structure

```
Gallery-Project/
├── package.json              # Root package with convenient delegate scripts
├── README.md
└── frontend/                 # Complete frontend application
    ├── index.html            # Entry HTML with preconnect optimizations
    ├── package.json
    ├── vite.config.js
    ├── eslint.config.js
    └── src/
        ├── assets/           # Static icons and assets
        ├── components/
        │   ├── Header.jsx       # Top navigation, search, and mode switch
        │   ├── Card.jsx         # Optimized image card with actions
        │   ├── SkeletonCard.jsx # Shimmer placeholder during loading
        │   ├── ImageModal.jsx   # Lightbox modal with download & copy
        │   ├── Pagination.jsx   # Pagination controls & direct jump
        │   ├── EmptyState.jsx   # Empty states for search/favorites
        │   └── Toast.jsx        # Action notification toasts
        ├── hooks/
        │   ├── useGallery.js    # Gallery state, cache & prefetch logic
        │   └── useFavorites.js  # LocalStorage-backed favorites hook
        ├── services/
        │   └── api.js           # Axios API client with Map cache
        ├── utils/
        │   └── imageUtils.js    # URL helpers, downloads & clipboard
        ├── App.jsx              # Main application coordinator
        ├── main.jsx             # React root mount
        └── index.css            # Tailwind CSS & animations
```

---

## 🛠️ Getting Started

### Run from Root
```bash
npm run dev
```

### Or Run directly inside `frontend`
```bash
cd frontend
npm run dev
```

The application will be accessible at: **[http://localhost:5173/](http://localhost:5173/)**
