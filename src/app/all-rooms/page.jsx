import React from "react";
import { getAllRooms } from "../../../lib/data";
import RoomCard from "@/components/ui/RoomCard";

const AllRoomsPage = async () => {
  const roomData = await getAllRooms();
  console.log(roomData);
  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="main-page grid gap-4 grid-cols-4">
        <div className="filter col-span-1 ">
          <div className="w-full max-w-[320px] rounded-[12px] border border-[#EAEAEA] bg-white p-6 shadow-[0_4px_30px_rgba(0,0,0,0.04)] sticky top-24 h-fit">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L14 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 018 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
                  />
                </svg>

                <h2 className="text-[22px] font-semibold text-[#111827]">
                  Filters
                </h2>
              </div>

              <button className="text-[#0FA958] text-sm font-medium hover:underline">
                Reset
              </button>
            </div>

            {/* Search */}
            <div className="relative mb-8">
              <input
                type="text"
                placeholder="Search study rooms..."
                className="w-full h-[54px] rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] pl-5 pr-12 text-[15px] outline-none focus:border-[#0FA958]"
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

            {/* Price Range */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[17px] font-semibold text-[#111827]">
                  Price Range
                </h3>

                <p className="text-sm text-gray-500">৳80 - ৳300 / hour</p>
              </div>

              <div className="relative h-[6px] bg-[#E5E7EB] rounded-full">
                <div className="absolute left-[20%] right-[25%] h-full bg-[#0FA958] rounded-full"></div>

                <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-[4px] border-[#0FA958]"></div>

                <div className="absolute right-[25%] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-[4px] border-[#0FA958]"></div>
              </div>

              <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
                <span>৳50</span>
                <span>৳150</span>
                <span>৳250</span>
                <span>৳350</span>
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[17px] font-semibold text-[#111827]">
                  Amenities
                </h3>

                <span className="text-gray-400">⌄</span>
              </div>

              <div className="space-y-4">
                {["WiFi", "AC", "Whiteboard"].map((item, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded border-gray-300 accent-[#0FA958]"
                    />

                    <span className="text-[15px] text-gray-700">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[17px] font-semibold text-[#111827]">
                  Availability
                </h3>

                <span className="text-gray-400">⌄</span>
              </div>

              <div className="space-y-4">
                {[
                  {
                    name: "Available Now",
                    color: "bg-green-500",
                  },
                  {
                    name: "Few Seats Left",
                    color: "bg-yellow-400",
                  },
                  {
                    name: "Fully Booked",
                    color: "bg-red-500",
                  },
                ].map((item, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="availability"
                      className="accent-[#0FA958]"
                    />

                    <div
                      className={`w-2.5 h-2.5 rounded-full ${item.color}`}
                    ></div>

                    <span className="text-[15px] text-gray-700">
                      {item.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            {/* Sort */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[17px] font-semibold text-[#111827]">
                  Sort By
                </h3>

                <span className="text-gray-400">⌄</span>
              </div>

              <select className="w-full h-[54px] rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] px-4 text-[15px] outline-none focus:border-[#0FA958]">
                <option>Popular</option>
                <option>Lowest Price</option>
                <option>Highest Rated</option>
                <option>Newest</option>
              </select>
            </div>

            {/* Reset Button */}
            <button className="w-full h-[56px] rounded-2xl border border-[#0FA958] text-[#0FA958] font-semibold transition-all hover:bg-[#0FA958] hover:text-white">
              Reset Filters
            </button>
          </div>
        </div>
        <div className="rooms col-span-3 border-2">
          <h1 className="text-4xl font-bold ">
            Find your ideal <span className="text-[#10b981]">stydy space</span>
          </h1>
          <p className="text-base mt-6">
            <span className="font-semibold text-[#10b981]">244</span> rooms
            available
          </p>
          <div className="room-cards grid gap-4 grid-cols-3 ">
            {roomData.map((room) => {
              return <RoomCard key={room._id} room={room}></RoomCard>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRoomsPage;
