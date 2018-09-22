import React from 'react'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem } from 'react-bootstrap';


class User extends React.Component {

    mapToId = (id) =>  {
        return this.props.users.find(user => user.id === String(id))
    }
            

    render() {
        const user = this.mapToId(this.props.match.params.id)
    return (
    <div>
        {user === undefined ? '' :
            <div>
                <h3>User: {user.name}</h3>
                <h4>Added Blogs:</h4>
                <ListGroup>
                    {user.blogs.map(blog => 
                        <ListGroupItem key={blog._id}>
                            {blog.title} by {blog.author}
                        </ListGroupItem>)}
                </ListGroup>
        </div>}       
    </div>
    )
  }
}


const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}
export default connect(
 mapStateToProps
)(User)