import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getAllUsers } from '../reducers/userlistReducer'
import { Table } from 'react-bootstrap';




class Users extends React.Component {
    
   componentDidMount = async () => {
    this.props.getAllUsers() 
   }

    render() {
   
    return (
      <div>
        <h3>Users</h3>
        <Table striped bordered condensed hover>
            <thead>
                <tr>
                    <th>User</th>
                    <th>Blogs</th>
                </tr>
            </thead>
            <tbody>
                {this.props.users.map(user => 
                <tr key={user.id}>
                    <td><NavLink to={`/users/${user.id}`}>{user.name}</NavLink></td>
                    <td>{user.blogs.length}</td>
                </tr>)}
            </tbody>
        </Table>
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
  mapStateToProps,
  { getAllUsers }
)(Users)