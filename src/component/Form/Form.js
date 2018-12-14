import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class Form extends Component {
    constructor(){
        super()
        this.state = {
            post:''
        }
    }
    handleChange(value){
        this.setState({
            post: value
        })
    }
    render() {
        return (
            <div>
                <h1>New Post</h1>
                <h3>Title:</h3>
                <input type='text' onChange={(e)=>{this.handleChange(e.target.value)}}/>
                <Link to='/dashboard'>
                    <button>Post</button>
                </Link>
            </div>
        )
    }
}

export default Form