import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Peer from "peerjs";

import socket from "./socket";
// import peer from "./peer";

import { getMeeting } from "../../store/meeting";
import { Modal } from "../../context/Modal";
import MeetingEndModal from "./ButtonArray/MeetingEndModal";
import Meeting from "./Meeting";
import Chatroom from "./Chatroom";
import BackButton from "../backbutton";
import Button from "../button";

import styles from "./MeetingPage.module.css";

export default function MeetingPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const meetings = useSelector((state) => state.meetings);
  const user_id = user?.id;
  const meeting = meetings[id];

  const [hideSelf, setHideSelf] = useState(true);

  const peer = new Peer();
  const selfVideo = useRef();
  const otherVideo = useRef();

  const [showEndMeetingModal, setShowEndMeetingModal] = useState(false);

  const connectToOther = (other_id, stream) => {
    const call = peer.call(other_id, stream);
    call.on("stream", (otherStream) => {
      otherVideo.current.srcObject = otherStream;
    });
  };

  useEffect(() => {
    dispatch(getMeeting(id));

    peer.on("open", (peer_id) => {
      socket.emit("join_meeting", peer_id, id); // 'id' is the meeting room ID
    });

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        selfVideo.current.srcObject = stream;

        socket.on("new_guest", (other_id) => {
          connectToOther(other_id, stream);
        });

        peer.on("call", (call) => {
          call.answer(stream);
          call.on("stream", (otherStream) => {
            otherVideo.current.srcObject = otherStream;
          });
        });
      });

    socket.on("clear_meeting", () => {
      if (user_id !== meeting?.host_id) {
        setShowEndMeetingModal(true);
      }
    });
  }, [dispatch, id, showEndMeetingModal, user_id, meeting?.host_id]);

  return (
    <div className={styles.pageContainer}>
      {showEndMeetingModal && (
        <Modal onClose={() => setShowEndMeetingModal(false)}>
          <MeetingEndModal setShowEndMeetingModal={setShowEndMeetingModal} />
        </Modal>
      )}
      <BackButton />
      <Meeting user_id={user_id} meeting={meeting} />

      <div className={styles.videosWrapper}>
        <div className={styles.videoContainer}>
          <video
            hidden={hideSelf}
            className={styles.video}
            playsInline
            autoPlay
            ref={selfVideo}
            muted={true}
          ></video>
          {!hideSelf && (
            <Button
              action={() => setHideSelf(true)}
              paddingY={""}
              paddingX={""}
              width={120}
              height={""}
              borderRadius={""}
              btnColor={"salmon"}
              text={"Leave Video"}
              fontColor={""}
              fontSize={16}
            />
          )}
          {hideSelf && (
            <Button
              action={() => setHideSelf(false)}
              paddingY={""}
              paddingX={""}
              width={120}
              height={""}
              borderRadius={""}
              btnColor={"teal"}
              text={"Join Video"}
              fontColor={""}
              fontSize={16}
            />
          )}
        </div>
        <div className={styles.videoContainer}>
          <video
            className={styles.video}
            playsInline
            autoPlay
            ref={otherVideo}
            muted={false}
          ></video>
        </div>
      </div>

      <Chatroom />
    </div>
  );
}
