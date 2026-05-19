export const getAllRooms = async () => {
  const req = await fetch("http://localhost:8000/all-rooms");
  const res = await req.json();
  return res;
};
