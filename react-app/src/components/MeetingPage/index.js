import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getMeeting } from '../../store/meeting'
import Meeting from './Meeting';
import Chatroom from './Chatroom';

import styles from './Meeting.module.css';


export default function MeetingPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user)
  const meetings = useSelector((state) => state.meetings)
  const user_id = user?.id
  const meeting = meetings[id]


  useEffect(() => {
    dispatch(getMeeting(id))
  },[dispatch, id])

  return (
    <div className={styles.pageContainer}>
      <Meeting user_id={user_id} meeting={meeting}/>

      {/* <div className={styles.video}>
        <div className={styles.videoBox}>
          VideoSelf
        </div>
        <div className={styles.videoBox}>
          VideoGuest
        </div>
      </div> */}

      <Chatroom/>
    </div>
  )
}
