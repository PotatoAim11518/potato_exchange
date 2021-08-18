import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import socket from '../MeetingPage/socket';
import { getMeetings } from '../../store/meeting';
import { allMeetingQueues } from '../../store/queue';
import Card from './Card';
import HostingCard from './HostingCard';
import BackButton from '../backbutton';
import styles from './Meetings.module.css';

export default function Meetings() {
  const dispatch = useDispatch()

  const meetings = useSelector((state) => Object.values(state.meetings))

  useEffect(() => {
    dispatch(getMeetings())
    // dispatch(allMeetingQueues())
  },[dispatch])

  return (
    <div className={styles.pageContainer}>
      <BackButton/>
      <div className={styles.meetingContainer}>
        {meetings?.map((meeting) =>
          <Card key={meeting?.id} meeting={meeting}/>
          )}
        <HostingCard/>
      </div>
    </div>
  )
}
