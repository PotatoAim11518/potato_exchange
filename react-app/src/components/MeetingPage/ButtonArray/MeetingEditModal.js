import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import MeetingEditForm from './MeetingEditForm';
import { Modal } from '../../../context/Modal';
import Button from '../../button';

import styles from './MeetingEditForm.module.css'

export default function MeetingEditModal() {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  const meetings = useSelector((state) => state.meetings)
  const meeting = meetings[id]

  return (
    <div className={styles.pageContainer}>
      <Modal onClose={() => setShowModal(false)}>
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
        <MeetingEditForm />
      </Modal>
    </div>
  )
}