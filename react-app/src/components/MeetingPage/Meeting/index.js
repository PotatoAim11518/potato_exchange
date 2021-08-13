import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getMeeting } from "../../../store/meeting";
import ButtonArray from "../ButtonArray";
import Queue from "./Queue";
import socket from "../socket";
import styles from "./Meeting.module.css";

export default function Meeting({ user_id, meeting }) {
  const dispatch = useDispatch();

  const dateOptions = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const timeOptions = { timeZone: 'PST', hour: "2-digit", minute: "2-digit" };
  const createdDate = new Date(meeting?.created_at).toLocaleDateString(
    "en-US",
    dateOptions
  );
  const createdTime = new Date(meeting?.created_at).toLocaleTimeString(
    "en-US",
    timeOptions
  );



  useEffect(() => {
    socket.on('update meeting', (meeting_id) => {
      if (meeting_id === meeting?.id) {
        dispatch(getMeeting(meeting?.id));
      }
    })
  },[dispatch, meeting?.id])

  return (
    <div className={styles.meetingContainer}>
      <div className={styles.containerTop}>
        <div>
          <h1 className={styles.titleText}>{meeting?.name}</h1>
          <h3 className={styles.createdDate}>
            {createdDate + " " + createdTime}
          </h3>
        </div>
        <div className={styles.avatar}>{meeting?.host?.username}</div>
      </div>
      <p className={styles.description}>{meeting?.description}</p>
      {meeting?.host_id === user_id && <ButtonArray meeting={meeting} />}
      <Queue user_id={user_id} meeting={meeting}/>
    </div>
  );
}
