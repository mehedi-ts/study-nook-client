"use client";

import { FloppyDisk } from "@gravity-ui/icons";

import {
  Button,
  Checkbox,
  Description,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";

import {
  ArrowLeft,
  BookOpen,
  Building2,
  DollarSign,
  FileText,
  ImageIcon,
  Users,
} from "lucide-react";
import { redirect } from "next/navigation";
import { authClient } from "../../../lib/auth-client";

const amenities = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

const AddRoomPage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const { name, email, id } = user || {};

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      roomName: formData.get("roomName"),
      description: formData.get("description"),
      image: formData.get("image"),
      floor: formData.get("floor"),
      capacity: formData.get("capacity"),
      hourlyRate: formData.get("hourlyRate"),
      amenities: formData.getAll("amenities"),
      userName: name,
      userId: id,
      userEmail: email,
    };

    const req = await fetch("http://localhost:8000/all-rooms", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    const res = await req.json();
    console.log(res);
    if (res?.acknowledged === true) {
      alert("done");
    }
    redirect("/all-rooms");
  };

  return (
    <div className="min-h-screen bg-[#f6f7f9] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button className="flex items-center gap-2 text-gray-600 hover:text-black mb-8 transition">
          <ArrowLeft size={18} />
          Study Rooms
        </button>

        {/* Heading */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-slate-900">Add New Room</h1>

          <p className="text-lg text-gray-500 mt-4">
            Fill in the details below to add a new study room.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white border border-gray-200 rounded-[32px] shadow-sm p-6 md:p-10">
          {/* Card Header */}
          <div className="flex items-start gap-4 mb-10">
            <div className="bg-green-100 p-3 rounded-2xl">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Room Information
              </h2>

              <p className="text-gray-500 mt-1">
                Provide all the necessary details about the study room.
              </p>
            </div>
          </div>

          {/* FORM */}
          <Form onSubmit={onSubmit}>
            <Fieldset className="w-full space-y-8">
              <Fieldset.Group className="space-y-8">
                {/* Room Name */}
                <div className="flex gap-4">
                  <div className="hidden md:flex min-w-14 h-14 items-center justify-center rounded-2xl bg-green-50">
                    <Building2 className="w-5 h-5 text-green-600" />
                  </div>

                  <div className="flex-1">
                    <TextField
                      isRequired
                      name="roomName"
                      validate={(value) => {
                        if (value.length < 3) {
                          return "Room name must be at least 3 characters";
                        }

                        return null;
                      }}
                    >
                      <Label>Room Name</Label>

                      <Input
                        placeholder="e.g. Focus Room A"
                        variant="bordered"
                        size="lg"
                        radius="lg"
                      />

                      <Description>Enter a unique room name</Description>

                      <FieldError />
                    </TextField>
                  </div>
                </div>

                {/* Description */}
                <div className="flex gap-4">
                  <div className="hidden md:flex min-w-14 h-14 items-center justify-center rounded-2xl bg-green-50">
                    <FileText className="w-5 h-5 text-green-600" />
                  </div>

                  <div className="flex-1">
                    <TextField
                      isRequired
                      name="description"
                      validate={(value) => {
                        if (value.length < 10) {
                          return "Description must be at least 10 characters";
                        }

                        return null;
                      }}
                    >
                      <Label>Description</Label>

                      <TextArea
                        placeholder="Describe the room..."
                        variant="bordered"
                        rows={5}
                        radius="lg"
                      />

                      <Description>Minimum 10 characters</Description>

                      <FieldError />
                    </TextField>
                  </div>
                </div>

                {/* Image URL */}
                <div className="flex gap-4">
                  <div className="hidden md:flex min-w-14 h-14 items-center justify-center rounded-2xl bg-green-50">
                    <ImageIcon className="w-5 h-5 text-green-600" />
                  </div>

                  <div className="flex-1">
                    <TextField isRequired name="image">
                      <Label>Image URL</Label>

                      <Input
                        placeholder="https://example.com/image.jpg"
                        variant="bordered"
                        size="lg"
                        radius="lg"
                      />

                      <FieldError />
                    </TextField>
                  </div>
                </div>

                {/* Floor + Capacity */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Floor */}
                  <div className="flex gap-4">
                    <div className="hidden md:flex min-w-14 h-14 items-center justify-center rounded-2xl bg-green-50">
                      <Building2 className="w-5 h-5 text-green-600" />
                    </div>

                    <div className="flex-1">
                      <TextField isRequired name="floor">
                        <Label>Floor</Label>

                        <Input
                          placeholder="e.g. 3rd Floor"
                          variant="bordered"
                          size="lg"
                          radius="lg"
                        />

                        <FieldError />
                      </TextField>
                    </div>
                  </div>

                  {/* Capacity */}
                  <div className="flex gap-4">
                    <div className="hidden md:flex min-w-14 h-14 items-center justify-center rounded-2xl bg-green-50">
                      <Users className="w-5 h-5 text-green-600" />
                    </div>

                    <div className="flex-1">
                      <TextField isRequired name="capacity">
                        <Label>Capacity</Label>

                        <Input
                          type="number"
                          placeholder="e.g. 4"
                          variant="bordered"
                          size="lg"
                          radius="lg"
                        />

                        <FieldError />
                      </TextField>
                    </div>
                  </div>
                </div>

                {/* Hourly Rate */}
                <div className="flex gap-4">
                  <div className="hidden md:flex min-w-14 h-14 items-center justify-center rounded-2xl bg-green-50">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>

                  <div className="flex-1">
                    <TextField isRequired name="hourlyRate">
                      <Label>Hourly Rate (USD)</Label>

                      <Input
                        type="number"
                        placeholder="e.g. 5"
                        variant="bordered"
                        size="lg"
                        radius="lg"
                      />

                      <FieldError />
                    </TextField>
                  </div>
                </div>

                {/* Amenities */}
                <div className="pt-4">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Amenities
                  </h2>

                  <p className="text-gray-500 mb-6">
                    Select all that apply to this room.
                  </p>

                  <div className="grid md:grid-cols-3 gap-5">
                    {amenities.map((item) => (
                      <div
                        key={item}
                        className="border border-gray-200 rounded-2xl px-5 py-4 hover:border-green-500 transition"
                      >
                        <Checkbox
                          name="amenities"
                          value={item}
                          color="success"
                          size="lg"
                        >
                          <span className="font-medium text-slate-700">
                            {item}
                          </span>
                        </Checkbox>
                      </div>
                    ))}
                  </div>
                </div>
              </Fieldset.Group>

              {/* Actions */}
              <Fieldset.Actions className="flex items-center justify-between pt-10">
                <Button
                  type="reset"
                  variant="bordered"
                  radius="lg"
                  size="lg"
                  className="px-8"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  color="success"
                  radius="lg"
                  size="lg"
                  className="px-10 font-semibold"
                >
                  <FloppyDisk />
                  Add Room
                </Button>
              </Fieldset.Actions>
            </Fieldset>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddRoomPage;
