import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { getMeetingMessages, sendMessage } from '../../store/message';
import ChatMessage from './ChatMessage';
import Button from '../button';
import socket from './socket';
import styles from './Chatroom.module.css';

import { Modal } from '../../context/Modal';
import LoginForm from '../auth/LoginForm';

export default function Chatroom() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [socketMsg, setSocketMsg] = useState("initial state");


  const user = useSelector((state) => state.session.user)
  const user_id = user?.['id']
  const meeting_messages = useSelector((state) => Object.values(state.meeting_messages))
  const chatroom_messages = meeting_messages.filter((meeting) => meeting['meeting_id'] === +id)

  const handleChat = async (e) => {
    e.preventDefault();
    if (user_id) {
      const data = await dispatch(sendMessage(user_id, id, message))
      if (data) {
        setErrors(data);
      } else {
        socket.send('message', data)
        setErrors([])
      }
      setMessage("")
    } else {
      setShowModal(true)
    }
  }

  const updateMessage = (e) => {
    setMessage(e.target.value)
  }

  const receiveBroadcast = () => {
    socket.on("message", data => {
      setSocketMsg(data)
    })
  }

  useEffect(()=> {
    socket.on("connect", () => {
      console.log("?????? socket.connected ??????: ", socket.connected)
    })
    dispatch(getMeetingMessages(id)) // this is chat history
    receiveBroadcast()
  },[dispatch, id])

  return (
    <div className={styles.chatroom}>
      {socketMsg}
      <div className={styles.chatMessages}>
        {chatroom_messages.map((message) =>
          <ChatMessage key={message.id} message={message}/>
        ).reverse()}
      </div>
      <form className={styles.form} method="post" onSubmit={handleChat}>
        <input name="user_id" type="hidden" value={user_id}></input>
        <input name="meeting_id" type="hidden" value={id}></input>
        <input
          className={styles.inputField}
          name="chatbox"
          type="text"
          placeholder="Send a message"
          value={message}
          onChange={updateMessage}
          autocomplete="off"
        ></input>

        <button type="submit">
          <Button
            action={handleChat}
            borderRadius={5}
            btnColor={"teal"}
            text={"Chat"}
            fontColor={"white"}
            fontSize={14}
            height={20}
            width={60}
          />
        </button>
      </form>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm setShowModal={setShowModal}/>
        </Modal>
      )}
      <div className={styles.errorsContainer}>
        {errors.map((error, ind) => (
          <div className={styles.error} key={ind}>
            {error}
          </div>
        ))}
      </div>
    </div>
  );
}
