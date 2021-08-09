import React from 'react';
import { useHistory } from 'react-router';

import Button from '../../button';
import styles from './MeetingEndModal.module.css'

export default function MeetingEndModal({setShowEndMeetingModal}) {
  const history = useHistory();

  const handleClose = async (e) => {
    e.preventDefault();
    setShowEndMeetingModal(false)
    window.location.href = '/join'
  }

  return (
    <div className={styles.formContainer}>
      <div>
        <h2 className={styles.endHeader}>The Host has ended the meeting</h2>
        <p className={styles.endText}>We hope you had a good time! Everyone has been removed from the queue and returned to the Lobby. Thanks for stopping by!</p>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          action={handleClose}
          borderRadius={10}
          btnColor={"gold"}
          text={"Okay"}
          fontColor={"black"}
          fontSize={16}
          width={80}
        />
      </div>
    </div>
  )
}
