import React, {Component} from 'react'
import PropTypes from "prop-types"
import {Link} from "react-router-dom"
import {formatDate} from "../util/dateutil"

class SinglePost extends Component {


    render() {
        const {post} = this.props
        return (
            <div>
                <article>
                    <h1><Link
                        to={`/post/${post.id}`}>{post.title}</Link></h1>

                    <div className="row">
                        <div className="col-sm-6 col-md-6">
                            <span className="glyphicon glyphicon-folder-open sm-padding"/>
                            <Link to={"/category/" + post.category}
                            >
                                {post.category}
                            </Link>
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

                    <p className="lead">{post.body}</p>

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
    onDislikePost: PropTypes.func.isRequired
};
SinglePost.defaultProps = {};

export default SinglePost;
