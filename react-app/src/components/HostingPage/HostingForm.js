import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

export default function HostingForm() {
  const history = useHistory();

  const user = useSelector((state) => state.session.user)
  const host_id = user?.id

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [queueLimit, setQueueLimit] = useState("")

  const handleSubmit = () => {
    return
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
    <div>
      <form onSubmit={handleSubmit}>
        <input name="host" type="hidden" value={host_id}/>
        <div>
          <input
            name='name'
            type='text'
            placeholder='Meeting Title'
            onChange={updateMeetingName}
            value={name}
          />
        </div>
        <div>
          <input
            name='description'
            type='text'
            placeholder='Description'
            onChange={updateDescription}
            value={description}
          />
        </div>
        <div>
          <input
            name='queue limit'
            type='number'
            placeholder='Queue Limit'
            onChange={updateQueueLimit}
            value={queueLimit}
          />
        </div>

      </form>
    </div>
  )
}
