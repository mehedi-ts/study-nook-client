"use client";
import { AlertDialog, Button } from "@heroui/react";
import Link from "next/link";
import React, { useId } from "react";
import { deleteRoom } from "../../../lib/data";
import { redirect } from "next/navigation";

const DetailsAction = ({ userData, userEmail, room_id, roomData }) => {
  console.log(userData, room_id, userEmail);
  const handleDelete = async (id) => {
    const req = await fetch(`${process.env.NEXT_API}/all-rooms/${id}`, {
      method: "DELETE",
    });
    const res = await req.json();
    console.log(res);
    if (res.deletedCount > 0 || res.acknowledged === true) {
      redirect("/all-rooms");
    }
  };
  return (
    <div
      className={` flex-col gap-2 w-full ${userEmail === userData.email ? "flex" : "hidden"}`}
    >
      <Link href={`/all-rooms/${room_id}/edit`}>
        <Button className="rounded-lg w-full">Edit</Button>
      </Link>
      <AlertDialog>
        <Button className="rounded-lg w-full" variant="danger">
          Delete
        </Button>
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-100">
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading>
                  Delete room permanently?
                </AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p>
                  This will permanently delete{" "}
                  <strong>{roomData.roomName}</strong> and all of its data. This
                  action cannot be undone.
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button slot="close" variant="tertiary">
                  Cancel
                </Button>
                <Button
                  onClick={() => handleDelete(room_id)}
                  slot="close"
                  variant="danger"
                >
                  Delete Project
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
};

export default DetailsAction;
