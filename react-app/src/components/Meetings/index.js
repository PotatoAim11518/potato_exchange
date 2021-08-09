import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import socket from '../MeetingPage/socket';
import { getMeetings } from '../../store/meeting';
import Card from './Card';
import HostingCard from './HostingCard';
import BackButton from '../backbutton';
import styles from './Meetings.module.css';

export default function Meetings() {
  const dispatch = useDispatch()

  const meetings = useSelector((state) => Object.values(state.meetings))

  useEffect(() => {
    // socket.on('clear_meeting', () => {
    //   dispatch(getMeetings())
    // })
    dispatch(getMeetings())
  },[dispatch])

  return (
    <div className={styles.pageContainer}>
      <BackButton/>
      <div className={styles.meetingContainer}>
        <>
          {meetings?.map((meeting) =>
            <Card key={meeting?.id} meeting={meeting}/>
            )}
          <HostingCard/>
        </>
      </div>
    </div>
  )
}
