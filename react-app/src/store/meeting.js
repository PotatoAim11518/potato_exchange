const LOAD_MEETINGS = 'meetings/LOAD_MEETINGS'
const HOST_MEETING = 'meetings/HOST_MEETING'
const UPDATE_MEETING = 'meetings/UPDATE_MEETING'
const DELETE_MEETING = 'meetings/DELETE_MEETING'

const load_all = (meetings) => ({
  type: LOAD_MEETINGS,
  meetings
})

// const load_one = (meeting) => ({
//   type: LOAD_MEETING,
//   meeting
// })

const host = (meeting) => ({
  type: HOST_MEETING,
  meeting
})

const update = (meeting) => ({
  type: UPDATE_MEETING,
  meeting
})

const remove = (meeting) => ({
  type: DELETE_MEETING,
  meeting
})


export const getMeetings = () => async (dispatch) => {
  const response = await fetch(`/api/meetings`)
  const meetings = await response.json()
  dispatch(load_all(meetings))
}

export const getMeeting = (id) => async (dispatch) => {
  const response = await fetch(`/api/meetings/${id}`)
  const meeting = await response.json()
  dispatch(update(meeting))
}

export const hostMeeting = (host_id, name, description, queue_limit) => async (dispatch) => {
  const response = await fetch('/api/meetings/host', {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      host_id,
      name,
      description,
      queue_limit
    })
  })

  if (response.ok) {
    const data = await response.json()
    dispatch(host(data))
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['Server error occurred. Please try again.']
  }
}


export const updateMeeting = (id, host_id, name, description, queue_limit) => async (dispatch) => {
  const response = await fetch(`/api/meetings/${id}/update`, {
    method: "PATCH",
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({
      host_id, name, description, queue_limit
    })
  })

  if (response.ok) {
    const data = await response.json()
    dispatch(update(data))
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['Server error occurred. Please try again.']
  }
}


export const endMeeting = (id) => async (dispatch) => {
  const response = await fetch(`/api/meetings/${id}/end`, {
    method: "DELETE",
    // body: JSON.stringify({id})
  })
  if (response.ok) {
    const old_meeting = await response.json()
    dispatch(remove(old_meeting))
  }
}


const initialState = {};

export default function meetingReducer(state=initialState, action) {
  switch(action.type) {
    case LOAD_MEETINGS:
      const allMeetings = {}
      action.meetings['meetings'].forEach((meeting) => {
        allMeetings[meeting['id']] = meeting
      })
      return { ...state, ...allMeetings }
    case HOST_MEETING:
      return { ...state, [action.meeting['id']]: action.meeting }
    case UPDATE_MEETING:
      return { ...state, [action.meeting['id']]: action.meeting }
    case DELETE_MEETING:
      const newMeetings = { ...state }
      delete newMeetings[action.meeting['id']]
      return newMeetings
    default:
      return state
  }
}
