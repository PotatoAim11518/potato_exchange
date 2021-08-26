import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import socket from "../MeetingPage/socket";
import { getMeetings, getMeeting } from "../../store/meeting";
import { allMeetingQueues, trimQueue } from "../../store/queue";
import Card from "./Card";
import HostingCard from "./HostingCard";
import BackButton from "../backbutton";
import styles from "./Meetings.module.css";

export default function Meetings() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const user_id = user?.id;
  const meetings = useSelector((state) => Object.values(state.meetings));
  const queues = useSelector((state) => Object.values(state.queue));

  const hosting =
    meetings.filter((meeting) => {
      return meeting.host_id === user_id;
    }).length > 0;

  useEffect(() => {
    dispatch(getMeetings());
    dispatch(allMeetingQueues());
    socket.on("trim_queue", (queue) => {
      let queue_json = JSON.parse(queue);
      dispatch(trimQueue(queue_json));
    });
    socket.on("update_meeting", (meeting_id) => {
      dispatch(getMeeting(meeting_id));
    });
  }, [dispatch]);

  return (
    <div className={styles.pageContainer}>
      <BackButton />
      <div className={styles.meetingContainer}>
        {meetings?.map((meeting) => (
          <Card key={meeting?.id} meeting={meeting} queues={queues} />
        ))}
        {!hosting && <HostingCard />}
      </div>
    </div>
  );
}
