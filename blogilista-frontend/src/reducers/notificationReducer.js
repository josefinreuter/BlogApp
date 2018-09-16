const notificationReducer = (state = '', action) => {
    console.log('ACTION: ', action.type)
    switch (action.type) {
    case 'NOTIFICATION':
      return action.notification
    default:
      return state
    }
  }
  
  export const notify = (notification) => {
    return async (dispatch) => {
      dispatch({
        type: 'NOTIFICATION',
        notification
      })
      setTimeout(() => {
        dispatch({
            type: 'NOTIFICATION',
            notification: ''
          })
    }, 5000)
    }
  }
  
  export default notificationReducer