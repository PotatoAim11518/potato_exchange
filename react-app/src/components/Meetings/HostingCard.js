import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Modal } from '../../context/Modal';
import LoginForm from '../auth/LoginForm';
import styles from './Card.module.css';

export default function HostingCard() {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  const user = useSelector((state) => state.session.user)
  const user_id = user?.id

  const handleHost = () => {
    if (user_id) {
      history.push('/host')
      return
    } else {
      setShowModal(true)
    }
  }

  return (
    <>
      <div className={styles.hostingCard} onClick={handleHost}>
        <h1 className={styles.hostText}>Host</h1>
        <div className={styles.addButton}><i className="fas fa-plus"></i></div>
        <h2 className={styles.hostSubtext}>Create your own room</h2>
      </div>
      {showModal &&
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm setShowModal={setShowModal}/>
        </Modal>
      }
    </>
  )
}
