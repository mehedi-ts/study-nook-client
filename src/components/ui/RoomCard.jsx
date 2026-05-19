import Image from "next/image";
import React from "react";

const RoomCard = ({ room }) => {
  const { roomName, image, floor, description, capacity, amenities } = room;
  return (
    <div className="card p-0  bg-base-100  shadow-sm">
      <figure className="relative h-43 w-full overflow-hidden">
        <Image src={image} alt={roomName} fill></Image>
      </figure>
      <div className="card-body p-2">
        <h2 className="card-title">{roomName}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
