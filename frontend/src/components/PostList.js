import React from 'react'
import {Link} from 'react-router-dom'
import _ from 'lodash'
import 'bootstrap-select/dist/css/bootstrap-select.css'

const renderPosts = posts => {
    posts = _.values(posts)
    if (posts && posts.length > 0) {
        return posts.map(post => {
            console.log(post)
            return (<li key={post.id}>
                    <Post key={post.id} post={post}/>
                </li>

            )
        })
    } else {
        return (<li key="1">No Posts yet.</li>)
    }
}


const PostList = ({posts, category}) =>
    (
        <div className="container">
            {category && <h2>{category}</h2>}
            {!category && <h2>All Posts</h2>}
            <select className="selectpicker">
                <option>Mustard</option>
                <option>Ketchup</option>
                <option>Relish</option>
            </select>


            <ul>
                {renderPosts(posts)}
            </ul>
        </div>
    );


const Post = (props) => {
    console.log(props.post.id)
    return (
        <div>
            <Link to={`/post/` + props.post.id}><strong>{props.post.title}</strong></Link>
            <p>{props.post.body}</p>
        </div>
    )
}

PostList.propTypes = {};
PostList.defaultProps = {};

export default PostList;
