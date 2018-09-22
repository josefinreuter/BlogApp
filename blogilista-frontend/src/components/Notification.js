import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'

class Notification extends React.Component {
  render() {
    return (
      <div>
        { this.props.notification === '' ?
          '' :
          <Alert>{this.props.notification}</Alert> }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps
)(Notification)