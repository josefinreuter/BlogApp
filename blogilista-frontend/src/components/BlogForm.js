import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { toggle } from '../reducers/visibilityReducer'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

 

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
        this.props.toggle(this.props.visible)
    }

    
    render() {
    return (
        <div>
            <h3>Add new blog</h3>
            <form onSubmit={this.addBlog}>
                <FormGroup>
                    <ControlLabel>Title:</ControlLabel>
                        <FormControl
                            type="text"
                            name="title"                        
                        />
                    <ControlLabel>Author:</ControlLabel>
                        <FormControl
                            type="text"
                            name="author"                       
                        />
                    <ControlLabel>Website:</ControlLabel>
                         <FormControl
                            type="text"
                            name="url"
                        />
                    <Button type="submit">Add</Button>
                </FormGroup>
            </form>

        </div>
    )
    }
}

const mapStateToProps = (state) => {
    return {
        visible: state.visible
    }
  }

export default connect(
    mapStateToProps,
    { addBlog, toggle }
) (BlogForm)