import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoginSignup from '../auth';
import Button from '../button';
import styles from './NavBar.module.css';

const NavBar = () => {
  const history = useHistory();
  const user = useSelector((state) => state.session.user)
  const username = user?.username ? `Logged in as ${user?.username}` : null;

  const goHome = () => {
    history.push('/')
  }

  return (
    <div className={styles.navContainer}>
      <div className={styles.user}>{username}</div>
      <div className={styles.potato} onClick={goHome}></div>
      <div className={styles.userAuth}>
        <LoginSignup/>
      </div>
    </div>
  );
}

export default NavBar;
