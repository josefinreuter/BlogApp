import React, { Component } from 'react'
import { connect } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

class Blog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
        }
    }

    toggleVisibility = () => {
        this.setState({visible: !this.state.visible})
    }

    likeBlog = async (id) => {
        this.props.likeBlog(id, this.props.blogs)
    }

    deleteBlog = async (id) => {
       this.props.deleteBlog(id, this.props.blogs)
    }

    render() {

        const blogStyle = {
            paddingTop: 5,
            paddingLeft: 2,
            border: 'solid',
            borderWidth: 1,
            marginBottom: 10
        }

        return (
            <div style={blogStyle}>
                <div>
                    {this.state.visible ?
                        <div className="allContent">
                            <span
                                onClick={this.toggleVisibility}>{this.props.blog.title}, {this.props.blog.author} </span>
                            <br/>
                            <a href={this.props.blog.url}>{this.props.blog.url}</a>
                            <br/>
                            {this.props.blog.likes} likes
                            <button onClick={() => this.likeBlog(this.props.blog.id)}>Like</button>
                            <br/>
                            added by {this.props.blog.user === undefined ? 'anonymous' : this.props.blog.user.name}
                            <br/>
                            {(this.props.blog.user === undefined || this.props.blog.user.username === this.props.user.username) ?
                                <button onClick={() => this.deleteBlog(this.props.blog.id)}>Delete</button> : ''}
                        </div>
                        : <div onClick={this.toggleVisibility}
                               className="initialContent"> {this.props.blog.title}, {this.props.blog.author}</div>}

                </div>
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
    { likeBlog, deleteBlog }
) (Blog)