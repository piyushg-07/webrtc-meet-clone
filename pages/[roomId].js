
import { useSocket } from "@/context/socket";
import usePeer from "@/hooks/usepeer"
const Room = () => {
  const socket = useSocket();
  const {peer, myId} = usePeer();
  return (
    <div>
      <h1>Room</h1>
    </div>
  )
  
}

export default Room;