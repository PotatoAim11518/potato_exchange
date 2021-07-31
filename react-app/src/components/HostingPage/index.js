import React from 'react';
import { useSelector } from 'react-redux';
import HostingForm from './HostingForm';

import styles from './HostingForm.module.css'

export default function HostingPage() {

  return (
    <div className={styles.pageContainer}>
      <HostingForm/>
    </div>
  )
}
