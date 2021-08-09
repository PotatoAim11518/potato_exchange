import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../../store/session";
import styles from './Username.module.css'

export default function Username() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)
  const user_id = user?.id
  const username = user?.username ? `Logged in as ${user?.username}` : `Welcome, stranger!`;


  useEffect(() => {
  },[dispatch, username, user_id])

  return (
    <div className={styles.user}>{username}</div>
  )
}
