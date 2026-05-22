import Image from "next/image";
import { getRoomById } from "../../../../lib/data";
import { Card } from "@heroui/react";

import { IoPeople } from "react-icons/io5";
import { LuMapPinHouse } from "react-icons/lu";
import { FaDollarSign } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";

import BookingCard from "@/components/detailsUi/BookingCard";
import { headers } from "next/headers";
import { auth } from "../../../../lib/auth";
import DetailsAction from "@/components/ui/DetailsAction";

const RoomDetailsPage = async ({ params }) => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  console.log("token", token);
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userData = session?.user;

  const { roomId } = await params;

  const roomData = await getRoomById(roomId);
  const room_id = roomId;

  const res = await fetch(`${process.env.NEXT_API}/booking-count/${roomId}`, {
    headers: { authorization: `bearer${token}` },
  });
  const data = await res.json();

  const count = data?.count;
  const {
    roomName,
    image,
    description,
    hourlyRate,
    floor,
    capacity,
    userEmail,
  } = roomData;

  // 👉 static total booking (later API theke asbe)
  const totalBookings = 12;

  return (
    <div className="max-w-7xl mx-auto w-full px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT - IMAGE */}
        <div className="lg:col-span-1">
          <Card className="relative h-[420px] w-full overflow-hidden rounded-2xl shadow-xl border-0">
            <Image src={image} alt={roomName} fill className="object-cover" />
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
