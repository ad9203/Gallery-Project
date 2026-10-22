import { useState, useMemo } from 'react';
import Header from './components/Header';
import Card from './components/Card';
import SkeletonCard from './components/SkeletonCard';
import ImageModal from './components/ImageModal';
import Pagination from './components/Pagination';
import EmptyState from './components/EmptyState';
import Toast from './components/Toast';
import { useGallery } from './hooks/useGallery';
import { useFavorites } from './hooks/useFavorites';

const App = () => {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'favorites'
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const {
    page,
    limit,
    filteredPhotos,
    searchQuery,
    isLoading,
    error,
    setSearchQuery,
    handlePageChange,
    handleLimitChange,
    handleRefresh,
  } = useGallery(20);

  const {
    favorites,
    isFavorite,
    toggleFavorite,
    favoritesCount,
  } = useFavorites();

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? '' : current));
    }, 3000);
  };

  // Determine current active list of photos
  const activePhotos = useMemo(() => {
    if (activeTab === 'favorites') {
      if (!searchQuery.trim()) return favorites;
      const query = searchQuery.toLowerCase().trim();
      return favorites.filter((p) => p.author?.toLowerCase().includes(query));
    }
    return filteredPhotos;
  }, [activeTab, favorites, filteredPhotos, searchQuery]);

  // Modal navigation indices
  const currentPhotoIndex = useMemo(() => {
    if (!selectedPhoto) return -1;
    return activePhotos.findIndex((item) => String(item.id) === String(selectedPhoto.id));
  }, [selectedPhoto, activePhotos]);

  const handlePrevPhoto = () => {
    if (currentPhotoIndex > 0) {
      setSelectedPhoto(activePhotos[currentPhotoIndex - 1]);
    }
  };

  const handleNextPhoto = () => {
    if (currentPhotoIndex < activePhotos.length - 1) {
      setSelectedPhoto(activePhotos[currentPhotoIndex + 1]);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-950 via-gray-900 to-black text-gray-100 flex flex-col justify-between selection:bg-amber-400 selection:text-black">
      
      {/* Top Navbar Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        favoritesCount={favoritesCount}
        onRefresh={handleRefresh}
        isRefreshing={isLoading}
        limit={limit}
        onLimitChange={handleLimitChange}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Section title & Stats */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white capitalize">
              {activeTab === 'favorites' ? 'Saved Collections' : 'Curated Gallery'}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {activeTab === 'favorites'
                ? `${favorites.length} saved photos in local storage`
                : `Showing ${filteredPhotos.length} high-resolution photographs`}
            </p>
          </div>

          {searchQuery && (
            <div className="text-xs bg-amber-400/10 text-amber-300 border border-amber-400/20 px-3 py-1 rounded-full">
              Filtered by: &ldquo;{searchQuery}&rdquo;
            </div>
          )}
        </div>

        {/* Gallery Grid or State Views */}
        {error ? (
          <EmptyState type="error" onAction={handleRefresh} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {isLoading && activeTab === 'all'
              ? Array.from({ length: limit }).map((_, idx) => (
                  <SkeletonCard key={`skeleton-${idx}`} />
                ))
              : activePhotos.length > 0
              ? activePhotos.map((photo, idx) => (
                  <Card
                    key={photo.id || idx}
                    elem={photo}
                    isFav={isFavorite(photo.id)}
                    onToggleFav={toggleFavorite}
                    onSelect={setSelectedPhoto}
                    onShowToast={showToast}
                  />
                ))
              : (
                <EmptyState
                  type={activeTab === 'favorites' && !searchQuery ? 'favorites' : 'search'}
                  query={searchQuery}
                  onAction={() => {
                    if (searchQuery) setSearchQuery('');
                    else setActiveTab('all');
                  }}
                />
              )}
          </div>
        )}
      </main>

      {/* Pagination (Only active in Explore/All tab) */}
      {activeTab === 'all' && (
        <Pagination
          page={page}
          onPageChange={handlePageChange}
          isLoading={isLoading}
        />
      )}

      {/* Lightbox / Modal */}
      {selectedPhoto && (
        <ImageModal
          key={selectedPhoto.id}
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          onPrev={handlePrevPhoto}
          onNext={handleNextPhoto}
          hasPrev={currentPhotoIndex > 0}
          hasNext={currentPhotoIndex < activePhotos.length - 1}
          isFav={isFavorite(selectedPhoto.id)}
          onToggleFav={toggleFavorite}
          onShowToast={showToast}
        />
      )}

      {/* Action Toast Notifications */}
      <Toast message={toastMessage} onClose={() => setToastMessage('')} />
    </div>
  );
};

export default App;
