import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import MeetingEndForm from './MeetingEndForm';
import { Modal } from '../../../context/Modal';
import Button from '../../button';

import styles from './MeetingEndForm.module.css'

export default function MeetingEndModal() {
  const history = useHistory();

  return (
    <div className={styles.pageContainer}>
      <Modal onClose={() => history.goBack()}>
        <div className={styles.closeModal}>
          <Button
            text={"Back"}
            fontColor={"black"}
            paddingY={32}
            paddingX={32}
            action={() => history.goBack()}
            width={60}
            fontSize={18}
            btnColor={"teal"}
            borderRadius={51}
            />
        </div>
        <MeetingEndForm />
      </Modal>
    </div>
  )
}
