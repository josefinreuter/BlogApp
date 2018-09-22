import userService from '../services/users'


const userlistReducer = (store = [], action) => {
  console.log('ACTION: ', action.type)
  switch(action.type){
  case 'GETUSERS':
    return action.data
  default:
    return store
  }
}

export const getAllUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: 'GETUSERS',
      data: users
    })
  }
}

export default userlistReducer