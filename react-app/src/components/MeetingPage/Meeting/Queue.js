import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaLock, FaLockOpen } from "react-icons/fa";

import socket from "../socket";

import {
  getMeetingQueue,
  // joinQueue,
  // kickFromQueue,
} from "../../../store/queue";
import Button from "../../button";
import Patron from "./Patron";
import { Modal } from "../../../context/Modal";
import NextConfirm from "./NextConfirm";
import LoginForm from "../../auth/LoginForm";
import LeaveConfirm from "./LeaveConfirm";
import AlreadyQueued from "./AlreadyQueued";

import styles from "./Queue.module.css";

export default function Queue({ user_id, meeting }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showNextGuestModal, setShowNextGuestModal] = useState(false);
  const [showQueuedModal, setShowQueuedModal] = useState(false);
  const user = useSelector((state) => state.session.user);
  const current_user_id = user?.id;
  const queue = useSelector((state) => Object.values(state.queue));
  const meetingQueue = queue.filter(
    (patron) => patron.meeting_id === meeting?.id
  );

  const inQueue =
    queue.filter((patron) => patron.user_id === user_id).length > 0;

  const nextGuestText = meetingQueue.length ? "Next Guest" : "No Guests";
  const nextGuestColor = meetingQueue.length ? "black" : "slategrey";

  const handleJoinQueue = () => {
    if (user) {
      if (queue?.length < meeting?.queue_limit)
        // dispatch(joinQueue(user_id, meeting.id));
        socket.emit("join_request", user_id, meeting?.id);
    } else {
      setShowModal(true);
    }
  };

  const handleLeaveQueue = () => {
    setShowLeaveModal(true);
  };

  const handleNextGuest = () => {
    if (meetingQueue.length) {
      // dispatch(kickFromQueue(meeting?.id, meetingQueue[0].user_id));
      setShowNextGuestModal(true);
    }
  };

  useEffect(() => {
    socket.on("update_queue", (meeting_id) => {
      if (meeting_id === meeting?.id) {
        dispatch(getMeetingQueue(meeting?.id));
      }
    });
    socket.on("already_queued", (joining_user_id, meeting_id, message) => {
      if (joining_user_id === current_user_id && meeting_id === meeting?.id) {
        setShowQueuedModal(true);
      }
    });
    dispatch(getMeetingQueue(meeting?.id));
  }, [dispatch, meeting?.id, current_user_id]);

  return (
    <div className={styles.queueWrapper}>
      {showNextGuestModal && (
        <Modal onClose={() => setShowNextGuestModal(false)}>
          <NextConfirm
            nextGuest={meetingQueue[0]}
            meeting={meeting}
            setShowNextGuestModal={setShowNextGuestModal}
          />
        </Modal>
      )}
      {showQueuedModal && (
        <Modal onClose={() => setShowQueuedModal(false)}>
          <AlreadyQueued setShowQueuedModal={setShowQueuedModal} />
        </Modal>
      )}
      {showLeaveModal && (
        <Modal onClose={() => setShowLeaveModal(false)}>
          <LeaveConfirm
            meeting={meeting}
            setShowLeaveModal={setShowLeaveModal}
          />
        </Modal>
      )}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm setShowModal={() => setShowModal(false)} />
        </Modal>
      )}
      <div className={styles.waitingText}>
        {meeting?.queue_limit > 0 ? (
          <em>
            <FaLockOpen /> Queue {meetingQueue?.length}/{meeting?.queue_limit}
          </em>
        ) : (
          <em>
            <FaLock /> Queue Locked
          </em>
        )}
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
                text={
                  <>
                    <i className="fas fa-lock"></i>
                    <span> Locked</span>
                  </>
                }
                fontColor={"white"}
                fontSize={18}
              />
            )}
          </div>
        )}
      </div>
      {/* <div className={styles.queueContainer}> */}
      <div className={styles.queueList}>
        {meetingQueue?.map((patron, index) => (
          <Patron key={index} index={index} patron={patron} meeting={meeting} />
        ))}
      </div>
      {/* </div> */}
    </div>
  );
}
