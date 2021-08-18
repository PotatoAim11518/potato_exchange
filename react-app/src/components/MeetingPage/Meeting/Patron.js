import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../../context/Modal";
import KickConfirm from "./KickConfirm";
import Button from "../../button";
import styles from "./Patron.module.css";

export default function Patron({ index, patron, meeting }) {
  const user = useSelector((state) => state.session.user);
  const user_id = user?.id;
  const userColor =
    patron.user.id === user_id ? styles.currentUser : styles.otherUser;

  const [showModal, setShowModal] = useState(false);

  const handleKickGuest = () => {
    setShowModal(true);
  };

  return (
    <div className={styles.patronRow}>
      <div className={styles.patronUser}>
        <p className={styles.patronIndex}>
          {index + 1}: <span className={userColor}>{patron.user.username}</span>
        </p>
      </div>
      {user_id === meeting?.host_id && (
        <Button
          action={handleKickGuest}
          paddingY={0}
          paddingX={0}
          width={40}
          height={20}
          borderRadius={2}
          btnColor={"darkred"}
          text={"Kick"}
          fontColor={"white"}
          fontSize={12}
        />
      )}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <KickConfirm
            patron={patron}
            meeting={meeting}
            setShowModal={setShowModal}
          />
        </Modal>
      )}
    </div>
  );
}
