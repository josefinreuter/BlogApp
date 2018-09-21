import React, {Component} from 'react';
import { connect } from 'react-redux'
import { login } from '../reducers/userReducer'
import { notify } from '../reducers/notificationReducer'
import { initialize } from '../reducers/blogReducer'
import { getAllUsers } from '../reducers/userlistReducer'

class LoginForm extends Component {

    login = async (event) => {
        event.preventDefault()
            this.props.login(event.target.username.value, event.target.password.value)
            event.target.username.value = ''
            event.target.password.value = ''
            this.props.initialize()
            this.props.getAllUsers() 
    }

    render() {
        return(
            <div className="loginForm">
            <h2>Login</h2>

            <form onSubmit={this.login}>
                <div>
                    Username:
                    <input
                        type="text"
                        name="username"
                    />
                </div>
                <div>
                    Password:
                    <input
                        type="password"
                        name="password"
                        />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
        )
    }
}

export default connect(
    null,
    { login, notify, initialize, getAllUsers }
  ) (LoginForm)