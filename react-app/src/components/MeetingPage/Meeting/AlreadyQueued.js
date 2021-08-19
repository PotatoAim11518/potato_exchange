import React from "react";

import Button from "../../button";
import styles from "./AlreadyQueued.module.css";

export default function AlreadyQueued({ setShowQueuedModal }) {

  return (
    <div className={styles.formContainer}>
      <div>
        <h2 className={styles.joinHeader}>Sorry! You can't join another meeting.</h2>
        <p className={styles.joinText}>You're already queued to another meeting. You can only be queued to one meeting at a time. Please leave the other meeting and try again.
        </p>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          action={() => setShowQueuedModal(false)}
          borderRadius={8}
          btnColor={"gold"}
          text={"Okay"}
          fontColor={"black"}
          fontSize={16}
          width={80}
        />
      </div>
    </div>
  );
}
