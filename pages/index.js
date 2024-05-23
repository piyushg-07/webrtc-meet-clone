import { useSocket } from "@/context/socket";
import { useEffect } from "react";

export default function Home() {
  const socket = useSocket();
  useEffect(() => {
    socket?.on("connect", () => {
      console.log("connected to socket", socket.id);
    });
   
  }, [socket])
  
  return (
    <div>piyush</div>
  );
}
