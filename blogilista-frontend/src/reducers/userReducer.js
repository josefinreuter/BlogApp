import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
  console.log('ACTION: ', action.type)
  switch (action.type) {
  case 'LOGIN':
    return action.user
  case 'SETUSER':
    return action.user
  case 'LOGOUT':
    return action.user
  default:
    return state
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username: username,
        password: password
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        user
      })

    } catch (e) {
      dispatch({
        type: 'NOTIFICATION',
        notification: 'Wrong username or password!'
      })
    }

  }
}

export const setUser = (user) => {
  return async (dispatch) => {
    blogService.setToken(user.token)
    dispatch({
      type: 'SETUSER',
      user
    })
  }
}

export const logout = () => {
  return async (dispatch) => {
    dispatch({
      type: 'LOGOUT',
      user: null
    })
  }
}

export default userReducer