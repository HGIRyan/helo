import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { update_username } from './../../ducks/reducer'

class Nav extends Component {
    render() {
        console.log(this.props.location)
        let { username, user_id } = this.props
        return (
            <div>
                {this.props.location.pathname === '/' ? null :
                    <div className='navBar'>
                        {username}
                        {user_id}
                        <div className='path-buttons'>
                            <Link to='/dashboard'>
                                <button className='navBar-button'>Home</button>
                            </Link>
                            <Link to='/new'>
                                <button className='navBar-button'>NewPost</button>
                            </Link>
                            <a href='http://localhost:3510/logout'>
                                <button className='navBar-button'> Log Out </button>
                            </a>
                        </div>
                    </div>}
            </div>
        );
    }
}
function mapPropsToState(state) {
    return { ...state }
}
const NavWithLocation = withRouter(Nav)
export default connect(mapPropsToState, { update_username })(NavWithLocation)
// export default NavWithLocation