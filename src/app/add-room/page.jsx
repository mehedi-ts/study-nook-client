"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { FloppyDisk } from "@gravity-ui/icons";

import {
  Button,
  Checkbox,
  Fieldset,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";

import { ArrowLeft, BookOpen } from "lucide-react";

import { authClient } from "../../../lib/auth-client";
import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";

const amenities = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

const AddRoomPage = () => {
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const { name, email, id } = user || {};

  const [loading, setLoading] = useState(false);

  const [selectedAmenities, setSelectedAmenities] = useState([]);

  // TOGGLE AMENITY
  const handleAmenityChange = (item) => {
    setSelectedAmenities((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  // SUBMIT
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login first");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData(e.currentTarget);

      const data = {
        roomName: formData.get("roomName"),
        description: formData.get("description"),
        image: formData.get("image"),
        floor: formData.get("floor"),
        capacity: Number(formData.get("capacity")),
        hourlyRate: Number(formData.get("hourlyRate")),
        amenities: selectedAmenities,
        userName: name,
        userId: id,
        userEmail: email,
      };

      const req = await fetch(`${process.env.NEXT_PUBLIC_API}/all-rooms`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await req.json();

      if (!req.ok) {
        throw new Error(res?.message || "Failed to add room");
      }

      if (res?.acknowledged) {
        toast.success("Successfully created!");

        e.target.reset();
        setSelectedAmenities([]);

        setTimeout(() => {
          router.push("/all-rooms");
        }, 800);
      }
    } catch (error) {
      console.error(error);

      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f7f9] py-6 sm:py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* BACK */}
        <button
          onClick={() => router.push("/all-rooms")}
          className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-6 sm:mb-8"
        >
          <ArrowLeft size={18} />
          Study Rooms
        </button>

        {/* HEADING */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
            Add New Room
          </h1>

          <p className="text-gray-500 mt-3 sm:mt-4">
            Fill in the details below to add a new study room.
          </p>
        </div>

        {/* CARD */}
        <div className="bg-white border border-gray-200 rounded-2xl sm:rounded-[32px] shadow-sm p-5 sm:p-8 md:p-10">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-10">
            <div className="bg-green-100 p-3 rounded-2xl w-fit">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Room Information
              </h2>

              <p className="text-gray-500 mt-1">
                Provide all the necessary details about the study room.
              </p>
            </div>
          </div>

          {/* FORM */}
          <Form onSubmit={onSubmit}>
            <Fieldset className="space-y-6 sm:space-y-8">
              {/* ROOM NAME */}
              <TextField isRequired name="roomName">
                <Label>Room Name</Label>

                <Input className="w-full" placeholder="e.g. Focus Room A" />
              </TextField>

              {/* DESCRIPTION */}
              <TextField isRequired name="description">
                <Label>Description</Label>

                <TextArea
                  className="w-full"
                  rows={5}
                  placeholder="Describe the room..."
                />
              </TextField>

              {/* IMAGE */}
              <TextField isRequired name="image">
                <Label>Image URL</Label>

                <Input className="w-full" placeholder="https://..." />
              </TextField>

              {/* FLOOR + CAPACITY */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextField isRequired name="floor">
                  <Label>Floor</Label>

                  <Input className="w-full" placeholder="3rd Floor" />
                </TextField>

                <TextField isRequired name="capacity">
                  <Label>Capacity</Label>

                  <Input
                    className="w-full"
                    type="number"
                    placeholder="4"
                    min={1}
                  />
                </TextField>
              </div>

              {/* HOURLY RATE */}
              <TextField isRequired name="hourlyRate">
                <Label>Hourly Rate</Label>

                <Input
                  className="w-full"
                  type="number"
                  placeholder="5"
                  min={1}
                />
              </TextField>

              {/* AMENITIES */}
              <div>
                <h2 className="text-xl font-bold mb-4 text-slate-900">
                  Amenities
                </h2>

                <p className="text-gray-500 mb-4 text-sm">
                  Select available features for this room
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {amenities.map((item) => {
                    const checked = selectedAmenities.includes(item);

                    return (
                      <button
                        type="button"
                        key={item}
                        onClick={() => handleAmenityChange(item)}
                        className={`
                          p-4 border rounded-2xl transition-all duration-200
                          flex items-center gap-2 text-left
                          ${
                            checked
                              ? "bg-green-50 border-green-500"
                              : "border-gray-200 hover:border-green-400"
                          }
                        `}
                      >
                        <Checkbox
                          isSelected={checked}
                          classNames={{ base: "hidden" }}
                        />

                        <span
                          className={
                            checked
                              ? "text-green-700 font-medium"
                              : "text-slate-700"
                          }
                        >
                          {item}
                        </span>

                        {checked && (
                          <span className="ml-auto text-green-600 font-bold">
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center justify-end">
                <Button
                  type="submit"
                  color="success"
                  className="w-full sm:w-auto font-semibold"
                  isDisabled={loading}
                >
                  <FiPlus />
                  {loading ? "Saving..." : "Add Room"}
                </Button>
              </div>
            </Fieldset>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddRoomPage;
