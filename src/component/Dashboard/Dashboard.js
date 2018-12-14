import React, {Component} from 'react'
import axios from 'axios'
import Post from './../Post/Post'
// import { userInfo } from 'os';


class Dashboard extends Component{
    constructor(){
        super()
        this.state = {
            posts: [],
            search: '',
            myPost: true,
        }
        this.showPost = this.showPost.bind(this)
    }
    componentDidMount(){
        this.showPost()
    }
    showPost(){
        axios.get('/api/post').then(resp => {
            this.setState({
                posts: resp.data
            })
        })
    }
    handleChange(value){
        this.setState({
            search: value
        })
    }
    checkBox(e){
        this.setState({
            myPost: ! e
        })
    }
    render(){
        let mappedPosts = this.state.posts.map(post =>{
            return (
                <Post
                key={post.id}
                username={post.users_id}
                title={post.post_title}
                />
            )
        })
        return(
            <div>
                <div className='searchBox'>
                <input onChange={(e)=>{this.handleChange(e.target.value)}}/>
                <button>search</button>
                <input type='checkbox' onChange={(e)=>this.checkBox(e)}/>
                </div>
                Dashboard
                {mappedPosts}
            </div>
        )
    }
}

export default Dashboard