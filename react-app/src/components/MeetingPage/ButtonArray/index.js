import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import socket from '../socket';
import Button from '../../button';
import { Modal } from '../../../context/Modal';
import MeetingEditForm from './MeetingEditForm';
import MeetingEndForm from './MeetingEndForm';
import { getMeetingQueue } from '../../../store/queue';
import { lockMeetingQueue, unlockMeetingQueue, getMeeting } from '../../../store/meeting';
import styles from './ButtonArray.module.css';

export default function ButtonArray({meeting}) {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const user_id = user?.id;

  const queue_limit_copy = meeting?.queue_limit

  const [showEditModal, setShowEditModal] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [queue_limit, setQueueLimit] = useState(queue_limit_copy)

  const onEdit = () => {
    setShowEditModal(true)
    // history.push(`/meetings/${id}/update`)
  }

  const onLockQueue = () => {
    // dispatch(lockMeetingQueue(id))
    socket.emit('lock queue', user_id, meeting?.id)
  }

  const onUnlockQueue = () => {
    // dispatch(unlockMeetingQueue(id, queue_limit))
    socket.emit('unlock queue', user_id, meeting?.id, queue_limit)
  }

  const onCloseRoom = () => {
    setShowEndModal(true)
    // history.push(`/meetings/${id}/end`)
  }

  useEffect(() => {
    dispatch(getMeetingQueue(meeting?.id))
    dispatch(getMeeting(meeting?.id))
  },[dispatch, id, meeting?.queue_limit, meeting?.id])

  return (
    <div className={styles.arrayContainer}>
      {showEditModal &&
      <Modal onClose={() => setShowEditModal(false)}>
        <MeetingEditForm setShowEditModal={setShowEditModal}/>
      </Modal>}
      {showEndModal &&
      <Modal onClose={() => setShowEndModal(false)}>
        <MeetingEndForm setShowEndModal={setShowEndModal}/>
      </Modal>}
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
      {meeting?.queue_limit > 0 &&
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
      {meeting?.queue_limit === 0 &&
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
