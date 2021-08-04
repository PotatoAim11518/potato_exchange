import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import socket from "./socket";

import { getMeetingMessages } from "../../store/message";

import ChatMessage from "./ChatMessage";
import Button from "../button";
import { Modal } from "../../context/Modal";
import LoginForm from "../auth/LoginForm";

import styles from "./Chatroom.module.css";

export default function Chatroom() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  // const [newMessages, setNewMessages] = useState([]);

  const user = useSelector((state) => state.session.user);
  const user_id = user?.["id"];
  const meeting_messages = useSelector((state) =>
    Object.values(state.meeting_messages)
  );
  const chatroom_messages = meeting_messages.filter(
    (meeting) => meeting["meeting_id"] === +id
  );

  const updateMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleChat = async (e) => {
    e.preventDefault();
    if (user_id) {
      socket.emit("client_message", user_id, id, message);
      setMessage("")
    } else {
      setShowModal(true);
    }
  };

  useEffect(() => {
    dispatch(getMeetingMessages(id)); // this is chat history
    socket.on("connect", () => {
      console.log("Connection Status: ", socket.connected);
    });
    socket.on("incoming_errors", async (errors) => {
      setErrors(errors);
    });
    socket.on("incoming_message", async (message) => {
      setErrors([]);
      // setNewMessages([...newMessages, JSON.parse(message)]);
      await dispatch(getMeetingMessages(id));
    });
  }, [dispatch, id]);


  return (
    <div className={styles.chatroom}>
      <div className={styles.chatMessages}>
        {/* {newMessages && newMessages.map((message) =>
          <ChatMessage key={message['id']} message={message}/>
        ).reverse()} */}
        {chatroom_messages.map((message) =>
          <ChatMessage key={message['id']} message={message}/>
        ).reverse()}
      </div>
      <form className={styles.form} method="post" onSubmit={handleChat}>
        <input name="user_id" type="hidden" value={user_id}></input>
        <input name="meeting_id" type="hidden" value={id}></input>
        <input
          className={styles.inputField}
          name="chatbox"
          type="text"
          placeholder="Send a message"
          value={message}
          onChange={updateMessage}
          autocomplete="off"
        ></input>

        <button type="submit">
          <Button
            action={handleChat}
            borderRadius={5}
            btnColor={"teal"}
            text={"Chat"}
            fontColor={"white"}
            fontSize={14}
            height={20}
            width={60}
          />
        </button>
      </form>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm setShowModal={setShowModal} />
        </Modal>
      )}
      <div className={styles.errorsContainer}>
        {errors.map((error, ind) => (
          <div className={styles.error} key={ind}>
            {error}
          </div>
        ))}
      </div>
    </div>
  );
}
