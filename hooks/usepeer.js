import { useState, useEffect, useRef } from "react";
import { useSocket } from "@/context/socket"
import { useRouter } from "next/router"


const usePeer = () => {
    const socket = useSocket()
    const roomId = useRouter().query.roomId;
    const [peer, setPeer] = useState(null)
    const [myId, setMyId] = useState('')
    const isPeerSet = useRef(false)


    useEffect(() => {
        if (isPeerSet.current || !roomId || !socket) return;
        isPeerSet.current = true;
        let myPeer;

        (async function initPeer() {
            try {
                const Peer = (await import('peerjs')).default;
                myPeer = new Peer();
                setPeer(myPeer);

                myPeer.on('open', (id) => {
                    console.log(`your peer id is ${id}`);
                    setMyId(id);
                    socket?.emit('join-room', roomId, id);
                });
            } catch (error) {
                console.error('Failed to initialize peer:', error);
            }
        })(); 
    }, [roomId, socket]);

    return { 
        peer,
        myId
    }

}

export default usePeer;