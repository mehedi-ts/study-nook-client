export const getMyBookingByUserId = async (userId) => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API}/bookings/user/${userId}`,
    {},
  );
  const res = await req.json();
  return res;
};
export const updateRoom = async (id, updatedData) => {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API}/all-rooms/${id}`, {
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
  const req = await fetch(`${process.env.NEXT_PUBLIC_API}/all-rooms/${id}`, {
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
export const getMyRoomsByUserId = async (userId, token) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/my-rooms/${userId}`, {
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};
