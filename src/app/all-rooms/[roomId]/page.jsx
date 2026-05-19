import { getRoomById } from "../../../../lib/data";

const RoomDetailsPage = async ({ params }) => {
  const { roomId } = await params;
  console.log(roomId);
  const roomData = await getRoomById(roomId);
  console.log(roomData);
  return (
    <div>
      <h1>this is the room details page {roomData.roomName} </h1>
    </div>
  );
};

export default RoomDetailsPage;
