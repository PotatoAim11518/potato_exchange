const LOAD_QUEUES = 'queues/LOAD_QUEUES'
const UPDATE_QUEUE = 'queues/UPDATE_QUEUE'
const REMOVE_QUEUE = 'queues/REMOVE_QUEUE'

const load_all = (queues) => ({
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
