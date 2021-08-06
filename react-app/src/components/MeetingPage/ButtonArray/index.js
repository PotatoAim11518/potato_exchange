import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from '../../button';
import { getMeetingQueue } from '../../../store/queue';
import { lockMeetingQueue, unlockMeetingQueue } from '../../../store/meeting';
import styles from './ButtonArray.module.css';

export default function ButtonArray({meeting}) {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const queue_limit_copy = meeting.queue_limit

  const [queue_limit, setQueueLimit] = useState(queue_limit_copy)

  const onEdit = () => {
    history.push(`/meetings/${id}/update`)
  }

  const onLockQueue = () => {
    dispatch(lockMeetingQueue(id))
  }

  const onUnlockQueue = () => {
    dispatch(unlockMeetingQueue(id, queue_limit))
  }

  const onCloseRoom = () => {
    history.push(`/meetings/${id}/end`)
  }

  useEffect(() => {
    dispatch(getMeetingQueue(id))
  },[dispatch, id, meeting.queue_limit])

  return (
    <div className={styles.arrayContainer}>
      <Button
        text={"Edit"}
        action={onEdit}
        // paddingY={}
        // paddingX={}
        width={120}
        // height={}
        borderRadius={8}
        btnColor={"teal"}
        fontColor={"white"}
        fontSize={16}
      />
      {meeting.queue_limit > 0 &&
      <Button
        text={"Lock Queue"}
        action={onLockQueue}
        // paddingY={}
        // paddingX={}
        width={120}
        // height={}
        borderRadius={8}
        btnColor={"slategrey"}
        fontColor={"white"}
        fontSize={16}
      />}
      {meeting.queue_limit === 0 &&
      <Button
        text={"Unlock Queue"}
        action={onUnlockQueue}
        // paddingY={}
        // paddingX={}
        width={120}
        // height={}
        borderRadius={8}
        btnColor={"salmon"}
        fontColor={"white"}
        fontSize={16}
      />}
      <Button
        text={"Close Room"}
        action={onCloseRoom}
        // paddingY={}
        // paddingX={}
        width={120}
        // height={}
        borderRadius={8}
        btnColor={"darkred"}
        fontColor={"white"}
        fontSize={16}
      />
    </div>
  )
}
