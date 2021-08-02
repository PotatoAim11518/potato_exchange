const LOAD_MEETING_MESSAGES = '/meeting/LOAD_MEETING_MESSAGES';
const SEND_MEETING_MESSAGE = '/meeting/SEND_MEETING_MESSAGE';
const MODERATE_MEETING_MESSAGE = '/meeting/MODERATE_MEETING_MESSAGE';
const DELETE_MEETING_MESSAGE = '/meeting/DELETE_MEETING_MESSAGE';

const load_chat = (messages) => ({
  type: LOAD_MEETING_MESSAGES,
  messages
})

const add_message = (message) => ({
  type: SEND_MEETING_MESSAGE,
  message
})

const mod_message = (message) => ({
  type: MODERATE_MEETING_MESSAGE,
  message
})

const delete_message = (message) => ({
  type: DELETE_MEETING_MESSAGE,
  message
})


export const getMeetingMessages = (meeting_id) => async (dispatch) => {
  const response = await fetch(`/api/meetings/${meeting_id}/messages`)

  if (response.ok) {
    const messages = await response.json()
    dispatch(load_chat(messages))
  } else if (response.status < 500) {
    const messages = await response.json()
    if (messages.errors) {
      return messages.errors;
    }
  } else {
    return ['Server error occurred. Please try again.']
  }
}

export const sendMessage = (meeting_id, message) => async (dispatch) => {
  const response = await fetch(`/api/meetings/${meeting_id}/send`, {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      message
    })

  })
  if (response.ok) {
    const data = await response.json()
    dispatch(add_message(data))
  } else if (response.status < 500) {
    const data = await response.json()
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['Server error occurred. Please try again.']
  }
}

export const modMessage = (message_id) => async (dispatch) => {
  const response = await fetch(`/api/messages/${message_id}`, {
    method: "PATCH",
    headers: {
      'Content-type': 'application/json'
    }
  })
  if (response.ok) {
    const data = await response.json()
    dispatch(mod_message(data))
  } else if (response.status < 500) {
    const data = await response.json()
    if (data.errors) {
    }
    return data.errors;
  } else {
    return ['Server error occurred. Please try again.']
  }
}

export const deleteMessage = (message_id) => async (dispatch) => {
  const response = await fetch(`/api/messages/${message_id}`, {
    method: "DELETE",
    body: JSON.stringify({message_id})
  })

  if (response.ok) {
    const data = await response.json()
    dispatch(delete_message(data))
  } else if (response.status < 500) {
    const data = await response.json()
    if (data.errors) {
    }
    return data.errors;
  } else {
    return ['Server error occurred. Please try again.']
  }
}

const initial_state = {}

export default function messageReducer(state=initial_state, action) {
  switch (action.type) {
    case LOAD_MEETING_MESSAGES:
      const meetingMessages = {}
      action.messages['meeting_messages'].forEach((message) => {
        meetingMessages[message['meeting_id']]['id'] = message
      })
      return {...state, ...meetingMessages}
    case SEND_MEETING_MESSAGE:
      return {...state, [action.message['meeting_id'][action.message['id']]]: action.message}
    case MODERATE_MEETING_MESSAGE:
      return {...state, [action.message['meeting_id'][action.message['id']]]: action.message}
    case DELETE_MEETING_MESSAGE:
      const newState = {...state}
      delete newState[action.message['meeting_id'][action.message['id']]]
      return newState
    default:
      return state
  }
}
