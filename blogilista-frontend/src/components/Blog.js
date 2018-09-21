import React, { Component } from 'react'
import { connect } from 'react-redux'
import { likeBlog, deleteBlog, commentOnBlog } from '../reducers/blogReducer'

class Blog extends Component {
 
    likeBlog = async (id) => {
        this.props.likeBlog(id, this.props.blogs)
    }

    deleteBlog = async (blog) => {
    if (window.confirm(`Delete '${blog.title}'?`)) {
       this.props.deleteBlog(blog.id, this.props.blogs)
       this.props.history.push('/')
        }
    }

    addComment = async (event, blog) => {
        event.preventDefault()
        this.props.commentOnBlog(event.target.comment.value, blog)
        event.target.comment.value = ''
        
    }

    mapToId = (id) =>  {
        return this.props.blogs.find(blog => blog.id === String(id))
    }

    render() {
        const blog = this.mapToId(this.props.match.params.id)
        return (
            <div>
                {blog === undefined ? '' :  <div>
                            <h3>{blog.title}, {blog.author} </h3>
                            <a href={blog.url}>{blog.url}</a>
                            <br/>
                            {blog.likes} likes
                            <button onClick={() => this.likeBlog(blog.id)}>Like</button>
                            <br/>
                            added by {blog.user === undefined ? 'anonymous' : blog.user.name}
                            <br/>
                            {(blog.user === undefined || blog.user.username === this.props.user.username) ?
                                <button onClick={() => this.deleteBlog(blog)}>Delete</button> : ''}
                            <h4>Comments:</h4>
                            {blog.comments !== null ?
                                <ul>
                                {blog.comments.map(comment => <li key={comment._id}>{comment.comment}</li>)}
                            </ul>
                            : ''}   
                            <form onSubmit={(event) => this.addComment(event, blog)}>
                                <input
                                    type="text"
                                    name="comment"                        
                                 />
                                <button type="submit">Add comment</button>
                            </form>
                        </div>}
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
    { likeBlog, deleteBlog, commentOnBlog }
) (Blog)