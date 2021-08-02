import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';

import { updateMeeting, getMeeting } from '../../../store/meeting';
import Button from '../../button';
import styles from './MeetingEditForm.module.css'

export default function MeetingEditForm() {
  const { id } = useParams();

  const user = useSelector((state) => state.session.user)
  const user_id = user?.id
  const meeting = useSelector((state) => state.meetings)[id]
  // const meeting_id = meeting?.id
  const host_id = meeting?.host_id

  const [errors, setErrors] = useState([]);
  const [name, setName] = useState(meeting?.name);
  const [description, setDescription] = useState(meeting?.description);
  const [queue_limit, setQueueLimit] = useState(meeting?.queue_limit);


  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([])
    if (user_id === host_id) {
      const response = await dispatch(updateMeeting(id, host_id, name, description, queue_limit))
      if (response?.length) {
        setErrors(response)
        return
      } else {
        return history.push(`/meetings/${meeting?.id}`)
      }
    } else {
      setErrors(["Room owner does not match."])
    }
  }

  const updateMeetingName = (e) => {
    setName(e.target.value);
  }

  const updateDescription = (e) => {
    setDescription(e.target.value);
  }

  const updateQueueLimit = (e) => {
    setQueueLimit(e.target.value);
  }

  useEffect(() => {
    dispatch(getMeeting(id))
  },[dispatch, id])


  return (
    <div className={styles.formContainer}>
      <form className={styles.form} method="patch" onSubmit={handleSubmit}>
        <input name="host_id" type="hidden" value={meeting?.host_id}></input>
        <div>
          <input
            className={styles.inputField}
            name="name"
            type="text"
            minLength="2"
            maxLength="64"
            placeholder="Meeting Title"
            onChange={updateMeetingName}
            value={name}
          ></input>
        </div>
        <div>
          <input
            className={styles.inputField}
            name="description"
            type="text"
            minLength="1"
            maxLength="1000"
            placeholder="Description"
            onChange={updateDescription}
            value={description}
            ></input>
        </div>
        <div>
          <input
            className={styles.inputField}
            name="queue_limit"
            type="number"
            min="1"
            max="25"
            placeholder="Queue Limit"
            onChange={updateQueueLimit}
            value={queue_limit}
          ></input>
        </div>
        <div className={styles.errorsContainer}>
          {errors?.map((error, ind) => (
            <div className={styles.error} key={ind}>
              {error}
            </div>
          ))}
        </div>
        <button type="submit">
          <Button
            action={handleSubmit}
            borderRadius={10}
            btnColor={"gold"}
            text={"Update"}
            fontColor={"black"}
            fontSize={16}
          />
        </button>
      </form>
    </div>
  )
}
