const LOAD_MEETINGS = 'meetings/LOAD_MEETINGS'
// const LOAD_MEETING = 'meetings/LOAD_MEETING'
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

export const hostMeeting = (payload) => async (dispatch) => {
  const response = await fetch(`/api/meetings/host`, {
    method: "POST",
    body: JSON.stringify({...payload})
  })
  const meeting = await response.json()
  dispatch(update(meeting))
}

export const updateMeeting = (id, payload) => async (dispatch) => {
  const response = await fetch(`/api/meetings/${id}/update`, {
    method: "PATCH",
    body: JSON.stringify({...payload})
  })
  const meeting = await response.json()
  dispatch(update(meeting))
}

export const endMeeting = (id) => async (dispatch) => {
  const response = await fetch(`/api/meetings/${id}/end`, {
    method: "DELETE",
    body: JSON.stringify({id})
  })
  const old_meeting = await response.json()
  dispatch(remove(old_meeting))
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
    // case LOAD_MEETING:
    //   return { ...state, [action.meeting['id']]: action.meeting }
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
