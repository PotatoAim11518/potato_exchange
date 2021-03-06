import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getMeetingQueue } from "../../store/queue";
import socket from "../MeetingPage/socket";
import styles from "./Card.module.css";

export default function Card({ meeting, queues }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const dateOptions = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const timeOptions = { hour: "2-digit", minute: "2-digit" };
  const createdDate = new Date(meeting.created_at).toLocaleDateString(
    "en-US",
    dateOptions
  );
  const createdTime = new Date(meeting.created_at).toLocaleTimeString(
    "en-US",
    timeOptions
  );

  const user = useSelector((state) => state.session.user);
  const user_id = user?.id;

  const goToMeeting = () => {
    history.push(`/meetings/${meeting?.id}`);
  };

  const inQueue = queues.filter((queue) => queue?.meeting_id === meeting?.id && queue?.user_id === user_id).length > 0

  const calcQueue = (meeting_id) => {
    let count = 0;
    queues.forEach((patron) => {
      if (patron["meeting_id"] === meeting_id) ++count;
    });
    return count;
  };

  useEffect(() => {
    socket.on("update_queue", (meeting_id) => {
      if (meeting_id === meeting?.id) {
        dispatch(getMeetingQueue(meeting?.id));
      }
    });
    dispatch(getMeetingQueue(meeting?.id));
  }, [dispatch, meeting?.id]);

  return (
    <div className={styles.card} onClick={goToMeeting}>
      {meeting?.host_id === user_id && (
        <div className={styles.hostingTag}>Hosting</div>
      )}
      {inQueue && (
        <div className={styles.queuedTag}>Queued</div>
      )}
      <h1 className={styles.titleText}>{meeting.name}</h1>
      <h2 className={styles.createdDate}>{createdDate + " " + createdTime}</h2>
      <div className={styles.avatar}>{meeting.host.username}</div>
      <p className={styles.description}>{meeting.description}</p>
      <div className={styles.waiting}>
        <p className={styles.waitingText}>
          <em>
            Waiting: {calcQueue(meeting?.id)}/{meeting.queue_limit}
          </em>
        </p>
      </div>
    </div>
  );
}
