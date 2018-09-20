import React from 'react'
import { connect } from 'react-redux'
import { toggle } from '../reducers/visibilityReducer'
import { logout } from '../reducers/userReducer'
import { notify } from '../reducers/notificationReducer'
import BlogForm from './BlogForm'



class Header extends React.Component {


    logout = () => {
        window.localStorage.clear()
        this.props.notify(`${this.props.user.name} logged out`)
        this.props.logout()
        
    }

    toggleVisibility = () => {
        this.props.toggle(this.props.visible)
    }
    
  render() {
    const hideWhenVisible = {display: this.props.visible ? 'none' : ''}
    const showWhenVisible = {display: this.props.visible ? '' : 'none'}
    return (
      <div>
          <h2>Blogs</h2>
                    <p>{this.props.user.name} is logged in. <button onClick={this.logout}>Logout</button></p>
                    <div style={hideWhenVisible}>
                    <button onClick={this.toggleVisibility}>New Blog</button>
                </div>
                <div style={showWhenVisible}>
                    <BlogForm/>
                    <br/>
                    <button onClick={this.toggleVisibility}>Cancel</button>
                </div>
       
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    user: state.user,
    visible: state.visible
  }
}

export default connect(
  mapStateToProps,
  { toggle, logout, notify }
)(Header)