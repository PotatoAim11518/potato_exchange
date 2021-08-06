import React from 'react';
import { useSelector } from 'react-redux';
import styles from './ChatMessage.module.css';

export default function ChatMessage({message}) {
  const timestamp = new Date(message['created_at']).toLocaleTimeString('en-US', { timeZone: 'PST', hour: '2-digit', minute: '2-digit' })

  const user = useSelector((state) => state.session.user)
  const user_id = user?.id
  const host_id = message?.meeting?.host_id
  const message_user_id = message?.user_id

  const usernameColor = (message_user_id, host_id, user_id) => {
    if (message_user_id === host_id) return styles.usernameHost
    else if (message_user_id === user_id) return styles.usernameCurrentUser
    else return styles.username
  }

  return (
    <div className={styles.chatRowContainer}>
      <p className={styles.chatRow}>
        <span className={usernameColor(message_user_id, host_id, user_id)}>
          {message?.user?.username}
        </span>
        {" "}
        <span className={styles.timestamp}>
          ({timestamp})
        </span>
        {" "}: {message?.message}</p>
    </div>
  )
}
