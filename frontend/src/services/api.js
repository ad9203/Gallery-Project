import axios from 'axios';

const BASE_URL = 'https://picsum.photos/v2';
const cache = new Map();

/**
 * Fetch photos from Picsum API with in-memory caching
 */
export const fetchPhotos = async (page = 1, limit = 20, signal = null) => {
  const cacheKey = `page_${page}_limit_${limit}`;

  if (cache.has(cacheKey)) {
    return { data: cache.get(cacheKey), fromCache: true };
  }

  const response = await axios.get(`${BASE_URL}/list`, {
    params: { page, limit },
    signal,
    timeout: 10000,
  });

  if (response.data && Array.isArray(response.data)) {
    cache.set(cacheKey, response.data);
  }

  return { data: response.data, fromCache: false };
};

/**
 * Prefetch the next page in background to make pagination instant
 */
export const prefetchPhotos = (page, limit = 20) => {
  const cacheKey = `page_${page}_limit_${limit}`;
  if (cache.has(cacheKey)) return;

  axios.get(`${BASE_URL}/list`, {
    params: { page, limit },
    timeout: 10000,
  }).then((res) => {
    if (res.data && Array.isArray(res.data)) {
      cache.set(cacheKey, res.data);
    }
  }).catch(() => {
    // Ignore prefetch errors silently
  });
};

/**
 * Clear cache if refreshed
 */
export const clearPhotoCache = () => {
  cache.clear();
};
