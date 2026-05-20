import Image from "next/image";
import { Badge } from "@heroui/react";
import { CalendarDays, Trash2, X, Library } from "lucide-react";

const MyBookingCard = ({ data }) => {
  //   const { date, totalCost, roomName, image } = data;

  return (
    <div className="w-full rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Side */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          {/* Image */}
          <div className="relative h-40 w-full overflow-hidden rounded-2xl md:h-32 md:w-52">
            <Image
              src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da"
              alt="Silent Study Hall"
              fill
              className="object-cover"
            />
          </div>

          {/* Info */}
          <div className="space-y-4">
            {/* Room Name */}
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600">
                <Library size={20} />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Silent Study Hall
                </h2>

                <p className="text-sm text-gray-500">Premium Study Room</p>
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-wrap items-center gap-8">
              <div>
                <p className="text-sm text-gray-500">Departure Date</p>

                <div className="mt-1 flex items-center gap-2">
                  <CalendarDays size={18} className="text-green-600" />

                  <span className="text-lg font-semibold text-gray-800">
                    28 May 2025
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Room ID</p>

                <h4 className="mt-1 text-lg font-semibold text-gray-800">
                  RMS-00123
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-medium text-gray-700 transition-all hover:bg-gray-100">
            <X size={18} />
            Cancel
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 font-medium text-white transition-all hover:bg-red-600">
            <Trash2 size={18} />
            Delete Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyBookingCard;
