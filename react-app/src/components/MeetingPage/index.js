import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getMeeting } from '../../store/meeting'
import Chatroom from './Chatroom';

import styles from './Meeting.module.css';


export default function MeetingPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user)
  const meetings = useSelector((state) => state.meetings)
  const user_id = user?.id
  const meeting = meetings[id]

  const dateOptions = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
  const timeOptions = { hour: '2-digit', minute: '2-digit' };
  const createdDate = new Date(meeting?.created_at).toLocaleDateString('en-US', dateOptions);
  const createdTime = new Date(meeting?.created_at).toLocaleTimeString('en-US', timeOptions);

  useEffect(() => {
    dispatch(getMeeting(id))
  },[dispatch, id])

  return (
    <div className={styles.pageContainer}>
      <div className={styles.meetingContainer}>
        <div className={styles.containerTop}>
          <div>
            <h1 className={styles.titleText}>{meeting?.name}</h1>
            <h3 className={styles.createdDate}>{createdDate + " " + createdTime}</h3>
          </div>
          <div className={styles.avatar}>{meeting?.host?.username}</div>
        </div>
        <p className={styles.description}>{meeting?.description}</p>
        {meeting?.host_id === user_id &&
          <div className={styles.modifyMeeting}>
          Edit
          Lock Queue
          Close Room
        </div>}
        <p className={styles.waitingText}><em>Queue #/{meeting?.queue_limit}</em></p>
      </div>
      <div className={styles.video}>
        <div className={styles.videoBox}>
          VideoSelf
        </div>
        <div className={styles.videoBox}>
          VideoGuest
        </div>
      </div>
      <Chatroom meeting={meeting}/>
    </div>
  )
}
