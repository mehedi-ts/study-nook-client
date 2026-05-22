import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiMapPinLine, RiGroupLine, RiArrowRightLine } from "react-icons/ri";

const fallbackImage =
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop";

const RoomCard = ({ room }) => {
  const {
    _id,
    roomName,
    image,
    floor,
    description,
    capacity,
    amenities = [],
    hourlyRate,
  } = room;

  // SAFE IMAGE URL
  const imageUrl =
    image && typeof image === "string" && image.startsWith("http")
      ? image
      : fallbackImage;

  return (
    <div className="w-full h-full flex flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative h-60 w-full shrink-0 overflow-hidden">
        <Image
          src={imageUrl}
          alt={roomName || "Room Image"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Top Content */}
        <div className="flex-1">
          {/* Room Name */}
          <h2 className="line-clamp-1 text-2xl font-bold text-gray-900">
            {roomName}
          </h2>

          {/* Description */}
          <p className="mt-3 text-sm leading-6 text-gray-500 line-clamp-3">
            {description}
          </p>

          {/* Info */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1.5">
              <RiMapPinLine className="text-lg text-emerald-600" />
              <span>{floor}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <RiGroupLine className="text-lg text-emerald-600" />
              <span>{capacity} People</span>
            </div>
          </div>

          {/* Amenities */}
          <div className="mt-5 flex flex-wrap gap-2">
            {amenities.slice(0, 3).map((item, index) => (
              <span
                key={index}
                className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700"
              >
                {item}
              </span>
            ))}

            {amenities.length > 3 && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                +{amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
          <h3 className="text-2xl font-bold text-emerald-600">
            ৳{hourlyRate}
            <span className="text-sm font-medium text-gray-500"> /hr</span>
          </h3>

          <Link href={`/all-rooms/${_id}`}>
            <button className="flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-emerald-700">
              View Details
              <RiArrowRightLine className="text-lg" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
