import React from "react";
import UsersList from "./UsersList";

type RoomProps = { roomID: string };
export default function Room({ roomID }: RoomProps) {
  return (
    <>
      <UsersList roomID={roomID} />
    </>
  );
}
