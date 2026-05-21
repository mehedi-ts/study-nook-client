import { headers } from "next/headers";
import Image from "next/image";

import { auth } from "../../../lib/auth";
import { getMyRoomsByUserId } from "../../../lib/data";

const MyRoomsPage = async () => {
  // GET SESSION
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  // NOT LOGGED IN
  if (!user) {
    return (
      <div className="mt-20 text-center text-gray-500">
        Please login to see your rooms
      </div>
    );
  }

  // FETCH MY ROOMS
  const result = await getMyRoomsByUserId(user.id);

  const rooms = result || [];

  const hasRooms = rooms.length > 0;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">My Rooms</h1>

        <p className="mt-2 text-gray-500">All rooms created by you</p>
      </div>

      {/* ROOM LIST */}
      {hasRooms ? (
        <div className="flex flex-col gap-5">
          {rooms.map((room) => (
            <div
              key={room._id}
              className="flex flex-col gap-5 rounded-3xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md md:flex-row"
            >
              {/* IMAGE */}
              <div className="relative h-44 w-full overflow-hidden rounded-2xl md:h-36 md:w-60 flex-shrink-0">
                <Image
                  src={room.image}
                  alt={room.roomName}
                  fill
                  className="object-cover"
                />
              </div>

              {/* ROOM INFO */}
              <div className="flex-1 space-y-3">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {room.roomName}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {room.description}
                  </p>
                </div>

                {/* DETAILS */}
                <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                  <p>
                    <span className="font-semibold">Floor:</span> {room.floor}
                  </p>

                  <p>
                    <span className="font-semibold">Capacity:</span>{" "}
                    {room.capacity}
                  </p>

                  <p>
                    <span className="font-semibold">Hourly Rate:</span> $
                    {room.hourlyRate}/hr
                  </p>
                </div>

                {/* OWNER */}
                <p className="text-xs text-gray-400">Owner: {room.userEmail}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // EMPTY STATE
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            <h2 className="mb-2 text-xl font-semibold">No Rooms Found</h2>

            <p className="text-sm text-gray-500">
              You haven’t created any rooms yet.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRoomsPage;
