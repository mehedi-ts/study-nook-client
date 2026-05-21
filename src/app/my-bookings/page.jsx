import React from "react";
import { auth } from "../../../lib/auth";
import { headers } from "next/headers";
import { getMyBookingByUserId } from "../../../lib/data";
import MyBookingCard from "@/components/ui/MyBookingCard";

const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  const userData = session?.user;

  const bookingData = await getMyBookingByUserId(userData?.id);

  return (
    <div className="max-w-7xl py-10 mx-auto w-full">
      <div>
        <h1 className="text-4xl font-bold mb-7 ">My Bookings</h1>
      </div>
      <div className="flex flex-col gap-5">
        {bookingData.map((booking) => {
          return <MyBookingCard key={booking._id} />;
        })}
      </div>
    </div>
  );
};

export default MyBookingPage;
