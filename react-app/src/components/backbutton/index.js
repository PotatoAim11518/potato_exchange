import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from "../button";
import styles from './backbutton.module.css'

export default function BackButton() {

  const history = useHistory();

  return (
    <div className={styles.backButton}>
      <Button
        text={<i className="fas fa-angle-left"></i>}
        fontColor={"white"}
        paddingY={30}
        paddingX={30}
        action={() => history.goBack()}
        width={30}
        fontSize={30}
        btnColor={"teal"}
        borderRadius={51}
      />
    </div>
  );
}
