import { useState } from "react";
import cx from "classnames";
import { Mic, Video, PhoneOff, MicOff, VideoOff, MessageCircle } from "lucide-react";

import ChatBox from "@/components/Chat/ChatBox";
import styles from "@/components/Bottom/index.module.css";
import chatStyles from "@/components/Chat/ChatBox.module.css";

const Bottom = (props) => {
  const { muted, playing, toggleAudio, toggleVideo, leaveRoom, socket, roomId } = props;
  const [chatVisible, setChatVisible] = useState(false);

  const toggleChat = () => {
    setChatVisible((prev) => !prev);
  };

  return (
    <>
      <div className={styles.bottomMenu}>
        {muted ? (
          <MicOff
            className={cx(styles.icon, styles.active)}
            size={55}
            onClick={toggleAudio}
          />
        ) : (
          <Mic className={styles.icon} size={55} onClick={toggleAudio} />
        )}
        {playing ? (
          <Video className={styles.icon} size={55} onClick={toggleVideo} />
        ) : (
          <VideoOff
            className={cx(styles.icon, styles.active)}
            size={55}
            onClick={toggleVideo}
          />
        )}
        <MessageCircle
          size={55}
          className={cx(styles.icon)}
          onClick={toggleChat}
        />
        <PhoneOff size={55} className={cx(styles.icon)} onClick={leaveRoom} />
      </div>
      {chatVisible && (
        <div className={chatStyles.overlay}>
          <ChatBox socket={socket} roomId={roomId} />
        </div>
      )}
    </>
  );
};

export default Bottom;
