import React from 'react';
import styles from './Tile.module.css';

export default function Tile({ label, action, text, rotation }) {

  return (
    <div className={styles.tile} onClick={action}>
      <h1 className={styles.tileLabel}>{label}</h1>
      <p className={styles.tileText}>{text}</p>
    </div>
  )
}
