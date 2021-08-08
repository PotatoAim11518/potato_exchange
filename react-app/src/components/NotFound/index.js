import React from 'react';

import BackButton from '../backbutton';
import styles from './NotFound.module.css';

export default function NotFound() {

  return (
    <div className={styles.pageWrapper}>
      <BackButton/>
      <div className={styles.hole}></div>
      <h1 className={styles.text}>Oops! Couldn't find anything here.</h1>
    </div>
  )
}
