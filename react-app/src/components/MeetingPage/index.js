import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getMeeting } from '../../store/meeting'
import socket from './socket';
import { Modal } from '../../context/Modal';
import MeetingEndModal from './ButtonArray/MeetingEndModal';
import Meeting from './Meeting';
import Chatroom from './Chatroom';
import BackButton from '../backbutton';

import styles from './MeetingPage.module.css';


export default function MeetingPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user)
  const meetings = useSelector((state) => state.meetings)
  const user_id = user?.id
  const meeting = meetings[id]

  const [showEndMeetingModal, setShowEndMeetingModal] = useState(false);

  useEffect(() => {
    dispatch(getMeeting(id))
    socket.on('clear_meeting', () => {
      if (user_id !== meeting?.host_id) {
        setShowEndMeetingModal(true)
      }
    })
  },[dispatch, id, showEndMeetingModal, user_id, meeting?.host_id])

  return (
    <div className={styles.pageContainer}>
      {showEndMeetingModal &&
      <Modal onClose={() => setShowEndMeetingModal(false)}>
        <MeetingEndModal setShowEndMeetingModal={setShowEndMeetingModal}/>
      </Modal>}
      <BackButton/>
      <Meeting user_id={user_id} meeting={meeting}/>

      {/* <div className={styles.video}>
        <div className={styles.videoBox}>
          VideoSelf
        </div>
        <div className={styles.videoBox}>
          VideoGuest
        </div>
      </div> */}

      <Chatroom/>
    </div>
  )
}
