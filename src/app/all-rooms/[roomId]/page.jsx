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

const RoomDetailsPage = async ({ params }) => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  const userData = session?.user;

  const { roomId } = await params;

  const roomData = await getRoomById(roomId);

  const {
    roomName,
    image,
    description,
    hourlyRate,
    floor,
    capacity,
    userEmail,
  } = roomData;
  return (
    <div className="max-w-7xl mx-auto w-full py-10">
      <div className="grid grid-cols-3 gap-5 ">
        <div className="img">
          <Card className="relative h-114 w-full p-6 overflow-hidden shadow-2xl border-0 border-gray-300">
            <Image
              src={image}
              alt={roomName}
              fill
              className=" object-cover"
            ></Image>
          </Card>
        </div>
        <div className="details flex flex-col gap-5">
          <h1 className="text-4xl font-semibold">{roomName}</h1>
          <p>{description} </p>
          <div className="bg-white rounded-lg  flex items-center justify-between gap-3 p-4 shadow-sm">
            <div className="flex  gap-1.5 ">
              <div className=" text-[#10b981]">
                <div className="  ">
                  <IoPeople size={20} />
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-gray-500">Capacity</p>
                <p className="text-base font-semibold">1-4 people</p>
              </div>
            </div>
            <div className="flex  gap-1.5 ">
              <div className=" text-[#10b981]">
                <div className=" ">
                  <LuMapPinHouse />
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-gray-500">Capacity</p>
                <p className="text-base font-semibold">1-4 people</p>
              </div>
            </div>
            <div></div>
          </div>
          <div className="bg-white rounded-lg  flex items-center justify-between gap-3 p-4 shadow-sm">
            <div className="flex items-center  gap-1.5 ">
              <div className=" text-[#10b981]">
                <div className="  ">
                  <FaDollarSign size={30} />
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-gray-500">Capacity</p>
                <p className="text-base font-semibold">1-4 people</p>
              </div>
            </div>
            <div></div>
          </div>
          <div className="bg-white rounded-lg flex items-center justify-between gap-3 p-4 shadow-sm">
            <div className="flex items-center  gap-1.5 ">
              <div className=" text-[#10b981]">
                <div className="  ">
                  <MdDateRange size={30} />
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-gray-500">Capacity</p>
                <p className="text-base font-semibold">1-4 people</p>
              </div>
            </div>
            <div></div>
          </div>
        </div>
        <BookingCard roomData={roomData} userData={userData}></BookingCard>
      </div>
    </div>
  );
};

export default RoomDetailsPage;
