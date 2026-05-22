export const metadata = {
  title: "Room Details - Study Nook",
  description:
    "View detailed information about this study room and book it easily.",
};
import Image from "next/image";

import { headers } from "next/headers";

import { auth } from "../../../../lib/auth";

import { IoPeople } from "react-icons/io5";
import { LuMapPinHouse } from "react-icons/lu";
import { FaDollarSign } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";

import BookingCard from "@/components/detailsUi/BookingCard";
import DetailsAction from "@/components/ui/DetailsAction";

const fallbackImage =
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop";

const RoomDetailsPage = async ({ params }) => {
  const requestHeaders = await headers();

  const { token } = await auth.api.getToken({
    headers: requestHeaders,
  });

  const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  const userData = session?.user;

  const { roomId } = await params;

  // ROOM FETCH
  const roomRes = await fetch(
    `${process.env.NEXT_PUBLIC_API}/all-rooms/${roomId}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  const roomData = await roomRes.json();

  const room_id = roomId;

  // BOOKING COUNT FETCH
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/booking-count/${roomId}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  const data = await res.json();

  const count = data?.count || 0;

  const {
    roomName,
    image,
    description,
    hourlyRate,
    floor,
    capacity,
    userEmail,
  } = roomData || {};

  const imageUrl =
    image && typeof image === "string" && image.startsWith("http")
      ? image
      : fallbackImage;

  return (
    <div className="max-w-7xl mx-auto w-full px-4 py-10">
      {/* TOP SECTION */}
      <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_.9fr] gap-10 items-start">
        {/* LEFT SIDE */}
        <div>
          {/* IMAGE */}
          <div className="relative overflow-hidden rounded-[32px] border border-gray-200 bg-white">
            <div className="relative h-[260px] sm:h-[420px] lg:h-[560px] w-full">
              <Image
                src={imageUrl}
                alt={roomName || "Room Image"}
                fill
                priority
                sizes="(max-width:1024px) 100vw, 65vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col">
          {/* TOP */}
          <div className="flex items-center justify-between">
            {/* BADGE */}
            <div className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-700">
              Available
            </div>

            {/* ACTION */}
            <DetailsAction
              userEmail={userEmail}
              userData={userData}
              room_id={room_id}
              roomData={roomData}
            />
          </div>

          {/* TITLE */}
          <div className="mt-5">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
              {roomName}
            </h1>

            <p className="mt-3 text-lg font-medium text-gray-600">
              Premium Private Study Room
            </p>
          </div>

          {/* LOCATION */}
          <div className="mt-5 flex items-center gap-2 text-gray-500">
            <LuMapPinHouse size={18} />

            <span className="text-sm">
              {floor || "N/A"} • StudyNook Workspace
            </span>
          </div>

          {/* DESCRIPTION */}
          <p className="mt-6 text-[15px] leading-8 text-gray-600">
            {description}
          </p>

          {/* INFO CARDS */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* CAPACITY */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                  <IoPeople className="text-emerald-600" size={22} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Capacity</p>

                  <h3 className="text-lg font-bold text-gray-900">
                    {capacity || "1-4"} People
                  </h3>
                </div>
              </div>
            </div>

            {/* PRICE */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                  <FaDollarSign className="text-emerald-600" size={20} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Hourly Rate</p>

                  <h3 className="text-lg font-bold text-gray-900">
                    ${hourlyRate || 0}/hour
                  </h3>
                </div>
              </div>
            </div>

            {/* BOOKINGS */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                  <MdDateRange className="text-emerald-600" size={22} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Bookings</p>

                  <h3 className="text-lg font-bold text-gray-900">
                    {count} Times
                  </h3>
                </div>
              </div>
            </div>

            {/* FLOOR */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                  <LuMapPinHouse className="text-emerald-600" size={20} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Floor</p>

                  <h3 className="text-lg font-bold text-gray-900">
                    {floor || "N/A"}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* BOOKING SECTION */}
          <div className="mt-8 rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6">
            <div className="flex flex-col  sm:justify-between gap-6">
              {/* PRICE */}
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Starting From
                </p>

                <h2 className="mt-1 text-4xl font-bold text-emerald-600">
                  ${hourlyRate || 0}
                  <span className="ml-1 text-lg font-medium text-gray-500">
                    /hour
                  </span>
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Reserve your preferred study time easily.
                </p>
              </div>

              {/* BOOKING MODAL BUTTON */}
              <div className="w-full sm:w-auto">
                <BookingCard
                  roomData={roomData}
                  userData={userData}
                  count={count}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsPage;
