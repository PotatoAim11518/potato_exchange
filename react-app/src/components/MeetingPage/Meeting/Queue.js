import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import socket from "../socket";

import { getMeetingQueue, joinQueue, kickFromQueue } from "../../../store/queue";
import Button from "../../button";
import Patron from "./Patron";
import { Modal } from "../../../context/Modal";
import LeaveConfirm from "./LeaveConfirm";

import styles from "./Queue.module.css";

export default function Queue({ user_id, meeting }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false)
  const queue = useSelector((state) => Object.values(state.queue));
  const meetingQueue = queue.filter(
    (patron) => patron.meeting_id === meeting.id
  );

  const inQueue =
    queue.filter((patron) => patron.user_id === user_id).length > 0;

  const nextGuestText = meetingQueue.length ? "Next Guest" : "No Guests";
  const nextGuestColor = meetingQueue.length ? "black" : "slategrey";

  const handleJoinQueue = () => {
    if (queue?.length < meeting?.queue_limit)
      dispatch(joinQueue(user_id, meeting.id));
  };

  const handleLeaveQueue = () => {
    setShowModal(true)
  };

  const handleNextGuest = () => {
    if (meetingQueue.length) {
      dispatch(kickFromQueue(meeting?.id, meetingQueue[0].user_id));
    }
  };

  useEffect(() => {
    dispatch(getMeetingQueue(meeting?.id));
  }, [dispatch, meeting?.id, inQueue]);

  return (
    <div className={styles.queueWrapper}>
      {showModal &&
      <Modal onClose={() => setShowModal(false)}>
        <LeaveConfirm meeting={meeting} setShowModal={setShowModal}/>
      </Modal>
      }
      <div className={styles.waitingText}>
        <em>
          Queue {queue?.length}/{meeting?.queue_limit}
        </em>
      </div>
      <div className={styles.queueContainer}>
        <div className={styles.queueList}>
          {meetingQueue?.map((patron, index) => (
            <div className={styles.patronRow}>
              <p className={styles.patronIndex}>
                {index + 1}:
              </p>
              <Patron key={index} patron={patron} meeting={meeting} />
            </div>
          ))}
        </div>

        {user_id === meeting?.host_id && (
          <div className={styles.hostButtons}>
            <Button
              action={handleNextGuest}
              paddingY={20}
              paddingX={40}
              width={110}
              height={30}
              borderRadius={8}
              btnColor={nextGuestColor}
              text={nextGuestText}
              fontColor={"white"}
              fontSize={18}
            />
          </div>
        )}
        {user_id !== meeting?.host_id && (
          <div className={styles.hostButtons}>
            {inQueue ? (
              <Button
                action={handleLeaveQueue}
                paddingY={20}
                paddingX={40}
                width={110}
                height={30}
                borderRadius={8}
                btnColor={"slategray"}
                text={"Leave"}
                fontColor={"white"}
                fontSize={18}
              />
            ) : meetingQueue.length === meeting?.queue_limit ? (
              <Button
                paddingY={20}
                paddingX={40}
                width={110}
                height={30}
                borderRadius={8}
                btnColor={"slategray"}
                text={"Full"}
                fontColor={"white"}
                fontSize={18}
              />
            ) : meeting?.queue_limit > 0 &&
              meetingQueue.length < meeting?.queue_limit ? (
              <Button
                action={handleJoinQueue}
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
            ) : (
              <Button
                paddingY={20}
                paddingX={40}
                width={110}
                height={30}
                borderRadius={8}
                btnColor={"slategray"}
                text={"Locked"}
                fontColor={"white"}
                fontSize={18}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
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
