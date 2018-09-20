import React from 'react'
import { connect } from 'react-redux'

class User extends React.Component {
  
    componentDidMount = async () => {
        
    }
  
    render() {
    return (
      <tr>
          <td>{this.props.user.name}</td>
          <td>{this.props.user.blogs.length}</td>
      </tr>
    )
  }
}

export default connect(
  null,
  {  }
)(User)