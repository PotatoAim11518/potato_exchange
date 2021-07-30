import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import styles from './Meeting.module.css';
import { getMeetings, getMeeting } from '../../store/meeting'


export default function MeetingPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const meetings = useSelector((state) => state.meetings)
  const meeting = meetings[id]

  useEffect(() => {
    dispatch(getMeeting(id))
  },[dispatch, id])

  return (
    <div className={styles.pageContainer}>
      <div className={styles.meetingContainer}>
        <h1 className={styles.titleText}>{meeting?.name}</h1>
        <div className={styles.avatar}>{meeting?.host?.username}</div>
        <p className={styles.description}>{meeting?.description}</p>
        {/* <div className={styles.waiting}>
          <p className={styles.waitingText}><em>Waiting: #/{meeting.queue_limit}</em></p>
        </div> */}
      </div>
      <div className={styles.chatroom}>
        Chatroom
      </div>
    </div>
  )
}
