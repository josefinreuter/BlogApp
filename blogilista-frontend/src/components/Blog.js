import React, { Component } from 'react'
import { connect } from 'react-redux'
import { likeBlog, deleteBlog, commentOnBlog } from '../reducers/blogReducer'
import { ListGroup, ListGroupItem, Button, FormControl, Well, Table } from 'react-bootstrap';


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
                {blog === undefined ? '' :  
                    <div>
                        <h3>{blog.title} by {blog.author} </h3>
                            <Table bordered condensed>
                                <tbody>
                                    <tr>
                                        <td>Website:</td>
                                        <td><a target="_blank" href={"http://" + blog.url}>{blog.url}</a></td>
                                    </tr>
                                    <tr>
                                        <td>Likes:</td>
                                        <td>{blog.likes} likes 
                                        <Button bsSize="small" onClick={() => this.likeBlog(blog.id)}>Like</Button></td>
                                    </tr>
                                    <tr>
                                        <td>Added by:</td>
                                        <td> {blog.user === undefined ? 'anonymous' : blog.user.name}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <h4>Comments:</h4>
                            {blog.comments !== null ?
                                <ListGroup>{blog.comments.map(comment => 
                                    <ListGroupItem key={comment._id}>{comment.comment}</ListGroupItem>)}
                                </ListGroup>
                            :   <Well>No comments yet!</Well>}   
                            <form onSubmit={(event) => this.addComment(event, blog)}>
                                <FormControl
                                    type="text"
                                    name="comment"                        
                                 />
                                <Button type="submit">Add comment</Button>
                            </form>
                            <br/>
                            <br/>
                            {(blog.user === undefined || blog.user.username === this.props.user.username) ?
                            <Button onClick={() => this.deleteBlog(blog)}>Delete blog</Button> : ''}
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