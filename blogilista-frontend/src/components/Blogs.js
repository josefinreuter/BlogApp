import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'


class Blogs extends Component {
    
    render() {
        const blogs = this.props.blogs.sort(function (a, b) {
            return (b.likes > a.likes) ? 1 : ((a.likes > b.likes) ? -1 : 0);
        })

        const blogStyle = {
            paddingTop: 5,
            paddingLeft: 2,
            border: 'solid',
            borderWidth: 1,
            marginBottom: 10
        }
       
        return (

            <div>
                <h3>Existing blogs: </h3>
                {blogs.map(blog =>
                    <div style={blogStyle} key={blog.id}>
                    <NavLink to={`/blogs/${blog.id}`}>{blog.title}, {blog.author}</NavLink>
                    <br/>
                    </div>)}
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
    mapStateToProps
) (Blogs)
