import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Header extends Component {
    render() {
        return (
            <header>
                <NavLink to='/'>Home</NavLink>
                {this.props.token &&
                    <>
                        <NavLink to='/favorites'>My Favorites</NavLink>
                        <NavLink to='/search'>Search</NavLink>
                        <button onClick={this.props.handleLogout}>Sign Out</button>
                    </>    
                }
                {!this.props.token &&
                    <>
                        <NavLink to='/signup'>Sign-Up</NavLink>
                        <NavLink to='/login'>Login</NavLink>
                        <NavLink to='/search'>Search</NavLink>

                    </>
                }


            </header>
        )
    }
}
