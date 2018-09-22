import React, {Component} from 'react';
import { connect } from 'react-redux'
import { login } from '../reducers/userReducer'
import { notify } from '../reducers/notificationReducer'
import { initialize } from '../reducers/blogReducer'
import { getAllUsers } from '../reducers/userlistReducer'
import { Navbar, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import Notification from './Notification'


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
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header >
                        <Navbar.Brand><NavLink exact to='/'>Blog App</NavLink></Navbar.Brand>
                    </Navbar.Header>
                 </Navbar>
                <Notification/>
                 <h2>Login</h2>
                <form onSubmit={this.login}>
                    <FormGroup>
                        <ControlLabel> Username: </ControlLabel>
                            <FormControl
                            type="text"
                            name="username"
                            />
                        <ControlLabel>Password:</ControlLabel>
                            <FormControl
                            type="password"
                            name="password"
                            />
                        <Button type="submit">Login</Button>
                    </FormGroup>
                </form>
            </div>
        )
    }
}

export default connect(
    null,
    { login, notify, initialize, getAllUsers }
  ) (LoginForm)