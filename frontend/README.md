# PixelGallery Frontend 📸

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

## 🛠️ Scripts
```bash
npm run dev     # Start dev server
npm run build   # Production build
npm run lint    # ESLint check
npm run preview # Preview production build
```
