import React from "react";
import { useDispatch } from "react-redux";

import { leaveQueue } from "../../../store/queue";
import Button from "../../button";
import styles from "../../MeetingPage/ButtonArray/MeetingEndForm.module.css";

export default function LeaveConfirm({ meeting, setShowModal }) {

  const dispatch = useDispatch();

  const handleLeaveQueue = () => {
    dispatch(leaveQueue(meeting.id));
    setShowModal(false)
  }

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
          action={() => setShowModal(false)}
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
