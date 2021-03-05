import Header from './components/Header.js'
import PrivateRoute from './components/PrivateRoute.js'
import HomePage from './HomePage.js';
import LoginPage from './auth/LoginPage.js';
import SignupPage from './auth/SignupPage.js';
import FavoritesPage from './FavoritesPage.js'
import SearchPage from './SearchPage.js'
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';

import React, { Component } from 'react'
import { getTokenFromLocalStorage, storeTokenInLocalStorage } from './utils/local-storage-utils.js';

export default class App extends Component {
    state = {
        token: getTokenFromLocalStorage()
    }
    handleToken = (token) => {
        this.setState({
            token
        })
        storeTokenInLocalStorage(token);
    }
    handleLogout = () => {
        this.setState({
            token: ''
        })
        storeTokenInLocalStorage();
    }
    render() {
        console.log('app.js state:', this.state)
        return (
            <div>
                <Router>
                    <Header token={this.state.token} handleLogout={this.handleLogout} />
                    <Switch>
                        <Route
                            path="/"
                            exact
                            component={HomePage}
                        />
                        <Route
                            path="/login"
                            exact
                            render={(props) => (
                                <LoginPage {...props} handleToken={this.handleToken} />
                            )}
                        />
                        <Route
                            path="/signup"
                            exact
                            render={(props) => (
                                <SignupPage {...props} handleToken={this.handleToken} />
                            )}
                        />
                        <Route
                            path="/search"
                            exact
                            render={(props) => (
                                <SearchPage {...props} token={this.state.token} />
                            )}
                        />
                        <PrivateRoute
                            path="/favorites"
                            exact
                            token={this.state.token}
                            render={(routerProps) =>
                                <FavoritesPage
                                    token={this.state.token}
                                    {...routerProps}
                                />}
                        />
                    </Switch>
                </Router>
            </div>
        )
    }
}

