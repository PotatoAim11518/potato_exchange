import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Tile from './Tile';
import { Modal } from '../../context/Modal';
import LoginForm from '../auth/LoginForm';

import styles from './Homepage.module.css';
import { useSelector } from 'react-redux';


export default function Homepage() {
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
  const handleJoin = () => {
    history.push('/join')
  }

  return (
    <div className={styles.pageContainer}>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm setShowModal={setShowModal}/>
        </Modal>
      )}
      <div className={styles.banner}>Potato Exchange</div>
      <div className={styles.tileContainer}>
        <Tile label={"Host"} action={handleHost} text={"Host a queue for your own room"} />
        <Tile label={"Join"} action={handleJoin} text={"Looking for someone to meet? Explore queues here!"} rotation={"20"}/>
      </div>
    </div>
  )
}
