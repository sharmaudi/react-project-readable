import React from 'react'
import {Link} from 'react-router-dom'
import _ from 'lodash'
import 'bootstrap-select/dist/css/bootstrap-select.css'
import {formatDate} from "../util/dateutil"
import {truncate} from "../util/textutil"
import ReactMarkdown from 'react-markdown';


const renderPosts = (posts,comments) => {



    posts = _.values(posts)
    if (posts && posts.length > 0) {
        return posts.map(post => {
            console.log(post)

            let commentCount = 0
            if (comments) {
                commentCount = _.values(comments).filter(comment => comment.parentId === post.id).length
            }

            return (
                <Post key={post.id} post={post} commentCount={commentCount}/>

            )
        })
    } else {
        return (<li key="1">No Posts yet.</li>)
    }
}


const PostList = ({posts, category, comments}) =>
    (
        <div>
            {category === "all" && <h1 className="small">LATEST POSTS</h1>}
            {category && category !== "all" && <h1 className="small">{category.toUpperCase()}</h1>}
            {renderPosts(posts, comments)}



        </div>
    );

const Post = (props) => {
    console.log(props)
    const body = truncate(props.post.body, 50, "...")

    return (



        <article className="post xs-margin-top well">
            <h2><Link
                to={`/post/${props.post.id}`}><strong>{props.post.title}</strong></Link></h2>

            <div className="row">
                <div className="col-sm-6 col-md-6">
                    <span className="glyphicon glyphicon-th"/> &nbsp;
                    <Link to={"/category/" + props.post.category}
                              >
                            {props.post.category}
                        </Link>


                </div>

                <div className="col-sm-6 col-md-6">

                    <span className="glyphicon glyphicon-heart"/> {props.post.voteScore}
                    &nbsp;&nbsp;
                    <span className="glyphicon glyphicon-pencil"/> <Link to={`/post/${props.post.id}`}>{props.commentCount}</Link>
                    &nbsp;&nbsp;<span className="glyphicon glyphicon-time"/> {formatDate(props.post.timestamp)}
                </div>
            </div>

            <hr/>

            <ReactMarkdown source={body}/>


            <p className="text-right">
				          <Link
                to={`/post/${props.post.id}`}>continue reading...</Link>
            </p>



        </article>
    )
}

PostList.propTypes = {};
PostList.defaultProps = {};

export default PostList;
