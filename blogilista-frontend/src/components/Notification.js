import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    return (
      <div>
        { this.props.notification === '' ?
          '' :
          <div>{this.props.notification}</div> }
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