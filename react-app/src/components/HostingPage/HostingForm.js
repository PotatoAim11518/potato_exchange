import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { hostMeeting } from '../../store/meeting';
import Button from '../button';
import styles from './HostingForm.module.css'

export default function HostingForm() {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user)
  const host_id = user?.id

  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [queue_limit, setQueueLimit] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      host_id,
      name,
      description,
      queue_limit
    }
    const response = await dispatch(hostMeeting(payload))
    if (response) {
      setErrors(response)
      history.push(`/meetings/${response['id']}`)
    } else {
      errors.push("Meeting could not be created.")
    }
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
      <form className={styles.form} onSubmit={handleSubmit}>
        <input name="host" type="hidden" value={host_id}/>
        <div>
          <input
            className={styles.inputField}
            name='name'
            type='text'
            minlength="2"
            maxlength="64"
            placeholder='Meeting Title'
            onChange={updateMeetingName}
            value={name}
          />
        </div>
        <div>
          <input
            className={styles.inputField}
            name='description'
            type='text'
            minlength="1"
            maxlength="1000"
            placeholder='Description'
            onChange={updateDescription}
            value={description}
            />
        </div>
        <div>
          <input
            className={styles.inputField}
            name='queue limit'
            type='number'
            min="1"
            max="25"
            placeholder='Queue Limit'
            onChange={updateQueueLimit}
            value={queue_limit}
          />
        </div>
        <button type="submit">
          <Button
          action={handleSubmit}
          borderRadius={10}
          btnColor={"gold"}
          text={"Host"}
          fontColor={"black"}
          fontSize={16}
          />
        </button>
        <div className={styles.errorsContainer}>
          {errors.map((error, ind) => (
            <div className={styles.error} key={ind}>
              {error}
            </div>
          ))}
        </div>
      </form>
    </div>
  )
}
