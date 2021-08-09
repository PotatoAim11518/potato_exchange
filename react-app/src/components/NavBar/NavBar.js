import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoginSignup from '../auth';
import Username from '../auth/Username';
import styles from './NavBar.module.css';

const NavBar = () => {
  const history = useHistory();
  const user = useSelector((state) => state.session.user)
  const user_id = user?.id
  const dispatch = useDispatch();

  const goHome = () => {
    history.push('/')
  }

  useEffect(()=> {
  },[dispatch, user_id])

  return (
    <div className={styles.navContainer}>
      <div className={styles.potato} onClick={goHome}></div>
      <Username />
      <div className={styles.userAuth}>
        <LoginSignup/>
      </div>
    </div>
  );
}

export default NavBar;
