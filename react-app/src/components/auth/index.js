import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import LogoutButton from "./LogoutButton";
import Button from "../button";
import styles from "./ModalForms.module.css";

function LoginSignup() {
  const [showModal, setShowModal] = useState(false);
  const [signup, setSignup] = useState(false);

  const user = useSelector((state) => state.session.user);

  const goSignup = () => {
    setShowModal(true);
    setSignup(true);
  };

  const goLogin = () => {
    setShowModal(true);
    setSignup(false);
  };

  return (
    <>
      {!user && (
        <div className={styles.authButtons}>
          <Button
            action={goLogin}
            // paddingY={}
            // paddingX={}
            width={100}
            // height={40}
            borderRadius={10}
            btnColor={"salmon"}
            text={"Login"}
            // fontColor={}
            fontSize={16}
          />
          <Button
            action={goSignup}
            // paddingY={10}
            // paddingX={10}
            width={100}
            // height={10}
            borderRadius={10}
            btnColor={"teal"}
            text={"Register"}
            // fontColor={}
            fontSize={16}
          />
          {showModal && signup && (
            <Modal onClose={() => setShowModal(false)}>
              <SignUpForm />
            </Modal>
          )}
          {showModal && !signup && (
            <Modal onClose={() => setShowModal(false)}>
              <LoginForm setShowModal={setShowModal}/>
            </Modal>
          )}
        </div>
      )}
      {user &&
      <div className={styles.authButtons}>
        <LogoutButton onClick={() => setShowModal(false)}/>
      </div>}
    </>
  );
}

export default LoginSignup;
