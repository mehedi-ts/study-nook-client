const BookingCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 animate-pulse">
      {/* top row */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-4 w-32 bg-gray-200 rounded" />
        <div className="h-4 w-16 bg-gray-200 rounded" />
      </div>

      {/* middle section */}
      <div className="flex gap-4">
        {/* image */}
        <div className="h-20 w-20 bg-gray-200 rounded-xl" />

        {/* text */}
        <div className="flex-1 space-y-3">
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
          <div className="h-3 w-1/2 bg-gray-200 rounded" />
          <div className="h-3 w-2/3 bg-gray-200 rounded" />
        </div>
      </div>

      {/* bottom row */}
      <div className="flex justify-between mt-5">
        <div className="h-4 w-20 bg-gray-200 rounded" />
        <div className="h-8 w-24 bg-gray-200 rounded-lg" />
      </div>
    </div>
  );
};
const loading = () => {
  return (
    <div className="max-w-7xl mx-auto w-full py-10 px-4">
      {/* Header skeleton */}
      <div className="mb-7">
        <div className="h-10 w-60 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Cards skeleton */}
      <div className="flex flex-col gap-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <BookingCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default loading;
