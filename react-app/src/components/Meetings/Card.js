import React from 'react';
import styles from './Card.module.css';

export default function Card({ meeting }) {

  return (
    <div className={styles.card}>
      <h1 className={styles.titleText}>Title</h1>
      <h2 className={styles.createdDate}>creation date day, mm/dd/yyyy, HH:MM</h2>
      <div className={styles.avatar}>Profile Icon Placeholder</div>
      <p className={styles.description}>Description Description Description Description Description</p>
      <div className={styles.waiting}>
        <p className={styles.waitingText}>Waiting: #/#</p>
      </div>
    </div>
  )
}
