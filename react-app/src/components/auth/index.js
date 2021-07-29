import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import Button from '../button';


const LoginSignup = () => {
  const [showModal, setShowModal] = useState(false)
  const []

  const signup = () => {
    setShowModal(true)
  }

  return (
    <>
      <Button action={signup}
      // paddingY={}
      // paddingX={}
      // width={}
      // height={}
      // borderRadius={}
      // btnColor={}
      text={"Register"}
      // fontColor={}
      // fontSize={}
      />
      <Button action={login}
      // paddingY={}
      // paddingX={}
      // width={}
      // height={}
      // borderRadius={}
      // btnColor={}
      text={"Login"}
      // fontColor={}
      // fontSize={}
      />
      {showModal && (
        <Modal onClose={setShowModal(false)}>
          <SignUpForm />
        </Modal>
        )
      }
    </>
  )
}
