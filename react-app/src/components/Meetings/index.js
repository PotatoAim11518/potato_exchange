import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getMeetings } from '../../store/meeting';
import Card from './Card';
import styles from './Meetings.module.css';

export default function Meetings() {
  const dispatch = useDispatch()

  const meetings = useSelector((state) => Object.values(state.meetings))

  useEffect(() => {
    dispatch(getMeetings())
  },[dispatch])

  return (
    <div className={styles.pageContainer}>
      <div className={styles.meetingContainer}>
        {meetings.map((meeting) =>
          <Card key={meeting?.id} meeting={meeting}/>
        )}
      </div>
    </div>
  )
}
