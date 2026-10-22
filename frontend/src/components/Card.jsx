import { useState, memo } from 'react';
import { Heart, Maximize2, Download } from 'lucide-react';
import { getThumbnailUrl, downloadImageFile } from '../utils/imageUtils';

const Card = ({ elem, isFav = false, onToggleFav, onSelect, onShowToast }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const thumbnailUrl = getThumbnailUrl(elem.id, 600, 420);

  const handleDownload = async (e) => {
    e.stopPropagation();
    setDownloading(true);
    onShowToast?.(`Downloading photo by ${elem.author}...`);
    try {
      await downloadImageFile(elem.download_url, `picsum-${elem.id}-${elem.author.replace(/\s+/g, '_')}.jpg`);
      onShowToast?.('Download complete!');
    } catch {
      onShowToast?.('Failed to download image.');
    } finally {
      setDownloading(false);
    }
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    onToggleFav?.(elem);
    onShowToast?.(isFav ? 'Removed from favorites' : 'Added to favorites');
  };

  return (
    <div 
      onClick={() => onSelect?.(elem)}
      className="group relative bg-gray-900/60 border border-gray-800/80 hover:border-amber-400/40 rounded-2xl overflow-hidden shadow-xl hover:shadow-amber-400/10 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
    >
      <div className="p-3">
        {/* Image Container with Shimmer placeholder */}
        <div className="h-48 w-full overflow-hidden bg-gray-800/70 rounded-xl relative">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
              <span className="text-xs text-gray-500 font-mono">Loading...</span>
            </div>
          )}

          <img
            src={thumbnailUrl}
            alt={`Photo by ${elem.author}`}
            loading="lazy"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            className={`h-full w-full object-cover group-hover:scale-105 transition-all duration-500 ease-out ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          />

          {/* Quick Overlay Action Buttons */}
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
            <button
              onClick={handleFavorite}
              title={isFav ? 'Remove from favorites' : 'Add to favorites'}
              aria-label="Toggle Favorite"
              className={`p-2 rounded-xl backdrop-blur-md transition-all duration-200 active:scale-90 shadow-md ${
                isFav
                  ? 'bg-rose-500 text-white shadow-rose-500/30'
                  : 'bg-black/50 text-white/80 hover:bg-black/80 hover:text-white'
              }`}
            >
              <Heart size={16} fill={isFav ? 'currentColor' : 'none'} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect?.(elem);
              }}
              title="Preview Photo"
              aria-label="Preview Photo"
              className="p-2 rounded-xl bg-black/50 text-white/80 hover:bg-black/80 hover:text-white backdrop-blur-md transition-all duration-200 active:scale-90 shadow-md hidden group-hover:flex"
            >
              <Maximize2 size={16} />
            </button>
          </div>

          {/* Bottom Overlay Badge with Dimensions */}
          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-mono text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {elem.width} × {elem.height}
          </div>
        </div>

        {/* Details Footer */}
        <div className="pt-3 px-1 flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-gray-200 text-sm truncate group-hover:text-amber-400 transition-colors">
              {elem.author}
            </h3>
            <p className="text-[11px] text-gray-400">
              ID: #{elem.id}
            </p>
          </div>

          {/* Action: Fast Download Icon */}
          <button
            onClick={handleDownload}
            disabled={downloading}
            title="Download Photo"
            aria-label="Download Photo"
            className="p-2 rounded-lg text-gray-400 hover:text-amber-400 hover:bg-gray-800/80 transition-all duration-200 active:scale-95 disabled:opacity-50"
          >
            <Download size={16} className={downloading ? 'animate-bounce' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(Card);
