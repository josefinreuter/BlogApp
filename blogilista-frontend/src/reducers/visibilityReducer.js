const visibilityReducer = (state = false, action) => {
  console.log('ACTION: ', action.type)
  switch (action.type) {
  case 'TOGGLE':
    return action.visible
  default:
    return state
  }
}

export const toggle = (visible) => {
  return async (dispatch) => {
    dispatch({
      type: 'TOGGLE',
      visible: !visible
    })

  }
}

export default visibilityReducer