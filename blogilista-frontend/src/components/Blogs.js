import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { toggle } from '../reducers/visibilityReducer'
import BlogForm from './BlogForm'
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';




class Blogs extends Component {


    toggleVisibility = () => {
        this.props.toggle(this.props.visible)
    }
    
    render() {
        const blogs = this.props.blogs.sort(function (a, b) {
            return (b.likes > a.likes) ? 1 : ((a.likes > b.likes) ? -1 : 0);
        })

        const hideWhenVisible = {display: this.props.visible ? 'none' : ''}
        const showWhenVisible = {display: this.props.visible ? '' : 'none'}
    

        const blogStyle = {
            textDecoration: 'none'
        }
       
        return (

            <div>
                <h3>Existing blogs: </h3>
                <ListGroup>
                    {blogs.map(blog =>
                        <ListGroupItem href="#" key={blog.id}>
                            <NavLink style={blogStyle} to={`/blogs/${blog.id}`}>{blog.title}, {blog.author}</NavLink>
                        </ListGroupItem>)}
                </ListGroup>
                <div style={hideWhenVisible}>
                    <Button onClick={this.toggleVisibility}>New Blog</Button>
                </div>
                <div style={showWhenVisible}>
                    <BlogForm/>
                    <br/>
                    <Button onClick={this.toggleVisibility}>Cancel</Button>
                </div>
       
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        visible: state.visible
    }
  }

export default connect(
    mapStateToProps,
    { toggle }
) (Blogs)
