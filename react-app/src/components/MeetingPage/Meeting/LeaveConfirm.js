import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import socket from "../socket";
import { leaveQueue, getMeetingQueue } from "../../../store/queue";
import Button from "../../button";
import styles from "../../MeetingPage/ButtonArray/MeetingEndForm.module.css";

export default function LeaveConfirm({ meeting, setShowLeaveModal }) {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)
  const user_id = user?.id

  const handleLeaveQueue = () => {
    // dispatch(leaveQueue(meeting.id));
    socket.emit('leave request', user_id, meeting.id)
    setShowLeaveModal(false)
  }

  useEffect(() => {
    socket.on('dequeue user', async () => {
      await dispatch(getMeetingQueue(meeting?.id));

    })
  },[dispatch, meeting?.id])

  return (
    <div className={styles.formContainer}>
      <div>
        <h2 className={styles.endHeader}>Are you sure?</h2>
        <p className={styles.endText}>
          This will remove you from the queue. You will lose your spot and have to rejoin. Are you sure?
        </p>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          action={() => setShowLeaveModal(false)}
          borderRadius={8}
          btnColor={"teal"}
          text={"No"}
          fontColor={"white"}
          fontSize={16}
          width={80}
        />
        <Button
          action={handleLeaveQueue}
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
