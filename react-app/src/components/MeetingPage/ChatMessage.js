import React from 'react';
import styles from './ChatMessage.module.css';

export default function ChatMessage({message}) {
  const timestamp = new Date(message['created_at']).toLocaleTimeString('en-US', { timeZone: 'PST', hour: '2-digit', minute: '2-digit' })

  return (
    <div className={styles.chatRowContainer}>
      <p className={styles.chatRow}>
        <span className={styles.username}>
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
