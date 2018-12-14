import React, { Component } from 'react'
import axios from 'axios';
import { update_username, update_user_id } from './../../ducks/reducer'
import { connect } from 'react-redux';


class Auth extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
        }
    }
    async register() {
        let { username, password } = this.state;
        let res = await axios.post('/auth/register', { username, password })
        if (res.data.loggedIn) {
            this.props.history.push('/dashboard')
            this.props.update_username(res.data.userFound[0].username)
            this.props.update_user_id(res.data.sessionUser.id)
        }
        this.setState({ username: '', password: '' })
    }
    async login() {
        let { username, password } = this.state;
        let res = await axios.post('/auth/login', { username, password })
        if (res.data.loggedIn) {
            this.props.history.push('/dashboard')
            console.log(res)
            this.props.update_username(res.data.userFound[0].username)
            this.props.update_user_id(res.data.sessionUser.id)
        }
        this.setState({ username: '', password: '' })
    }

    render() {

        return (
            <div>
                <img src='https://1.bp.blogspot.com/-JVtiAlhBm7o/WKVxVyXzNbI/AAAAAAAAUpc/qHjJNuJ5r6MJtu5mIb7C3Oq2CBNpgbcCACLcB/s1600/gif-wink.gif' alt='' />
                <p>UserName: <input onChange={(e) => { this.setState({ username: e.target.value }) }} type='text' /></p>
                <p>Password: <input onChange={(e) => { this.setState({ password: e.target.value }) }} type='password' /></p>
                <hr />
                <button onClick={() => this.login()}>Login</button>
                <button onClick={() => this.register()}>Register</button>
            </div>
        )
    }
}

export default connect(null, { update_username, update_user_id })(Auth)
// export default Auth