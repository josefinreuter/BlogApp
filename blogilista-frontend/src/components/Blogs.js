import React, { Component } from 'react'
import { connect } from 'react-redux'
import { initialize } from '../reducers/blogReducer'
import { logout } from '../reducers/userReducer'
import { notify } from '../reducers/notificationReducer'
import Blog from './Blog'
import BlogForm from './BlogForm';
import Togglable from './Togglable'

class Blogs extends Component {

    componentDidMount = async () => {
        this.props.initialize()
    }

    logout = () => {
        window.localStorage.clear()
        this.props.notify(`${this.props.user.name} logged out`)
        this.props.logout()
        
    }

    render() {
        const blogs = this.props.blogs.sort(function (a, b) {
            return (b.likes > a.likes) ? 1 : ((a.likes > b.likes) ? -1 : 0);
        })

        return (

            <div>
                <h2>Blogs</h2>
                <p>{this.props.user.name} is logged in. <button onClick={this.logout}>Logout</button></p>

                <h3>Existing blogs: </h3>
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog}/>)}
                <br/>   
                <Togglable buttonLabel="New Blog" ref={component => this.BlogForm = component}>
                        <BlogForm/>
                </Togglable>        
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        user: state.user
    }
  }

export default connect(
    mapStateToProps,
    { initialize, notify, logout }
) (Blogs)
