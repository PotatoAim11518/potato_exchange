import React, { useState } from 'react';
import HostingForm from './HostingForm';
import { Modal } from '../../context/Modal';
import Button from '../button';

import styles from './HostingForm.module.css'
import { useHistory } from 'react-router-dom';

export default function HostingPage() {
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  return (
    <div className={styles.pageContainer}>
      <Modal onClose={() => setShowModal(false)}>
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
        <HostingForm/>
      </Modal>
    </div>
  )
}
