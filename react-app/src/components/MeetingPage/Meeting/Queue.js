import React from "react";

import socket from "../socket";

import Button from "../../button";
import styles from "./Queue.module.css";

export default function Queue({ user_id, meeting }) {
  return (
    <div className={styles.queueWrapper}>
      <div className={styles.waitingText}>
        <em>Queue #/{meeting?.queue_limit}</em>
      </div>
      <div className={styles.queueContainer}>
        <div className={styles.queueList}>
          <div># Username</div>
          <div># Username</div>
          <div># Username</div>
          <div># Username</div>
          <div># Username</div>
          <div># Username</div>
          <div># Username</div>
          <div># Username</div>
          <div># Username</div>
          <div># Username</div>
          <div># Username</div>
          <div># Username</div>
          <div># Username</div>
          <div># Username</div>
          <div># Username</div>
          <div># Username</div>
          <div># Username</div>
          <div># Username</div>
          <div># Username</div>
          <div># Username</div>
          <div># Username</div>
          <div># Username</div>
          <div># Username</div>
          <div># Username</div>
          <div># Username</div>
        </div>

        {user_id === meeting?.host_id && (
          <div className={styles.hostButtons}>
            <Button
              action={""}
              paddingY={20}
              paddingX={40}
              width={110}
              height={30}
              borderRadius={8}
              btnColor={"black"}
              text={"Next Guest"}
              fontColor={"white"}
              fontSize={18}
            />
            <Button
              action={""}
              paddingY={20}
              paddingX={40}
              width={110}
              height={30}
              borderRadius={8}
              btnColor={"darkred"}
              text={"Kick"}
              fontColor={"white"}
              fontSize={18}
            />
          </div>
        )}
        {user_id !== meeting?.host_id && (
          <div className={styles.hostButtons}>
            <Button
              action={""}
              paddingY={20}
              paddingX={40}
              width={110}
              height={30}
              borderRadius={8}
              btnColor={"teal"}
              text={"Join"}
              fontColor={"white"}
              fontSize={18}
            />
        </div>)}
      </div>
    </div>
  );
}

/*
Queueing requirements:
- Button to toggle join/leave queue
- Joining sends websocket request to backend with userID and meetingID,
  - backend socket appends adds an entry row into the queues table
  - successful entry creation emits that data back out to the room's participants
  - render the queue in order by creation date
- Host can see "Kick" button that emits a socket message that sends the current user up's
id to:
  - destroy's the user's queue db entry
  - emits a queue dispatch rerender
- Host can see "Next User" button that emits a socket message that sends the next user up's
id to the socket server:
  - socket server hears this and sends out that user id
  - user with that id hears the message and has a state rendered to show them "stuff"

*/
