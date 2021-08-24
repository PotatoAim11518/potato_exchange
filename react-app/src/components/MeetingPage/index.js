import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import socket from "./socket";
import peer from "./peer";

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
  const selfVideo = useRef();
  const otherVideo = useRef();
  const [showEndMeetingModal, setShowEndMeetingModal] = useState(false);

  const user = useSelector((state) => state.session.user);
  const user_id = user?.id;
  const meetings = useSelector((state) => state.meetings);
  const meeting = meetings[id];

  const [hideSelf, setHideSelf] = useState(true);



  // Joining Video Button Action
  const joinVideo = () => {
    // show the video element for self
    setHideSelf(false);
    //   // load the camera mediaStream into the video element
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        selfVideo.current.srcObject = stream;
        //     // connect to the room
        //     if (user_id === meeting.host_id) {

        //     }
        socket.on("new_guest", (other_user) => {
          // connectToOther(other_user, stream)
          console.log(">>>>>>>>", other_user, "Joined room <<<<<<<");
        });

        //     peer.on("call", (call) => {
        //       call.answer(stream);
        //       call.on("stream", (otherStream) => {
        //         otherVideo.current.srcObject = otherStream;
        //       });
        //     });
      });
    };

    // const connectToOther = (other_id, stream) => {
  //   const call = peer.call(other_id, stream);
  //   call.on("stream", (otherStream) => {
  //     otherVideo.current.srcObject = otherStream;
  //   });
  // };

  // Leave Video Button Action
  const leaveVideo = () => {
    // hide the video element for self
    setHideSelf(true);
    stopStreamedVideo(selfVideo);
  };
  // stop a video stream
  const stopStreamedVideo = (videoElem) => {
    const stream = videoElem.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(function (track) {
      track.stop();
    });
    videoElem.current.srcObject = null;
  };

  // useEffect(() => {
  peer.on("open", (peer_id) => {
    console.log("==>==>==>==>==>==> Peer OPEN ID", peer_id)
    socket.emit("join_meeting", peer_id, id); // 'id' is the meeting room ID
  });
  // },[]);

    useEffect(() => {
      dispatch(getMeeting(id));

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
              action={leaveVideo}
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
              action={joinVideo}
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
