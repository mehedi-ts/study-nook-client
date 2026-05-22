"use client";

import { useEffect, useState } from "react";
import RoomCard from "@/components/ui/RoomCard";

const amenitiesList = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

const AllRoomsClient = () => {
  const [rooms, setRooms] = useState([]);
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
        setError("");
        setIsFiltering(true);

        const params = new URLSearchParams();

        if (debouncedSearch.trim()) {
          params.append("search", debouncedSearch.trim());
        }

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

            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Search by room name
              </label>

              <input
                type="text"
                placeholder="Search rooms..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl bg-[#f8fafc] px-5 py-4 text-[15px] outline-none focus:ring-2 focus:ring-[#10b981]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Amenities
              </label>

              <div className="space-y-3">
                {amenitiesList.map((item, index) => (
                  <label
                    key={index}
                    className={`flex items-center justify-between rounded-2xl px-4 py-4 cursor-pointer ${
                      selectedAmenities.includes(item)
                        ? "bg-[#10b981]/10"
                        : "bg-[#f8fafc]"
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
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ROOMS */}
        <div className="lg:col-span-9">
          <div className="relative min-h-[1200px]">
            {/* FILTER LOADING OVERLAY */}
            {isFiltering && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/60 backdrop-blur-sm">
                <div className="h-10 w-10 border-4 border-[#10b981] border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl font-bold">
                  Find your ideal{" "}
                  <span className="text-[#10b981]">study space</span>
                </h1>
                <p className="text-gray-500 mt-2">Comfortable, modern rooms</p>
              </div>

              <div className="bg-[#10b981] text-white px-6 py-4 rounded-2xl mt-4 md:mt-0">
                <p className="text-sm">Available Rooms</p>
                <h3 className="text-3xl font-bold">{rooms.length}</h3>
              </div>
            </div>

            {error && (
              <div className="mb-6 bg-red-50 text-red-600 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {isFiltering && rooms.length === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-[280px] rounded-2xl bg-gray-100 animate-pulse"
                  />
                ))}
              </div>
            )}

            {!isFiltering && rooms.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {rooms.map((room) => (
                  <RoomCard key={room._id} room={room} />
                ))}
              </div>
            )}

            {!isFiltering && rooms.length === 0 && (
              <div className="flex items-center justify-center min-h-[600px] text-gray-500">
                No Rooms Found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRoomsClient;
