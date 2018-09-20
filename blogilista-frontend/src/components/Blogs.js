import React, { Component } from 'react'
import { connect } from 'react-redux'
import { initialize } from '../reducers/blogReducer'

import Blog from './Blog'


class Blogs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }


    componentDidMount = async () => {
        this.props.initialize()
    }

    
    render() {
        const blogs = this.props.blogs.sort(function (a, b) {
            return (b.likes > a.likes) ? 1 : ((a.likes > b.likes) ? -1 : 0);
        })
       


        return (

            <div>
                <h3>Existing blogs: </h3>
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog}/>)}
                <br/>   
                 

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs
    }
  }

export default connect(
    mapStateToProps,
    { initialize }
) (Blogs)
