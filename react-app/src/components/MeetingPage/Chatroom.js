import React, { useState } from 'react';
import Button from '../button';
import styles from './Chatroom.module.css';

export default function Chatroom({ meeting }) {
  const [message, setMessage] = useState("");

  const updateMessage = (e) => {
    setMessage(e.target.value)
  }

  return (
    <div className={styles.chatroom}>
      <div className={styles.chatMessages}>
        <ul>
          <li>
            Messages
          </li>
          <li>
            Messages
          </li>
          <li>
            Messages
          </li>
          <li>
            Messages
          </li>
          <li>
            Messages
          </li>
          <li>
            Messages
          </li>
          <li>
            Messages
          </li>
        </ul>
      </div>
      <form className={styles.form} onSubmit={()=>{}}>

        <input
          className={styles.inputField}
          name="chatbox"
          type="text"
          placeholder="Enter a message for the FBI"
          value={message}
          onChange={updateMessage}
        />

        <button type="submit">
          <Button
            // action={}
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
