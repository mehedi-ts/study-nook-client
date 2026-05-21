const Loading = () => {
  return (
    <div className="max-w-7xl mx-auto w-full animate-pulse">
      <div className="main-page grid gap-4 grid-cols-4">
        {/* FILTER SIDEBAR */}
        <div className="filter col-span-1">
          <div className="w-full max-w-[320px] rounded-[12px] border border-[#EAEAEA] bg-white p-6 shadow-[0_4px_30px_rgba(0,0,0,0.04)] sticky top-24 h-fit">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="h-7 w-32 rounded bg-gray-200"></div>

              <div className="h-5 w-14 rounded bg-gray-200"></div>
            </div>

            {/* Search */}
            <div className="h-[54px] rounded-2xl bg-gray-200 mb-8"></div>

            {/* Price Range */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-5">
                <div className="h-5 w-28 rounded bg-gray-200"></div>

                <div className="h-4 w-24 rounded bg-gray-200"></div>
              </div>

              <div className="h-2 rounded-full bg-gray-200"></div>

              <div className="flex justify-between mt-4">
                <div className="h-4 w-10 rounded bg-gray-200"></div>
                <div className="h-4 w-10 rounded bg-gray-200"></div>
                <div className="h-4 w-10 rounded bg-gray-200"></div>
                <div className="h-4 w-10 rounded bg-gray-200"></div>
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <div className="h-5 w-24 rounded bg-gray-200 mb-5"></div>

              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded bg-gray-200"></div>

                    <div className="h-4 w-24 rounded bg-gray-200"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="mb-8">
              <div className="h-5 w-28 rounded bg-gray-200 mb-5"></div>

              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded-full bg-gray-200"></div>

                    <div className="h-4 w-28 rounded bg-gray-200"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="mb-8">
              <div className="h-5 w-20 rounded bg-gray-200 mb-5"></div>

              <div className="h-[54px] rounded-2xl bg-gray-200"></div>
            </div>

            {/* Button */}
            <div className="h-[56px] rounded-2xl bg-gray-200"></div>
          </div>
        </div>

        {/* ROOM SECTION */}
        <div className="rooms col-span-3">
          {/* TITLE */}
          <div className="h-10 w-[450px] rounded bg-gray-200"></div>

          {/* SUBTITLE */}
          <div className="h-5 w-40 rounded bg-gray-200 mt-6"></div>

          {/* ROOM CARDS */}
          <div className="room-cards grid gap-4 grid-cols-3 mt-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-gray-200 bg-white p-4"
              >
                {/* IMAGE */}
                <div className="h-44 w-full rounded-2xl bg-gray-200"></div>

                {/* TITLE */}
                <div className="mt-4 h-6 w-40 rounded bg-gray-200"></div>

                {/* DESCRIPTION */}
                <div className="mt-3 h-4 w-full rounded bg-gray-200"></div>

                <div className="mt-2 h-4 w-3/4 rounded bg-gray-200"></div>

                {/* INFO */}
                <div className="mt-5 flex justify-between">
                  <div className="h-5 w-20 rounded bg-gray-200"></div>

                  <div className="h-5 w-16 rounded bg-gray-200"></div>
                </div>

                {/* BUTTON */}
                <div className="mt-5 h-11 w-full rounded-xl bg-gray-200"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
