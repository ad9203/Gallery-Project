import { Search, Heart, RefreshCw, Sparkles, Image as ImageIcon } from 'lucide-react';

const Header = ({
  searchQuery,
  onSearchChange,
  activeTab,
  onTabChange,
  favoritesCount,
  onRefresh,
  isRefreshing,
  limit,
  onLimitChange,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-800/80 bg-gray-950/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center justify-between">
            <div 
              onClick={() => onTabChange('all')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-black font-extrabold text-lg shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <Sparkles size={20} className="fill-black stroke-black" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  PixelGallery
                </span>
                <span className="text-[10px] font-mono text-gray-500 ml-2 hidden sm:inline px-1.5 py-0.5 rounded bg-gray-800 border border-gray-700">
                  v2.0 Turbo
                </span>
              </div>
            </div>

            {/* Mobile Favorites Button */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => onTabChange(activeTab === 'favorites' ? 'all' : 'favorites')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                  activeTab === 'favorites'
                    ? 'bg-rose-500/20 border-rose-500/50 text-rose-300'
                    : 'bg-gray-900 border-gray-800 text-gray-300'
                }`}
              >
                <Heart size={14} fill={activeTab === 'favorites' ? 'currentColor' : 'none'} />
                <span>{favoritesCount}</span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search photographer name..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-900/90 border border-gray-800 rounded-xl text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-amber-400/70 focus:ring-1 focus:ring-amber-400/50 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Right Controls: Tabs, Limit & Refresh */}
          <div className="hidden md:flex items-center gap-3">
            {/* View Tabs */}
            <div className="flex items-center bg-gray-900/90 p-1 rounded-xl border border-gray-800">
              <button
                onClick={() => onTabChange('all')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'all'
                    ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <ImageIcon size={14} />
                <span>Explore</span>
              </button>

              <button
                onClick={() => onTabChange('favorites')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'favorites'
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Heart size={14} fill={activeTab === 'favorites' ? 'currentColor' : 'none'} />
                <span>Favorites</span>
                {favoritesCount > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    activeTab === 'favorites' ? 'bg-black/30 text-white' : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    {favoritesCount}
                  </span>
                )}
              </button>
            </div>

            {/* Per-Page Selector (Active only in Explore mode) */}
            {activeTab === 'all' && (
              <select
                value={limit}
                onChange={(e) => onLimitChange(Number(e.target.value))}
                className="bg-gray-900/90 text-xs text-gray-300 border border-gray-800 rounded-xl px-2.5 py-2 focus:outline-none focus:border-amber-400 cursor-pointer"
                title="Items per page"
              >
                <option value={15}>15 per page</option>
                <option value={20}>20 per page</option>
                <option value={30}>30 per page</option>
                <option value={40}>40 per page</option>
              </select>
            )}

            {/* Refresh Button */}
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              title="Refresh and clear cache"
              aria-label="Refresh"
              className="p-2 rounded-xl bg-gray-900/90 border border-gray-800 text-gray-400 hover:text-amber-400 hover:border-gray-700 transition-all active:scale-90 disabled:opacity-50"
            >
              <RefreshCw size={15} className={isRefreshing ? 'animate-spin text-amber-400' : ''} />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
