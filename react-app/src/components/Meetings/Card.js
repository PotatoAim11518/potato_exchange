import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Card.module.css';

export default function Card({ meeting }) {
  const history = useHistory();

  const dateOptions = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
  const timeOptions = { hour: '2-digit', minute: '2-digit' };
  const createdDate = new Date(meeting.created_at).toLocaleDateString('en-US', dateOptions);
  const createdTime = new Date(meeting.created_at).toLocaleTimeString('en-US', timeOptions);

  const goToMeeting = () => {
    history.push(`/meetings/${meeting.id}`)
  }

  return (
    <div className={styles.card} onClick={goToMeeting}>
      <h1 className={styles.titleText}>{meeting.name}</h1>
      <h2 className={styles.createdDate}>{ createdDate + " " + createdTime }</h2>
      <div className={styles.avatar}>{meeting.host.username}</div>
      <p className={styles.description}>{meeting.description}</p>
      <div className={styles.waiting}>
        <p className={styles.waitingText}><em>Waiting: #/{meeting.queue_limit}</em></p>
      </div>
    </div>
  )
}
