import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Patron.module.css'


export default function Patron({patron}) {
  const user = useSelector((state) => state.session.user)
  const user_id = user?.id
  const userColor = patron.user.id === user_id ? styles.currentUser : styles.otherUser

  return (
    <span className={userColor}>
      {patron.user.username}
    </span>
  )
}
