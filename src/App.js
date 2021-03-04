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

export default class App extends Component {
    state = {
        token: ''
    }
    render() {
        return (
            <div>
                <Router>
                    <Header />
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
                                <SearchPage {...props} handleToken={this.handleToken} />
                            )}
                        />
                        <PrivateRoute
                            path="/favorites"
                            exact
                            token={this.state.token}
                            render={(routerProps) =>
                                <FavoritesPage
                                    user={this.state.token}
                                    {...routerProps}
                                />}
                        />
                    </Switch>
                </Router>
            </div>
        )
    }
}

