import React from 'react';
import { useHistory } from 'react-router-dom';

import MeetingEditForm from './MeetingEditForm';
import { Modal } from '../../../context/Modal';
import Button from '../../button';

import styles from './MeetingEditForm.module.css'

export default function MeetingEditModal() {
  const history = useHistory();

  return (
    <div className={styles.pageContainer}>
      <Modal onClose={() => history.goBack()}>
        <div className={styles.closeModal}>
          <Button
            text={<i className="fas fa-angle-left"></i>}
            fontColor={"white"}
            paddingY={32}
            paddingX={32}
            action={() => history.goBack()}
            width={60}
            fontSize={24}
            btnColor={"teal"}
            borderRadius={51}
            />
        </div>
        <MeetingEditForm />
      </Modal>
    </div>
  )
}
