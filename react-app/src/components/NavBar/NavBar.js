import React from 'react';
import { useHistory } from 'react-router-dom';
import LoginSignup from '../auth';
import Button from '../button';
import styles from './NavBar.module.css';

const NavBar = () => {
  const history = useHistory();

  const goHome = () => {
    history.push('/')
  }

  return (
    <div className={styles.navContainer}>
      <div className={styles.nothing}> </div>
      <div className={styles.potato} onClick={goHome}></div>
      <div className={styles.userAuth}>
        <LoginSignup/>
      </div>
    </div>
  );
}

export default NavBar;
