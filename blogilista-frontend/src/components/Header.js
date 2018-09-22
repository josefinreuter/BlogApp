import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { notify } from '../reducers/notificationReducer'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap'
import Notification from './Notification'

class Header extends React.Component {


    logout = () => {
        window.localStorage.clear()
        this.props.notify(`${this.props.user.name} logged out`)
        this.props.logout()
        this.props.history.push('/')        
    }

    
  render() {

    const linkStyle = {
        textDecoration: 'none',
        color: 'white'
    }
    
    return (
      <div>
        <Navbar inverse collapseOnSelect>
            <Navbar.Header >
                <Navbar.Brand><NavLink exact to='/'>Blog App</NavLink></Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <NavItem href="#"> <NavLink exact to='/' style={linkStyle}>HOME</NavLink></NavItem>
                    <NavItem href="#"> <NavLink exact to='/users' style={linkStyle}>USERS</NavLink></NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        <p>{this.props.user.name} is logged in. <Button onClick={this.logout}>Logout</Button></p>
        <Notification/>            
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    user: state.user,
  }
}

export default connect(
  mapStateToProps,
  { logout, notify }
)(Header)