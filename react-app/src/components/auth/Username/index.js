import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../../store/session";
import styles from './Username.module.css'

export default function Username() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)
  const username = user?.username ? `Logged in as ${user?.username}` : null;


  useEffect(() => {
    dispatch(authenticate())
  },[dispatch, username])

  return (
    <div className={styles.user}>{username}</div>
  )
}
