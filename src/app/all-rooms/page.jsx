"use client";

import { useEffect, useState } from "react";
import RoomCard from "@/components/ui/RoomCard";

const amenitiesList = ["WiFi", "AC", "Whiteboard", "Projector"];

const AllRoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedAmenities, setSelectedAmenities] = useState([]);

  // FETCH ROOMS
  useEffect(() => {
    const getRooms = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams();

        // SEARCH
        if (search.trim()) {
          params.append("search", search.trim());
        }

        // AMENITIES
        if (selectedAmenities.length > 0) {
          params.append("amenities", selectedAmenities.join(","));
        }

        const res = await fetch(
          `http://localhost:8000/all-rooms?${params.toString()}`,
          {
            cache: "no-store",
          },
        );

        const data = await res.json();

        setRooms(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getRooms();
  }, [search, selectedAmenities]);

  // TOGGLE AMENITY
  const handleAmenityChange = (item) => {
    if (selectedAmenities.includes(item)) {
      setSelectedAmenities(
        selectedAmenities.filter((amenity) => amenity !== item),
      );
    } else {
      setSelectedAmenities([...selectedAmenities, item]);
    }
  };

  // RESET
  const handleReset = () => {
    setSearch("");
    setSelectedAmenities([]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* SIDEBAR */}
        <div className="lg:col-span-3">
          <div className="sticky top-24 rounded-[28px] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)] min-h-[650px]">
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

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search rooms..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-2xl bg-[#f8fafc] px-5 py-4 pr-12 text-[15px] outline-none transition-all focus:ring-2 focus:ring-[#10b981]"
                />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
                  />
                </svg>
              </div>
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
        <div className="lg:col-span-9 min-h-[700px]">
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

              <h3 className="text-4xl font-bold mt-1">{rooms.length}</h3>
            </div>
          </div>

          {/* LOADING */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-3xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] animate-pulse"
                >
                  <div className="h-56 bg-gray-200"></div>

                  <div className="p-5 space-y-4">
                    <div className="h-5 rounded bg-gray-200 w-3/4"></div>

                    <div className="h-4 rounded bg-gray-200 w-full"></div>

                    <div className="h-4 rounded bg-gray-200 w-2/3"></div>

                    <div className="flex gap-2 pt-3">
                      <div className="h-8 w-20 rounded-full bg-gray-200"></div>

                      <div className="h-8 w-20 rounded-full bg-gray-200"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : rooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {rooms.map((room) => (
                <RoomCard key={room._id} room={room} />
              ))}
            </div>
          ) : (
            // EMPTY STATE
            <div className="min-h-[500px] flex items-center justify-center">
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
                  We couldn’t find any rooms matching your current search or
                  filters.
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
      </div>
    </div>
  );
};

export default AllRoomsPage;
