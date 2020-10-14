import React from 'react';
import axios from 'axios';
import './App.css';
import PostList from "../PostList";
import PostForm from "../PostForm";
import {HashRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import LoginForm from "../LoginForm";
import {auth} from '../../firebase';
import NavBar from '../../component/NavBar';

function loggedIn() {
    return localStorage.reactBlogUid;
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        loggedIn() ?
            <Component {...props} />
            : <Redirect to='/login' />
    )} />
)

class App extends React.Component {
    setupAxios() {
        axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
        axios.defaults.headers.post["Content-Type"] = 'application/json';
    }

    constructor(props) {
        super(props);
        this.setupAxios();
        auth.onAuthStateChanged((user) => {
            console.log("STATE CHANGED:"  + JSON.stringify(user));
            if (user == null || user.emailVerified === false) {
                localStorage.removeItem("reactBlogUid");
                localStorage.removeItem("reactBlogUDisplayName");
                localStorage.removeItem("reactBlobUEmail");
                return;
            }

            localStorage.reactBlogUid = user.uid;
            localStorage.reactBlogUDisplayName = user.displayName;
            localStorage.reactBlobUEmail = user.email;
        });
    }

    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Menu} />
                        <PrivateRoute exact path="/posts/:id" component={PostForm} />
                        <Route exact path="/posts" component={PostList}/>
                        <Route exact path="/login" component={LoginForm} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

function Menu(props) {
    return (
        <NavBar/>
    );
}

export default App;
