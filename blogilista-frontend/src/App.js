import React, {Component} from 'react';
import { connect } from 'react-redux'
import { setUser } from './reducers/userReducer'
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import Blog from './components/Blog';
import Users from './components/Users';
import User from './components/User';
import { HashRouter, Route } from 'react-router-dom'
import Header from './components/Header';
import { initialize } from './reducers/blogReducer'
import { getAllUsers } from './reducers/userlistReducer'


class App extends Component {
    
    componentDidMount = async () => {
       
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON !== null) {        
            const user = JSON.parse(loggedUserJSON)
            this.props.setUser(user)  
            this.props.initialize()
            this.props.getAllUsers()        
        }
    }
    render() {            
        return (
            <HashRouter>
                <div className="app">
                {this.props.user === null ?
                    <Route exact path="/" render={() => <LoginForm/>}></Route>
                    : 
                    <div>
                    <Route path="/" render={({history}) => <Header history={history}/>}></Route>
                    <Route exact path="/" render={() => <Blogs/>}></Route>
                    <Route exact path="/users" render={() => <Users/>}></Route>
                    <Route exact path="/users/:id" render={({match}) => <User match={match}/>}></Route>
                    <Route exact path="/blogs/:id" render={({match, history}) => <Blog match={match} history={history}/>}></Route>                   
                    </div>}
                </div>
            </HashRouter>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        visible: state.visible,
        users: state.users
    }
  }

export default connect(
    mapStateToProps,
    { setUser, initialize, getAllUsers }
) (App)
