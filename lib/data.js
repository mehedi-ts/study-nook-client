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
