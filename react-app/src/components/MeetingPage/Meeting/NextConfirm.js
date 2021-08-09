import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import socket from "../socket";

import { kickFromQueue, getMeetingQueue } from "../../../store/queue";
import Button from "../../button";
import styles from "../../MeetingPage/ButtonArray/MeetingEndForm.module.css";

export default function NextConfirm({nextGuest, meeting, setShowNextGuestModal }) {

  const dispatch = useDispatch();

  const handleNextGuest = () => {
    // dispatch(kickFromQueue(meeting?.id, patron.user_id));
    socket.emit('next user', meeting?.id, nextGuest?.user_id)
    setShowNextGuestModal(false)
  }

  // useEffect(() => {

  //   dispatch(getMeetingQueue(meeting?.id));
  // },[dispatch, meeting?.id])

  return (
    <div className={styles.formContainer}>
      <div>
        <h2 className={styles.endHeader}>Finished talking to {nextGuest.user.username}?</h2>
        <p className={styles.endText}>
          This will remove {nextGuest.user.username} from the queue and bring in the next patron. Are you sure?
        </p>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          action={() => setShowNextGuestModal(false)}
          borderRadius={8}
          btnColor={"teal"}
          text={"No"}
          fontColor={"white"}
          fontSize={16}
          width={80}
        />
        <Button
          action={handleNextGuest}
          borderRadius={8}
          btnColor={"darkred"}
          text={"Yes"}
          fontColor={"white"}
          fontSize={16}
          width={80}
        />
      </div>
    </div>
  );
}
