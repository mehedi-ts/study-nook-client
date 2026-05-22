"use client";

import { useEffect, useState } from "react";
import RoomCard from "@/components/ui/RoomCard";

const amenitiesList = ["WiFi", "AC", "Whiteboard", "Projector"];

const AllRoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [selectedAmenities, setSelectedAmenities] = useState([]);

  // SEARCH DEBOUNCE
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // FETCH ROOMS
  useEffect(() => {
    const controller = new AbortController();

    const getRooms = async () => {
      try {
        // FIRST PAGE LOAD
        if (rooms.length === 0) {
          setLoading(true);
        } else {
          // FILTERING STATE
          setIsFiltering(true);
        }

        setError("");

        const params = new URLSearchParams();

        // SEARCH
        if (debouncedSearch.trim()) {
          params.append("search", debouncedSearch.trim());
        }

        // AMENITIES
        if (selectedAmenities.length > 0) {
          params.append("amenities", selectedAmenities.join(","));
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API}/all-rooms?${params.toString()}`,
          {
            cache: "no-store",
            signal: controller.signal,
          },
        );

        if (!res.ok) {
          throw new Error("Failed to fetch rooms");
        }

        const data = await res.json();

        setRooms(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log(error);
          setError("Something went wrong!");
        }
      } finally {
        setLoading(false);
        setIsFiltering(false);
      }
    };

    getRooms();

    return () => controller.abort();
  }, [debouncedSearch, selectedAmenities]);

  // TOGGLE AMENITY
  const handleAmenityChange = (item) => {
    setSelectedAmenities((prev) =>
      prev.includes(item)
        ? prev.filter((amenity) => amenity !== item)
        : [...prev, item],
    );
  };

  // RESET
  const handleReset = () => {
    setSearch("");
    setDebouncedSearch("");
    setSelectedAmenities([]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* SIDEBAR */}
        <div className="lg:col-span-3">
          <div className="sticky top-24 rounded-[28px] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)] min-h-[700px]">
            {/* HEADER */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Filters</h2>

                <p className="text-sm text-gray-500 mt-1">
                  Search your perfect room
                </p>
              </div>

              <button
                onClick={handleReset}
                className="text-sm font-semibold text-[#10b981] hover:underline"
              >
                Reset
              </button>
            </div>

            {/* SEARCH */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Search by room name
              </label>

              <input
                type="text"
                placeholder="Search rooms..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl bg-[#f8fafc] px-5 py-4 text-[15px] outline-none transition-all focus:ring-2 focus:ring-[#10b981]"
              />
            </div>

            {/* AMENITIES */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Amenities
              </label>

              <div className="space-y-3">
                {amenitiesList.map((item, index) => (
                  <label
                    key={index}
                    className={`flex items-center justify-between rounded-2xl px-4 py-4 cursor-pointer transition-all ${
                      selectedAmenities.includes(item)
                        ? "bg-[#10b981]/10"
                        : "bg-[#f8fafc] hover:bg-[#f1f5f9]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedAmenities.includes(item)}
                        onChange={() => handleAmenityChange(item)}
                        className="w-5 h-5 accent-[#10b981]"
                      />

                      <span className="font-medium text-gray-700">{item}</span>
                    </div>

                    {selectedAmenities.includes(item) && (
                      <div className="w-2 h-2 rounded-full bg-[#10b981]"></div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* ACTIVE FILTERS */}
            {selectedAmenities.length > 0 && (
              <div className="mt-8">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  Active Filters
                </h4>

                <div className="flex flex-wrap gap-2">
                  {selectedAmenities.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleAmenityChange(item)}
                      className="rounded-full bg-[#10b981] px-4 py-2 text-sm font-medium text-white"
                    >
                      {item} ✕
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ROOMS */}
        <div className="lg:col-span-9">
          <div className="relative min-h-[1200px]">
            {/* FILTER LOADING OVERLAY */}
            {isFiltering && (
              <div className="absolute inset-0 z-20 rounded-3xl bg-white/60 backdrop-blur-[1px] flex items-center justify-center">
                <div className="h-10 w-10 rounded-full border-4 border-[#10b981] border-t-transparent animate-spin"></div>
              </div>
            )}

            {/* TOP */}
            <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Find your ideal
                  <span className="text-[#10b981]"> study space</span>
                </h1>

                <p className="text-gray-500 mt-3 text-base">
                  Comfortable, modern and peaceful study rooms
                </p>
              </div>

              <div className="rounded-3xl bg-[#10b981] px-7 py-5 text-white shadow-xl w-fit">
                <p className="text-sm opacity-90">Available Rooms</p>

                <h3 className="text-4xl font-bold mt-1">
                  {loading ? "--" : rooms.length}
                </h3>
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-600">
                {error}
              </div>
            )}

            {/* CONTENT */}
            {!loading && (
              <div className="min-h-[1000px] transition-all duration-300">
                {rooms.length > 0 ? (
                  <div
                    className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 transition-opacity duration-300 ${
                      isFiltering ? "opacity-70" : "opacity-100"
                    }`}
                  >
                    {rooms.map((room) => (
                      <RoomCard key={room._id} room={room} />
                    ))}
                  </div>
                ) : (
                  <div className="min-h-[700px] flex items-center justify-center">
                    <div className="text-center">
                      <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#10b981]/10">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10 text-[#10b981]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M8 9l3 3-3 3m5 0h3"
                          />
                        </svg>
                      </div>

                      <h2 className="text-3xl font-bold text-gray-800">
                        No Rooms Found
                      </h2>

                      <p className="mt-3 text-gray-500 max-w-md">
                        We couldn’t find any rooms matching your current search
                        or filters.
                      </p>

                      <button
                        onClick={handleReset}
                        className="mt-6 rounded-2xl bg-[#10b981] px-6 py-3 font-semibold text-white hover:opacity-90"
                      >
                        Clear Filters
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRoomsPage;
