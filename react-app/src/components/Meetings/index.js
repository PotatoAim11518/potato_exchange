import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import socket from '../MeetingPage/socket';
import { getMeetings, getMeeting } from '../../store/meeting';
import { allMeetingQueues, trimQueue } from '../../store/queue';
import Card from './Card';
import HostingCard from './HostingCard';
import BackButton from '../backbutton';
import styles from './Meetings.module.css';

export default function Meetings() {
  const dispatch = useDispatch()

  const meetings = useSelector((state) => Object.values(state.meetings))
  const queues = useSelector((state) => Object.values(state.queue));

  useEffect(() => {
    dispatch(getMeetings())
    dispatch(allMeetingQueues())
    socket.on("trim_queue", (queue) => {
      let queue_json = JSON.parse(queue)
      dispatch(trimQueue(queue_json));
    });
    socket.on('update_meeting', (meeting_id) => {
        dispatch(getMeeting(meeting_id));
    })
  },[dispatch])

  return (
    <div className={styles.pageContainer}>
      <BackButton/>
      <div className={styles.meetingContainer}>
        {meetings?.map((meeting) =>
          <Card key={meeting?.id} meeting={meeting} queues={queues}/>
          )}
        <HostingCard/>
      </div>
    </div>
  )
}
