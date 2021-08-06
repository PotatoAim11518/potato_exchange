const LOAD_QUEUES = 'queues/LOAD_QUEUES'
const UPDATE_QUEUE = 'queues/UPDATE_QUEUE'
const REMOVE_QUEUE = 'queues/REMOVE_QUEUE'

// Action Creators
const load_queues = (queues) => ({
  type: LOAD_QUEUES,
  queues
})

const update = (queue) => ({
  type: UPDATE_QUEUE,
  queue
})

const remove = (queue) => ({
  type: REMOVE_QUEUE,
  queue
})

// Thunks
export const allMeetingQueues = () => async (dispatch) => {
  const response = await fetch('/api/queues');

  if (response.ok) {
    const queues = await response.json();
    dispatch(load_queues(queues))
  } else if (response.status < 500) {
    const queues = await response.json();
    if (queues.errors) {
      return queues.errors
    }
  } else {
    return ['Server error occurred.']
  }
}

export const getMeetingQueue = (meeting_id) => async (dispatch) => {
  const response = await fetch(`/api/meetings/${meeting_id}/queue`);
  if (response.ok) {
    const queues = await response.json()
    dispatch(load_queues(queues))
  } else if (response.status < 500) {
    const queues = await response.json()
    if (queues.errors) {
      return queues.errors
    }
  } else {
    return ['Server error occurred. Please try again.']
  }
}

export const joinQueue = (meeting_id) => async (dispatch) => {
  const response = await fetch(`/api/meetings/${meeting_id}/join`)
  if (response.ok) {
    const queue = await response.json();
    dispatch(update(queue))
  } else if (response.status < 500) {
    const queue = await response.json();
    if (queue.errors) {
      return queue.errors
    }
  } else {
    return ['Server error occurred. Please try again.']
  }
}

export const leaveQueue = (meeting_id) => async (dispatch) => {
  const response = await fetch(`/api/meetings/${meeting_id}/leave`)
  if (response.ok) {
    const queue = await response.json();
    dispatch(update(queue))
  } else if (response.status < 500) {
    const queue = await response.json();
    if (queue.errors) {
      return queue.errors
    }
  } else {
    return ['Server error occurred. Please try again.']
  }
}

export const kickFromQueue = (meeting_id, user_id) => async (dispatch) => {
  const response = await fetch(`/api/meetings/${meeting_id}/kick/${user_id}`)
  if (response.ok) {
    const queue = await response.json();
    dispatch(update(queue))
  } else if (response.status < 500) {
    const queue = await response.json();
    if (queue.errors) {
      return queue.errors
    }
  } else {
    return ['Server error occurred. Please try again.']
  }
}


// Reducer
const initialState = {}
let newState = {}

const queueReducer = (state=initialState, action) => {
  switch(action.type) {
    case LOAD_QUEUES:
      action.queues['queues'].forEach((queue) =>
        newState[queue['id']] = queue
      )
      return newState
    case UPDATE_QUEUE:
      return {...state, [action.queue['id']]: action.queue}
    case REMOVE_QUEUE:
      newState = {...state}
      delete newState[action.queue['id']]
      return newState
    default:
      return state
  }
}

export default queueReducer;
