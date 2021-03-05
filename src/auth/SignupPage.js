import React, { Component } from 'react'
import { signupUser } from '../utils/api-utils'

export default class SignupPage extends Component {
    state = {
        email: '',
        password: '',
    }
    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        const user = await signupUser(this.state.email, this.state.password)
        const token = user.token;
        this.props.handleToken(token)
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="">
                        Email:
                        <input type="text" onChange={this.handleEmailChange} value={this.state.email}/>
                    </label>
                    <label htmlFor="">
                        Password:
                        <input type="text" onChange={this.handlePasswordChange} value={this.state.password}/>
                    </label>
                    <button>Sign Up</button>
                </form>
            </div>
        )
    }
}
