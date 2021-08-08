import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';

import { endMeeting } from '../../../store/meeting';
import Button from '../../button';
import styles from './MeetingEndForm.module.css'

export default function MeetingEndForm({setShowEndModal}) {
  const { id } = useParams();

  const user = useSelector((state) => state.session.user)
  const user_id = user?.id
  const meeting = useSelector((state) => state.meetings)[id]
  const host_id = meeting?.host_id

  const history = useHistory();
  const dispatch = useDispatch();

  const handleClose = async (e) => {
    e.preventDefault();
    if (user_id === host_id) {
      await dispatch(endMeeting(id))
    }
    history.push('/join')
  }

  return (
    <div className={styles.formContainer}>
      <div>
        <h2 className={styles.endHeader}>Are you sure?</h2>
        <p className={styles.endText}>We hope you had a good time! Closing this room will remove everyone from the queue and remove your room from Potato Exchange. Are you absolutely sure?</p>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          action={()=> setShowEndModal(false)}
          borderRadius={10}
          btnColor={"teal"}
          text={"No"}
          fontColor={"black"}
          fontSize={16}
          width={80}
        />
        <Button
          action={handleClose}
          borderRadius={10}
          btnColor={"gold"}
          text={"Yes"}
          fontColor={"black"}
          fontSize={16}
          width={80}
        />
      </div>
    </div>
  )
}
