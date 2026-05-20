"use client";

import { useMemo, useState } from "react";
import { Button, Label, TextArea } from "@heroui/react";

const HOURLY_SLOTS = Array.from({ length: 13 }, (_, i) => {
  const hour = 8 + i;
  return `${String(hour).padStart(2, "0")}:00`;
});

const HOURLY_RATE = 50;

const BookingCard = ({ onClose, roomData, userData }) => {
  console.log(userData, roomData);
  const {
    roomName,
    image,
    description,
    hourlyRate,
    floor,
    capacity,
    userEmail,
    _id,
  } = roomData;
  const { name, id, email } = userData;
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const getHour = (t) => Number(t.split(":")[0]);

  // today limit
  const today = new Date().toISOString().split("T")[0];

  // end time options based on start time
  const endTimeOptions = useMemo(() => {
    if (!startTime) return [];
    const startHour = getHour(startTime);
    return HOURLY_SLOTS.filter((t) => getHour(t) > startHour);
  }, [startTime]);

  // real-time cost
  const totalCost = useMemo(() => {
    if (!startTime || !endTime) return 0;
    return (getHour(endTime) - getHour(startTime)) * HOURLY_RATE;
  }, [startTime, endTime]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !startTime || !endTime) {
      setError("All required fields must be filled");
      return;
    }

    if (date < today) {
      setError("You cannot select past dates");
      return;
    }

    if (getHour(endTime) - getHour(startTime) < 1) {
      setError("Minimum booking is 1 hour");
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
    };
    const req = await fetch("http://localhost:8000/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    });
    const res = await req.json();
    console.log(res);

    alert("Booking ready (frontend only)");
    onClose?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto bg-white border rounded-2xl shadow-md p-6 flex flex-col gap-4"
    >
      <h1 className="text-xl font-semibold">Book this room</h1>

      {/* DATE */}
      <div>
        <Label>Date *</Label>
        <input
          type="date"
          value={date}
          min={today}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border p-2 rounded-lg"
        />
      </div>

      {/* START TIME */}
      <div>
        <Label>Start Time *</Label>
        <select
          value={startTime}
          onChange={(e) => {
            setStartTime(e.target.value);
            setEndTime("");
          }}
          className="w-full border p-2 rounded-lg"
        >
          <option value="">Select start time</option>
          {HOURLY_SLOTS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* END TIME */}
      <div>
        <Label>End Time *</Label>
        <select
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="w-full border p-2 rounded-lg"
          disabled={!startTime}
        >
          <option value="">Select end time</option>
          {endTimeOptions.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* COST */}
      <div className="text-sm font-medium text-green-600">
        Total Cost: ${totalCost}
      </div>

      {/* ERROR */}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* NOTES */}
      <div>
        <Label>Special Note (Optional)</Label>
        <TextArea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Write something..."
          rows={4}
        />
      </div>

      {/* BUTTON */}
      <Button type="submit" className="w-full rounded-lg">
        Confirm Booking
      </Button>
    </form>
  );
};

export default BookingCard;
