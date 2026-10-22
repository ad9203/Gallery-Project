/**
 * Image and helper utility functions for PixelGallery
 */

// Generate an optimized WebP thumbnail URL from Picsum
export const getThumbnailUrl = (id, width = 600, height = 420) => {
  if (!id) return '';
  return `https://picsum.photos/id/${id}/${width}/${height}.webp`;
};

// Generate an optimized preview URL for lightbox modal
export const getPreviewUrl = (id, width = 1200, height = 800) => {
  if (!id) return '';
  return `https://picsum.photos/id/${id}/${width}/${height}.webp`;
};

// Return the original high-resolution photo URL
export const getFullResolutionUrl = (elem) => {
  return elem?.download_url || (elem?.id ? `https://picsum.photos/id/${elem.id}/2000/1400` : '');
};

// Download an image securely using Blob
export const downloadImageFile = async (url, filename = 'gallery-photo.jpg') => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const blob = await response.blob();
    const objectUrl = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(objectUrl);
    return true;
  } catch (error) {
    console.warn('Direct blob download failed, opening in new tab fallback', error);
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.download = filename;
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return false;
  }
};

// Copy link to clipboard
export const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (err) {
    console.error('Failed to copy: ', err);
    return false;
  }
};
