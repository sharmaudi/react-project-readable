import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {formatDate} from "../util/dateutil"
import ReactMarkdown from 'react-markdown'
import {truncate} from "../util/textutil"



class PostSnippet extends Component {
    render() {
        const {props} = this
        const body = truncate(this.props.post.body, 50, "...")
        return (
            <article className="post xs-margin-top well">
            <h2><Link
                to={`/post/${props.post.id}`}><strong>{props.post.title}</strong></Link>
            </h2>


            <div className="row">
                <div className="col-sm-6 col-md-6">
                    <span className="glyphicon glyphicon-th"/> &nbsp;
                    <Link to={"/category/" + props.post.category}
                    >
                        {props.post.category}
                    </Link>

                    &nbsp;&nbsp;&nbsp;
                    <span className="glyphicon glyphicon-user"/> &nbsp;
                        {props.post.author}

                </div>

                <div className="col-sm-6 col-md-6">

                    <span className="glyphicon glyphicon-heart"/> {props.post.voteScore}
                    &nbsp;&nbsp;
                    <span className="glyphicon glyphicon-pencil"/> <Link
                    to={`/post/${props.post.id}`}>{props.commentCount}</Link>
                    &nbsp;&nbsp;<span className="glyphicon glyphicon-time"/> {formatDate(props.post.timestamp)}
                </div>
            </div>

            <hr/>

            <ReactMarkdown source={body}/>


            <div className="row">
                <div className="col-md-4">
                    <Link
                    to={`/post/${props.post.id}`}>continue reading...</Link>
                </div>

                <div className="col-md-4"/>
                <div className="col-md-4 text-right">
                    <a href="#11" title="Like Post" className="sm-padding" onClick={
                            (e) => {
                                e.preventDefault()
                                props.onLikePost(props.post.id)
                            }
                        }>
                            <span className="glyphicon glyphicon-thumbs-up font-large"/>
                        </a>
                        <a href="#11" title="Dislike Post" className="sm-padding" onClick={
                            (e) => {
                                e.preventDefault()
                                props.onDislikePost(props.post.id)
                            }
                        }>
                            <span className="glyphicon glyphicon-thumbs-down font-large"/>
                        </a>
                </div>
            </div>






        </article>
        )
    }
}

PostSnippet.propTypes = {
    post: PropTypes.object.isRequired,
    commentCount: PropTypes.number.isRequired,
    onLikePost: PropTypes.func,
    onDislikePost: PropTypes.func
}
PostSnippet.defaultProps = {}

export default PostSnippet
