import React, {Component} from 'react'
import PropTypes from "prop-types"
import {Link} from "react-router-dom"
import {formatDate} from "../util/dateutil"

class SinglePost extends Component {


    render() {
        const {post, comments} = this.props
        return (
            <div>
                <article>
                    <h1><Link
                        to={`/post/${post.id}`}>{post.title}</Link></h1>

                    <div className="row">
                        <div className="col-sm-6 col-md-6">
                            <span className="glyphicon glyphicon-folder-open"/> &nbsp;
                            <Link to={"/category/" + post.category}
                            >
                                {post.category}
                            </Link>
                        </div>

                        <div className="col-sm-6 col-md-6">
                            <span className="glyphicon glyphicon-pencil"/> <Link
                            to={`/post/${post.id}`}>{comments.length}</Link>
                            &nbsp;&nbsp;<span className="glyphicon glyphicon-time"/> {formatDate(post.timestamp)}
                        </div>
                    </div>

                    <hr/>

                    <br/>

                    <p className="lead">{post.body}</p>



                </article>
            </div>
        );
    }
}

SinglePost.propTypes = {
    post: PropTypes.object.isRequired
};
SinglePost.defaultProps = {};

export default SinglePost;
