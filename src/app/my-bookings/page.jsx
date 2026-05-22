export const metadata = {
  title: "My Bookings | Study Nook",
  description: "View your booked study rooms",
};
import { auth } from "../../../lib/auth";
import { headers } from "next/headers";
import { getMyBookingByUserId } from "../../../lib/data";
import MyBookingCard from "@/components/ui/MyBookingCard";

const MyBookingPage = async () => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userData = session?.user;

  const bookingRes = await fetch(
    `${process.env.NEXT_PUBLIC_API}/bookings/user/${userData?.id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  const bookingData = await bookingRes.json();

  const hasBookings = bookingData && bookingData.length > 0;

  return (
    <div className="max-w-7xl mx-auto w-full py-10 px-4">
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-4xl font-bold">My Bookings</h1>
      </div>

      {/* Content */}
      {hasBookings ? (
        <div className="flex flex-col gap-5">
          {bookingData.map((booking) => (
            <MyBookingCard key={booking._id} data={booking} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[300px]">
          <div className=" rounded-2xl p-8 text-center shadow-sm bg-white w-full max-w-md">
            <h2 className="text-xl font-semibold mb-2">No Bookings Found</h2>
            <p className="text-gray-500 text-sm">
              You haven’t booked anything yet. When you book a room, it will
              appear here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookingPage;
