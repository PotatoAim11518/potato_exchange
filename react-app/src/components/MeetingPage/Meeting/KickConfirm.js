import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import socket from "../socket";

import { kickFromQueue, getMeetingQueue } from "../../../store/queue";
import Button from "../../button";
import styles from "../../MeetingPage/ButtonArray/MeetingEndForm.module.css";

export default function KickConfirm({patron, meeting, setShowModal }) {

  const dispatch = useDispatch();

  const handleKickGuest = () => {
    // dispatch(kickFromQueue(meeting?.id, patron.user_id));
    socket.emit('kick user', meeting?.id, patron.user_id)
    setShowModal(false)
  }

  useEffect(() => {
    socket.on('remove user', () => {
      dispatch(getMeetingQueue(meeting?.id));
    })
    dispatch(getMeetingQueue(meeting?.id));
  },[dispatch, meeting?.id])

  return (
    <div className={styles.formContainer}>
      <div>
        <h2 className={styles.endHeader}>Are you sure?</h2>
        <p className={styles.endText}>
          This will kick {patron.user.username} from the queue. Are you sure?
        </p>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          action={() => setShowModal(false)}
          borderRadius={8}
          btnColor={"teal"}
          text={"No"}
          fontColor={"white"}
          fontSize={16}
          width={80}
        />
        <Button
          action={handleKickGuest}
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
