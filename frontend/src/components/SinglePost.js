import React, {Component} from 'react'
import PropTypes from "prop-types"
import {Link} from "react-router-dom"
import {formatDate} from "../util/dateutil"
import ReactMarkdown from 'react-markdown'

class SinglePost extends Component {


    render() {
        const {post} = this.props
        return (
            <div>
                <article>
                    <h1><Link
                        to={`/post/${post.id}`}>{post.title}</Link><small className="lead"> by {post.author}</small></h1>

                    <div className="row">
                        <div className="col-sm-6 col-md-6">
                            <span className="glyphicon glyphicon-th xs-padding"/>
                            <Link to={"/category/" + post.category}
                                  title="Go to category"
                                  className="sm-padding"
                            >
                                {post.category}
                            </Link>

                            <span className="glyphicon glyphicon-edit xs-padding"/>
                            <a href="#edit"
                               onClick={
                                   (e) => {
                                       e.preventDefault()
                                       this.props.onEditPost(post.id)
                                   }
                               }
                                  className="sm-padding"
                                  title="Edit Post"
                            >
                                edit
                            </a>

                            <span className="glyphicon glyphicon-remove xs-padding"/>
                            <a href="#remove"
                               onClick={(e) => this.props.onDeletePost(post.id)}
                                  className="sm-padding"
                                  title="Remove Post"
                            >
                                remove
                            </a>
                        </div>

                        <div className="col-sm-6 col-md-6">
                            <span className="glyphicon glyphicon-heart xs-padding"/>
                            <span className="sm-padding">{post.voteScore}</span>
                            <span className="glyphicon glyphicon-pencil xs-padding"/>
                            <Link className="sm-padding"
                            to={`/post/${post.id}`}>{post.comments.length}</Link>
                            <span className="glyphicon glyphicon-time"/> {formatDate(post.timestamp)}
                        </div>
                    </div>

                    <hr/>

                    <br/>



                        <ReactMarkdown source={post.body} />



                    <p className="small help-block">

                        {post.voteScore < 0 &&
                            <span>{post.voteScore * -1} dislikes.</span>
                        }

                        {post.voteScore === 0 &&
                            <span>There are no likes on this post yet.</span>
                        }

                        {post.voteScore === 1 &&
                            <span>1 person liked this post.</span>
                        }

                        {post.voteScore > 1 &&
                            <span>{post.voteScore} people liked this post.</span>
                        }
                    </p>
                    <p className="small help-block">
                        {post.comments.length > 1 &&
                        (<span>There are {post.comments.length} comments.</span>)
                        }

                        {post.comments.length === 1 &&
                        (<span>There is 1 comment.</span>)
                        }

                        {post.comments.length === 0 &&
                        (<span>There are no comments.</span>)
                        }


                    </p>

                    <p className="text-right">
                        <a href="#11" title="Like Post" className="sm-padding" onClick={
                            (e) => {
                                e.preventDefault()
                                this.props.onLikePost(post.id)
                            }
                        }>
                            <span className="glyphicon glyphicon-thumbs-up font-large"/>
                        </a>
                        <a href="#11" title="Dislike Post" className="sm-padding" onClick={
                            (e) => {
                                e.preventDefault()
                                this.props.onDislikePost(post.id)
                            }
                        }>
                            <span className="glyphicon glyphicon-thumbs-down font-large"/>
                        </a>
                    </p>

                </article>
            </div>
        );
    }
}

SinglePost.propTypes = {
    post: PropTypes.object.isRequired,
    onLikePost: PropTypes.func.isRequired,
    onDislikePost: PropTypes.func.isRequired,
    onEditPost:PropTypes.func,
    onDeletePost:PropTypes.func
};
SinglePost.defaultProps = {};

export default SinglePost;
