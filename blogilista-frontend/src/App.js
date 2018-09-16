import React, {Component} from 'react';
import { connect } from 'react-redux'
import { setUser } from './reducers/userReducer'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';

class App extends Component {
    
    componentDidMount = async () => {
       
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON !== null) {        
            const user = JSON.parse(loggedUserJSON)
            this.props.setUser(user)          
        }
    }


    render() {
        return (
            <div className="app">
                <Notification/>
                {this.props.user === null ?
                    <LoginForm/> : <Blogs/>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
  }

export default connect(
    mapStateToProps,
    { setUser }
) (App)
