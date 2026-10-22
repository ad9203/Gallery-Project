const SkeletonCard = () => {
  return (
    <div className="bg-gray-900/60 border border-gray-800/80 rounded-2xl overflow-hidden p-3 flex flex-col gap-3 animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 w-full bg-gray-800/80 rounded-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
      </div>

      {/* Content Skeleton */}
      <div className="px-1 space-y-2">
        <div className="h-4 bg-gray-800 rounded-md w-3/4" />
        <div className="flex items-center justify-between pt-1">
          <div className="h-3 bg-gray-800/70 rounded-md w-1/3" />
          <div className="h-3 bg-gray-800/70 rounded-md w-1/4" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
