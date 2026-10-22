import { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchPhotos, prefetchPhotos, clearPhotoCache } from '../services/api';

export const useGallery = (initialLimit = 20) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);
  const [photos, setPhotos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();

    async function loadData() {
      setIsLoading(true);
      setError(null);

      try {
        const result = await fetchPhotos(page, limit, controller.signal);
        if (!ignore) {
          setPhotos(result.data || []);
          setIsLoading(false);
          prefetchPhotos(page + 1, limit);
        }
      } catch (err) {
        if (!ignore && err.name !== 'CanceledError') {
          console.error('Failed to load photos:', err);
          setError('Failed to fetch photos. Please check your network.');
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      ignore = true;
      controller.abort();
    };
  }, [page, limit, reloadTrigger]);

  const handlePageChange = useCallback((newPage) => {
    if (newPage < 1) return;
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleLimitChange = useCallback((newLimit) => {
    setLimit(newLimit);
    setPage(1);
  }, []);

  const handleRefresh = useCallback(() => {
    clearPhotoCache();
    setReloadTrigger((count) => count + 1);
  }, []);

  // Filter photos by author name if search query is present
  const filteredPhotos = useMemo(() => {
    if (!searchQuery.trim()) return photos;
    const query = searchQuery.toLowerCase().trim();
    return photos.filter((item) =>
      item.author?.toLowerCase().includes(query)
    );
  }, [photos, searchQuery]);

  return {
    page,
    limit,
    photos,
    filteredPhotos,
    searchQuery,
    isLoading,
    error,
    setSearchQuery,
    handlePageChange,
    handleLimitChange,
    handleRefresh,
  };
};
