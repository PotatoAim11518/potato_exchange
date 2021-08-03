import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { getMeetingMessages, sendMessage } from '../../store/message';
import ChatMessage from './ChatMessage';
import Button from '../button';
import styles from './Chatroom.module.css';

export default function Chatroom() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");

  const user_id = useSelector((state) => state.session.user)['id']
  const meeting_messages = useSelector((state) => Object.values(state.meeting_messages))
  const chatroom_messages = meeting_messages.filter((meeting) => meeting['meeting_id'] === +id)

  const handleChat = (e) => {
    e.preventDefault();
    dispatch(sendMessage(user_id, id, message))
    setMessage("")
  }

  const updateMessage = (e) => {
    setMessage(e.target.value)
  }

  useEffect(()=> {
    dispatch(getMeetingMessages(id))
  },[dispatch, id])

  return (
    <div className={styles.chatroom}>
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
          placeholder="Enter a message for the FBI"
          value={message}
          onChange={updateMessage}
        ></input>

        <button type="submit">
          <Button
            action={handleChat}
            borderRadius={10}
            btnColor={"gold"}
            text={"Chat"}
            fontColor={"black"}
            fontSize={20}
            height={76}
            width={60}
          />
        </button>
      </form>
    </div>
  );
}
