import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addBlog } from '../reducers/blogReducer'
 

class BlogForm extends Component {

    addBlog = async (event) => {
        event.preventDefault()
        const title = event.target.title.value
        const author = event.target.author.value
        const url = event.target.url.value
        this.props.addBlog(title, author, url)
        event.target.title.value = ''
        event.target.author.value = ''
        event.target.url.value = ''
    }

    
    render() {
    return (
        <div>
            <h3>Add new blog</h3>
            <form onSubmit={this.addBlog}>
                <div>
                    Title:
                    <input
                        type="text"
                        name="title"                        
                    />
                </div>
                <div>
                    Author:
                    <input
                        type="text"
                        name="author"                       
                    />
                </div>
                <div>
                    url:
                    <input
                        type="text"
                        name="url"
                    />
                </div>
                <br/>
                <button type="submit">Add</button>
            </form>

        </div>
    )
    }
}

/* BlogForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    handleFormChange: PropTypes.func.isRequired,
    newTitle: PropTypes.string.isRequired,
    newAuthor: PropTypes.string.isRequired,
    newUrl: PropTypes.string.isRequired
} */


export default connect(
    null,
    { addBlog }
) (BlogForm)