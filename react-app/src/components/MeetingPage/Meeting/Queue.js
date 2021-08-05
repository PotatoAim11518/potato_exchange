import React from "react";

import socket from "../socket";

import styles from "./Queue.module.css";

export default function Queue({ user_id, meeting }) {
  return (
    <div className={styles.queueContainer}>
      <p className={styles.waitingText}>
        <em>Queue #/{meeting?.queue_limit}</em>
      </p>
    </div>
  );
}
