export const getAllRooms = async () => {
  const req = await fetch("http://localhost:8000/all-rooms");
  const res = await req.json();
  return res;
};
export const getRoomById = async (id) => {
  const req = await fetch(`http://localhost:8000/all-rooms/${id}`);
  const res = await req.json();
  return res;
};
export const getMyBookingByUserId = async (userId) => {
  const req = await fetch(`http://localhost:8000/bookings/user/${userId}`);
  const res = await req.json();
  return res;
};
export const updateRoom = async (id, updatedData) => {
  const req = await fetch(`http://localhost:8000/all-rooms/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  const res = await req.json();
  return res;
};
export const deleteRoom = async (id, userId) => {
  const req = await fetch(`http://localhost:8000/all-rooms/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const res = await req.json();
  if (res?.deletedCount > 0 || res?.acknowledged) {
    alert("Room deleted successfully!");
  } else {
    alert("Failed to delete room!");
  }

  return res;
};
