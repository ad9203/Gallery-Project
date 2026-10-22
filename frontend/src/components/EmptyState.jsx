import { Heart, SearchX, AlertCircle, ArrowLeft } from 'lucide-react';

const EmptyState = ({ type = 'search', query = '', onAction }) => {
  if (type === 'favorites') {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="h-16 w-16 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-4 shadow-lg shadow-rose-500/10">
          <Heart size={30} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No Favorites Yet</h3>
        <p className="text-sm text-gray-400 max-w-sm mb-6">
          Click the heart icon on any photo to save your favorite inspirations here.
        </p>
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-semibold shadow-lg shadow-amber-400/15 transition-all active:scale-95"
        >
          <ArrowLeft size={16} />
          <span>Explore Photos</span>
        </button>
      </div>
    );
  }

  if (type === 'error') {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="h-16 w-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-4">
          <AlertCircle size={30} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Unable to Load Images</h3>
        <p className="text-sm text-gray-400 max-w-sm mb-6">
          Could not connect to the Picsum gallery service. Please check your internet connection.
        </p>
        <button
          onClick={onAction}
          className="px-5 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-xs font-semibold border border-gray-700 transition-all active:scale-95"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="h-16 w-16 rounded-full bg-gray-800/60 border border-gray-700/60 flex items-center justify-center text-gray-400 mb-4">
        <SearchX size={30} />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">No Matching Photos</h3>
      <p className="text-sm text-gray-400 max-w-sm mb-6">
        No photographers found matching &ldquo;<span className="text-amber-400">{query}</span>&rdquo;.
      </p>
      {onAction && (
        <button
          onClick={onAction}
          className="px-5 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-xs font-semibold border border-gray-700 transition-all active:scale-95"
        >
          Clear Filter
        </button>
      )}
    </div>
  );
};

export default EmptyState;
