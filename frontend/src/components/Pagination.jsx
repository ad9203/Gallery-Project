import { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft } from 'lucide-react';

const Pagination = ({ page, onPageChange, isLoading }) => {
  const [jumpPage, setJumpPage] = useState('');

  const handleJumpSubmit = (e) => {
    e.preventDefault();
    const target = parseInt(jumpPage, 10);
    if (!isNaN(target) && target >= 1) {
      onPageChange(target);
      setJumpPage('');
    }
  };

  return (
    <footer className="w-full py-4 px-4 sm:px-6 border-t border-gray-800/80 bg-gray-950/80 backdrop-blur-xl sticky bottom-0 z-30">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        
        {/* Navigation Buttons */}
        <div className="flex items-center gap-2">
          {/* First Page */}
          <button
            onClick={() => onPageChange(1)}
            disabled={page === 1 || isLoading}
            title="Go to first page"
            aria-label="First page"
            className="p-2.5 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            <ChevronsLeft size={16} />
          </button>

          {/* Previous Page */}
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1 || isLoading}
            className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold transition-all active:scale-95"
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Current Page Pill */}
          <div className="px-4 py-2 bg-amber-400/10 border border-amber-400/30 text-amber-400 rounded-xl text-xs font-bold font-mono">
            Page {page}
          </div>

          {/* Next Page */}
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={isLoading}
            className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-semibold shadow-lg shadow-amber-400/15 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Quick Page Jump */}
        <form onSubmit={handleJumpSubmit} className="flex items-center gap-2">
          <label htmlFor="jump-page" className="text-xs text-gray-400 hidden sm:inline">
            Jump to page:
          </label>
          <div className="flex items-center gap-1.5">
            <input
              id="jump-page"
              type="number"
              min="1"
              placeholder="e.g. 5"
              value={jumpPage}
              onChange={(e) => setJumpPage(e.target.value)}
              className="w-16 px-2.5 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-xs text-center text-white focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              disabled={!jumpPage || isLoading}
              className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-medium rounded-lg border border-gray-700/60 disabled:opacity-40 transition-all"
            >
              Go
            </button>
          </div>
        </form>

      </div>
    </footer>
  );
};

export default Pagination;
