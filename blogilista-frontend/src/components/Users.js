import React from 'react'
import { connect } from 'react-redux'
import { getAllUsers } from '../reducers/userlistReducer'
import User from './User';

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
                <User key={user.id} user={user}/>)}
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