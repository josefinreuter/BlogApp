import React, {Component} from 'react';
import { connect } from 'react-redux'
import { setUser } from './reducers/userReducer'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import Users from './components/Users';
import { HashRouter, Route } from 'react-router-dom'
import Header from './components/Header';


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
            <HashRouter>
                <div className="app">
                <Notification/>
                {this.props.user === null ?
                    <Route exact path="/" render={() => <LoginForm/>}></Route>
                    : 
                    <div>
                    <Header/>
                    <Route exact path="/" render={() => <Blogs/>}></Route>
                    <Route exact path="/users" render={() => <Users/>}></Route>
                    </div>
                }
                
                </div>
            </HashRouter>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        visible: state.visible
    }
  }

export default connect(
    mapStateToProps,
    { setUser }
) (App)
