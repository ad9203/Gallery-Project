import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'pixelgallery_favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error('Failed to load favorites from localStorage', err);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (err) {
      console.error('Failed to save favorites to localStorage', err);
    }
  }, [favorites]);

  const isFavorite = useCallback(
    (id) => favorites.some((item) => String(item.id) === String(id)),
    [favorites]
  );

  const toggleFavorite = useCallback((photo) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => String(item.id) === String(photo.id));
      if (exists) {
        return prev.filter((item) => String(item.id) !== String(photo.id));
      } else {
        return [photo, ...prev];
      }
    });
  }, []);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    clearFavorites,
    favoritesCount: favorites.length,
  };
};
