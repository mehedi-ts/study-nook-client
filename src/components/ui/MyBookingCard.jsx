"use client";

import { useState } from "react";
import Image from "next/image";
import { CalendarDays, X, Library } from "lucide-react";
import { authClient } from "../../../lib/auth-client";
import toast from "react-hot-toast";

const MyBookingCard = ({ data }) => {
  if (!data) return null;

  const { date, totalCost, roomName, image, roomId, status, _id } = data;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [open, setOpen] = useState(false);

  const isConfirmed = status === true;
  const isFuture = new Date(date) >= new Date().setHours(0, 0, 0, 0);

  const handleCancel = async () => {
    const { data: tokenData } = await authClient.token();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/booking/cancel/${_id}`,
        {
          method: "PATCH",
          headers: {
            authorization: `Bearer ${tokenData?.token}`,
          },
        },
      );

      const result = await res.json();

      if (!result.success) {
        toast.error(result.message || "Cancel failed");
        return;
      }

      toast.success("Booking cancelled successfully");

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  // ✅ VALID IMAGE CHECK (ONLY STRING + NOT EMPTY)
  const hasValidImage = typeof image === "string" && image.trim().length > 0;

  return (
    <div className="w-full rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          {/* IMAGE (SAFE RENDER) */}
          <div className="relative h-40 w-full overflow-hidden rounded-2xl md:h-32 md:w-52 flex items-center justify-center bg-gray-100">
            {hasValidImage ? (
              <Image src={image} alt={roomName} fill className="object-cover" />
            ) : (
              <span className="text-gray-500 text-sm">{roomName}</span>
            )}
          </div>

          {/* INFO */}
          <div className="space-y-4">
            {/* TITLE + STATUS */}
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600">
                <Library size={20} />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900">{roomName}</h2>

                <span
                  className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    isConfirmed
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {isConfirmed ? "confirmed" : "cancelled"}
                </span>
              </div>
            </div>

            {/* DETAILS */}
            <div className="flex flex-wrap items-center gap-8">
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <div className="mt-1 flex items-center gap-2">
                  <CalendarDays size={18} className="text-green-600" />
                  <span className="text-lg font-semibold">{date}</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Room ID</p>
                <h4 className="mt-1 text-lg font-semibold">{roomId}</h4>
              </div>

              <div>
                <p className="text-sm text-gray-500">Cost</p>
                <h4 className="mt-1 text-lg font-semibold">${totalCost}</h4>
              </div>
            </div>
          </div>
        </div>

        {/* ACTION */}
        <div className="flex items-center gap-3">
          {isConfirmed && isFuture && (
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-medium text-gray-700 hover:bg-gray-100"
            >
              <X size={18} />
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* CONFIRM MODAL */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="w-[350px] rounded-xl bg-white p-6">
            <h2 className="text-lg font-semibold mb-2">Cancel Booking?</h2>

            <p className="text-sm text-gray-500 mb-4">
              This will mark your booking as cancelled.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg border"
              >
                No
              </button>

              <button
                onClick={() => {
                  setOpen(false);
                  handleCancel();
                }}
                className="px-4 py-2 rounded-lg bg-red-500 text-white"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookingCard;
