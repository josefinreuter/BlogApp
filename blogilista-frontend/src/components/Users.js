import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getAllUsers } from '../reducers/userlistReducer'



class Users extends React.Component {
    
   componentDidMount = async () => {
    this.props.getAllUsers() 
   }

    render() {
   
    return (
      <div>
          <h3>Users</h3>
        <table style={{width: '100%', textAlign: 'left'}}>
            <tbody>
                <tr>
                    <th>User</th>
                    <th>Blogs</th>
                </tr>
               {this.props.users.map(user => 
                 <tr key={user.id}>
                 <td><NavLink to={`/users/${user.id}`}>{user.name}</NavLink></td>
                 <td>{user.blogs.length}</td>
             </tr>)}
            </tbody>
        </table>
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