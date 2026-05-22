import Image from "next/image";
import { Card } from "@heroui/react";

import { IoPeople } from "react-icons/io5";
import { LuMapPinHouse } from "react-icons/lu";
import { FaDollarSign } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";

import BookingCard from "@/components/detailsUi/BookingCard";
import { headers } from "next/headers";
import { auth } from "../../../../lib/auth";
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

  // ✅ DIRECT FETCH (no helper function)
  const roomRes = await fetch(
    `${process.env.NEXT_PUBLIC_API}/all-rooms/${roomId}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  const roomData = await roomRes.json();
  console.log("this is room", roomData);

  const room_id = roomId;

  // SAFE FETCH (booking count)
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT - IMAGE */}
        <div className="lg:col-span-1">
          <Card className="relative h-[420px] w-full overflow-hidden rounded-2xl shadow-xl border-0">
            <Image
              src={imageUrl}
              alt={roomName || "Room Image"}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover"
              priority
            />
          </Card>
        </div>

        {/* MIDDLE - DETAILS */}
        <div className="lg:col-span-1 flex flex-col gap-5">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{roomName}</h1>

            <p className="text-gray-600 mt-2 leading-relaxed">{description}</p>
          </div>

          {/* INFO CARDS */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border flex items-center gap-3">
              <IoPeople className="text-emerald-500" size={22} />
              <div>
                <p className="text-xs text-gray-500">Capacity</p>
                <p className="font-semibold text-sm">
                  {capacity || "1-4"} people
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border flex items-center gap-3">
              <LuMapPinHouse className="text-emerald-500" size={22} />
              <div>
                <p className="text-xs text-gray-500">Floor</p>
                <p className="font-semibold text-sm">{floor || "N/A"}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border flex items-center gap-3">
              <FaDollarSign className="text-emerald-500" size={22} />
              <div>
                <p className="text-xs text-gray-500">Hourly Rate</p>
                <p className="font-semibold text-sm">${hourlyRate || 0}/hr</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border flex items-center gap-3">
              <MdDateRange className="text-emerald-500" size={22} />
              <div>
                <p className="text-xs text-gray-500">Total Bookings</p>
                <p className="font-semibold text-sm">{count}</p>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <DetailsAction
            userEmail={userEmail}
            userData={userData}
            room_id={room_id}
            roomData={roomData}
          />
        </div>

        {/* RIGHT - BOOKING */}
        <div className="lg:col-span-1">
          <BookingCard roomData={roomData} userData={userData} count={count} />
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsPage;
