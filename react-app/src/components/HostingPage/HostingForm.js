import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { hostMeeting } from '../../store/meeting';
import Button from '../button';
import styles from './HostingForm.module.css'

export default function HostingForm() {
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [queue_limit, setQueueLimit] = useState("");

  const user = useSelector((state) => state.session.user)
  const host_id = user?.id

  const history = useHistory();
  const dispatch = useDispatch();



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (host_id) {
      const response = await dispatch(hostMeeting(host_id, name, description, queue_limit))
      if (response) {
        setErrors(response)
      }
    } else {
      setErrors(["No user logged in."])
    }
    // history.push(`/meetings/${response['id']}`)
  }

  const updateMeetingName = (e) => {
    setName(e.target.value)
  }

  const updateDescription = (e) => {
    setDescription(e.target.value)
  }

  const updateQueueLimit = (e) => {
    setQueueLimit(e.target.value)
  }

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} method='post' onSubmit={handleSubmit}>
        <input name="host_id" type="hidden" value={host_id}></input>
        <div>
          <input
            className={styles.inputField}
            name='name'
            type='text'
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
            name='description'
            type='text'
            minLength="1"
            maxLength="1000"
            placeholder='Description'
            onChange={updateDescription}
            value={description}
            ></input>
        </div>
        <div>
          <input
            className={styles.inputField}
            name='queue_limit'
            type='number'
            min="1"
            max="25"
            placeholder='Queue Limit'
            onChange={updateQueueLimit}
            value={queue_limit}
          ></input>
        </div>
        <div className={styles.errorsContainer}>
          {errors.map((error, ind) => (
            <div className={styles.error} key={ind}>
              {error}
            </div>
          ))}
        </div>
        <button type="submit">Submit
          {/* <Button
            action={handleSubmit}
            borderRadius={10}
            btnColor={"gold"}
            text={"Host"}
            fontColor={"black"}
            fontSize={16}
          /> */}
        </button>
      </form>
    </div>
  )
}
