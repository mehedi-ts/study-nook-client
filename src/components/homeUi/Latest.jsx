"use client";

import { useEffect, useState } from "react";
import RoomCard from "@/components/ui/RoomCard";

const AvailableStudyRooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API}/latest-rooms`)
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }, []);

  return (
    <section className="py-24 px-4 lg:px-0">
      <div className="max-w-7xl mx-auto">
        {/* LEFT HEADING SECTION */}
        <div className="mb-14 text-left max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight">
            Available Study Rooms
          </h2>
        </div>

        {/* NO DATA FOUND */}
        {rooms.length === 0 ? (
          <div className="border border-gray-200 rounded-2xl py-16 flex items-center justify-center bg-gray-50">
            <p className="text-gray-500 text-lg font-medium">
              No available study rooms found
            </p>
          </div>
        ) : (
          /* GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <div
                key={room._id}
                className="transition-transform duration-300 hover:-translate-y-2"
              >
                <RoomCard room={room} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AvailableStudyRooms;
