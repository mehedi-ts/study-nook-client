"use client";

import { useEffect, useState } from "react";
import { FloppyDisk } from "@gravity-ui/icons";

import {
  Button,
  Checkbox,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "../../../lib/auth-client";

const amenitiesList = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

const EditRoomFormClient = () => {
  const { roomId } = useParams();
  const router = useRouter();

  const [roomData, setRoomData] = useState(null);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const [form, setForm] = useState({
    roomName: "",
    description: "",
    image: "",
    floor: "",
    capacity: "",
    hourlyRate: "",
  });

  const getRoomById = async (id, token) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/all-rooms/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return res.json();
  };

  useEffect(() => {
    const fetchRoom = async () => {
      if (!roomId) return;

      const { data: tokenData } = await authClient.token();

      const data = await getRoomById(roomId, tokenData?.token);

      setRoomData(data);

      setForm({
        roomName: data.roomName || "",
        description: data.description || "",
        image: data.image || "",
        floor: data.floor || "",
        capacity: data.capacity || "",
        hourlyRate: data.hourlyRate || "",
      });

      setSelectedAmenities(data.amenities || []);
    };

    fetchRoom();
  }, [roomId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAmenityChange = (item) => {
    setSelectedAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item],
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const { data: tokenData } = await authClient.token();

    if (!roomData?._id) return;

    const updatedRoom = {
      ...form,
      amenities: selectedAmenities,
    };

    try {
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_API}/all-rooms/${roomData._id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify(updatedRoom),
        },
      );

      const res = await req.json();

      if (res.modifiedCount > 0) {
        toast.success("Room Updated Successfully");

        setTimeout(() => {
          router.push(`/all-rooms/${roomData._id}`);
        }, 800);

        return;
      }

      alert("Failed to update room");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  if (!roomData) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f6f7f9] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/all-rooms"
          className="flex items-center gap-2 text-gray-600 mb-8"
        >
          <ArrowLeft size={18} />
          Study Rooms
        </Link>

        <h1 className="text-4xl font-bold mb-10">Edit Room</h1>

        <div className="bg-white p-6 md:p-10 rounded-[32px] border">
          <Form onSubmit={onSubmit}>
            <div className="space-y-6">
              <TextField>
                <Label>Room Name</Label>
                <Input
                  name="roomName"
                  value={form.roomName}
                  onChange={handleChange}
                  variant="bordered"
                />
              </TextField>

              <TextField>
                <Label>Description</Label>
                <TextArea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={5}
                  variant="bordered"
                />
              </TextField>

              <TextField>
                <Label>Image</Label>
                <Input
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  variant="bordered"
                />
              </TextField>

              <div className="grid md:grid-cols-2 gap-6">
                <TextField>
                  <Label>Floor</Label>
                  <Input
                    name="floor"
                    value={form.floor}
                    onChange={handleChange}
                    variant="bordered"
                  />
                </TextField>

                <TextField>
                  <Label>Capacity</Label>
                  <Input
                    name="capacity"
                    type="number"
                    value={form.capacity}
                    onChange={handleChange}
                    variant="bordered"
                  />
                </TextField>
              </div>

              <TextField>
                <Label>Hourly Rate</Label>
                <Input
                  name="hourlyRate"
                  type="number"
                  value={form.hourlyRate}
                  onChange={handleChange}
                  variant="bordered"
                />
              </TextField>

              <div>
                <h2 className="text-xl font-bold mb-4">Amenities</h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {amenitiesList.map((item) => {
                    const checked = selectedAmenities.includes(item);

                    return (
                      <div
                        key={item}
                        onClick={() => handleAmenityChange(item)}
                        className={`p-4 border rounded-xl cursor-pointer ${
                          checked
                            ? "bg-green-50 border-green-500"
                            : "border-gray-200"
                        }`}
                      >
                        <span>{item}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="bordered"
                  onPress={() => router.back()}
                >
                  Cancel
                </Button>

                <Button type="submit" color="success">
                  <FloppyDisk />
                  Update Room
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditRoomFormClient;
