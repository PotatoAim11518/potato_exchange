import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Tile.module.css';

export default function Tile({ label, destination, text, rotation }) {
  const history = useHistory();

  const handleClick = () => {
    history.push(`${destination}`)
  }

  return (
    <div className={styles.tile} onClick={handleClick}>
      <h1 className={styles.tileLabel}>{label}</h1>
      <p className={styles.tileText}>{text}</p>
    </div>
  )
}
