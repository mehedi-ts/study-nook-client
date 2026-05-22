"use client";

import { useMemo, useState } from "react";
import { Button, Label, TextArea, Modal } from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "../../../lib/auth-client";

const HOURLY_SLOTS = Array.from({ length: 13 }, (_, i) => {
  const hour = 8 + i;
  return `${String(hour).padStart(2, "0")}:00`;
});

const BookingCard = ({ roomData, userData }) => {
  const { roomName, image, description, hourlyRate, capacity, _id } = roomData;
  const { name, id, email } = userData || {};

  const [open, setOpen] = useState(false);

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const getHour = (t) => Number(t.split(":")[0]);
  const today = new Date().toISOString().split("T")[0];

  const endTimeOptions = useMemo(() => {
    if (!startTime) return [];
    const startHour = getHour(startTime);
    return HOURLY_SLOTS.filter((t) => getHour(t) > startHour);
  }, [startTime]);

  const totalCost = useMemo(() => {
    if (!startTime || !endTime) return 0;
    return (getHour(endTime) - getHour(startTime)) * (hourlyRate || 0);
  }, [startTime, endTime, hourlyRate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data: tokenData } = await authClient.token();

    if (!date || !startTime || !endTime) {
      setError("Please fill all required fields");
      return;
    }

    setError("");

    const bookingData = {
      date,
      startTime,
      endTime,
      notes,
      totalCost,
      userName: name,
      userId: id,
      userEmail: email,
      roomId: _id,
      roomName,
      image,
      capacity,
      description,
      status: true,
    };

    try {
      const req = await fetch(`${process.env.NEXT_PUBLIC_API}/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(bookingData),
      });

      const res = await req.json();

      if (!res.success) {
        toast.error(res.message || "Booking failed");
        return;
      }

      toast.success("Room booked successfully!");

      setOpen(false);

      // ✅ CHANGE: reload same page instead of redirect
      setTimeout(() => {
        window.location.reload();
      }, 600);
    } catch (error) {
      toast.error("Server error");
      console.error(error);
    }
  };

  return (
    <>
      {/* BUTTON */}
      <Button
        color="success"
        className="w-full font-semibold bg-[#059669]"
        onPress={() => setOpen(true)}
      >
        Book Now
      </Button>

      {/* MODAL */}
      <Modal isOpen={open} onOpenChange={setOpen}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-[440px]">
              <Modal.CloseTrigger />

              <Modal.Header>
                <Modal.Heading>Book {roomName}</Modal.Heading>
              </Modal.Header>

              <Modal.Body>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* DATE */}
                  <div>
                    <Label>Date *</Label>
                    <input
                      type="date"
                      value={date}
                      min={today}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full mt-1 border rounded-xl px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                    />
                  </div>

                  {/* TIME GRID */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Start *</Label>
                      <select
                        value={startTime}
                        onChange={(e) => {
                          setStartTime(e.target.value);
                          setEndTime("");
                        }}
                        className="w-full mt-1 border rounded-xl px-3 py-2"
                      >
                        <option value="">Start</option>
                        {HOURLY_SLOTS.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label>End *</Label>
                      <select
                        value={endTime}
                        disabled={!startTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full mt-1 border rounded-xl px-3 py-2 disabled:opacity-50"
                      >
                        <option value="">End</option>
                        {endTimeOptions.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* COST CARD */}
                  <div className="bg-green-50 border border-green-100 rounded-xl p-3 text-center">
                    <p className="text-sm text-green-700 font-medium">
                      Total Cost
                    </p>
                    <p className="text-lg font-bold text-green-800">
                      ${totalCost}
                    </p>
                  </div>

                  {/* NOTES (IMPROVED UI) */}
                  <div className="space-y-1">
                    <Label>Special Note</Label>
                    <TextArea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                      placeholder="Any special request? (optional)"
                      className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  {/* ERROR */}
                  {error && <p className="text-sm text-red-500">{error}</p>}

                  {/* SUBMIT */}
                  <Button
                    type="submit"
                    className="w-full font-semibold bg-[#059669]"
                  >
                    Confirm Booking
                  </Button>
                </form>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
};

export default BookingCard;
