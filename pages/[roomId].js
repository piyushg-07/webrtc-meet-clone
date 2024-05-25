
import { useSocket } from "@/context/socket";
import usePeer from "@/hooks/usepeer"
import useMediaStream from "@/hooks/useMediaStream";
import { useRouter } from "next/router";

import Player from "@/components/Player/index.js";
import { useEffect } from "react";

const Room = () => {
  const socket = useSocket();
  const { roomId } = useRouter().query;
  const { peer, myId } = usePeer();
  const { stream } = useMediaStream();

  useEffect(() => {
    if (!socket) return;
    const handleUserConnected = (newUser) => {
      console.log("newUser connected", newUser)
    }

    socket.on("user-connected", handleUserConnected);
    return () => {
      socket.off("user-connected", handleUserConnected);
    };

  }, [socket]);
  return (
    <div>
      <h1>Room</h1>
      <Player url={stream} muted={true} playing={true} isActive={true} />
    </div>
  )

}

export default Room; 