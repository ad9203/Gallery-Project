import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, Download, Copy, ExternalLink, Check } from 'lucide-react';
import { getPreviewUrl, downloadImageFile, copyToClipboard } from '../utils/imageUtils';

const ImageModal = ({
  photo,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  isFav,
  onToggleFav,
  onShowToast,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  if (!photo) return null;

  const previewUrl = getPreviewUrl(photo.id, 1200, 800);

  const handleCopyLink = async () => {
    const success = await copyToClipboard(photo.download_url);
    if (success) {
      setCopied(true);
      onShowToast?.('Image link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    onShowToast?.(`Downloading high-res photo by ${photo.author}...`);
    try {
      await downloadImageFile(photo.download_url, `picsum-${photo.id}-${photo.author.replace(/\s+/g, '_')}.jpg`);
      onShowToast?.('Download complete!');
    } catch {
      onShowToast?.('Failed to download image.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      {/* Container */}
      <div
        className="relative max-w-5xl w-full max-h-[92vh] bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800/80 bg-gray-950/40">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 font-bold text-sm">
              {photo.author ? photo.author.charAt(0) : 'P'}
            </div>
            <div>
              <h2 className="text-base font-semibold text-white truncate max-w-xs md:max-w-md">
                {photo.author}
              </h2>
              <p className="text-xs text-gray-400">
                Resolution: {photo.width} × {photo.height} px
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFav?.(photo)}
              title={isFav ? 'Remove from favorites' : 'Add to favorites'}
              aria-label="Toggle Favorite"
              className={`p-2.5 rounded-xl border transition-all active:scale-90 ${
                isFav
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                  : 'bg-gray-800/60 text-gray-300 border-gray-700/60 hover:text-white hover:bg-gray-700/60'
              }`}
            >
              <Heart size={18} fill={isFav ? 'currentColor' : 'none'} />
            </button>

            <button
              onClick={onClose}
              title="Close (Esc)"
              aria-label="Close modal"
              className="p-2.5 rounded-xl bg-gray-800/60 border border-gray-700/60 text-gray-300 hover:text-white hover:bg-gray-700/60 transition-all active:scale-90"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Main Image Area with Navigation Buttons */}
        <div className="relative flex-1 min-h-[350px] max-h-[65vh] bg-black flex items-center justify-center overflow-hidden p-2">
          {!imageLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gray-950">
              <div className="w-10 h-10 border-3 border-amber-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-gray-400 font-mono">Loading full resolution...</p>
            </div>
          )}

          <img
            src={previewUrl}
            alt={photo.author}
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            className={`max-h-[62vh] max-w-full object-contain rounded-lg transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Navigation Arrows */}
          {hasPrev && (
            <button
              onClick={onPrev}
              title="Previous photo (Left Arrow)"
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/85 text-white/80 hover:text-white backdrop-blur-md border border-white/10 transition-all hover:scale-110 active:scale-95 shadow-xl"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {hasNext && (
            <button
              onClick={onNext}
              title="Next photo (Right Arrow)"
              aria-label="Next photo"
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/85 text-white/80 hover:text-white backdrop-blur-md border border-white/10 transition-all hover:scale-110 active:scale-95 shadow-xl"
            >
              <ChevronRight size={22} />
            </button>
          )}
        </div>

        {/* Modal Footer Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-t border-gray-800/80 bg-gray-950/60">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="font-mono bg-gray-800/80 px-2.5 py-1 rounded-md border border-gray-700/50">
              ID #{photo.id}
            </span>
            {photo.url && (
              <a
                href={photo.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-gray-300 hover:text-amber-400 transition-colors ml-2"
              >
                <span>View on Unsplash</span>
                <ExternalLink size={12} />
              </a>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              title="Copy original link"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-medium border border-gray-700/60 transition-all active:scale-95"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>

            <button
              onClick={handleDownload}
              disabled={downloading}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-semibold shadow-lg shadow-amber-400/10 transition-all active:scale-95 disabled:opacity-50"
            >
              <Download size={14} className={downloading ? 'animate-bounce' : ''} />
              <span>{downloading ? 'Downloading...' : 'Download Image'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
