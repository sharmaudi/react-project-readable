import React, {Component} from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {addCommentAndFetch, getComments, getPost} from "../actions/index"
import _ from 'lodash'
import SinglePost from "../components/SinglePost"
import CommentForm from "../components/CommentForm"
import Comments from "../components/Comments"


class PostDetail extends Component {


    state = {
        input: ""
    }

    componentWillMount() {
        const postId = this.props.match.params.postId

        //get post from server when not already available(e.g. deep linked)
        if (!(this.props.posts && this.props.posts[postId])) {
            this.props.getPost(postId)
        }

        this.props.getComments(postId)

    }

    componentWillReceiveProps(newProps) {
        const postId = this.props.match.params.postId
        const newPostId = newProps.match.params.postId

        //Get post if the post id has changed and new
        if (postId !== newPostId) {
            if (!newProps.connection.pending) {
                if (newProps.posts && !(newPostId in newProps.posts)) {
                    this.props.getPost(newPostId)
                }
            }
        }
    }

    static showComments(comments) {
        return comments.map(comment => (
            <div key={comment.id} className="well">{comment.body} <span className="badge">{comment.voteScore}</span>
            </div>
        ))
    }

    submitComment(e) {
        const postId = this.props.match.params.postId
        e.preventDefault()
        console.log(this.state.input)
        this.props.addCommentAndFetch(postId, {
            body: this.state.input,
            author: 'buddy'
        })
        this.setState({
            input: ''
        })

    }


    render() {

        const postId = this.props.match.params.postId
        const selectedPost = this.props.posts ? this.props.posts[postId] : []
        const comments = this.props.comments ? _.values(this.props.comments).filter(comment => comment.parentId === postId) : []
        return (
            <div>
                {selectedPost &&
                (
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <SinglePost post={selectedPost} comments={comments}/>
                                <hr/>
                                <Comments comments={comments}/>
                                <hr/>
                                <CommentForm onSubmit={this.submitComment}/>

                            </div>

                        </div>
                    </div>

                )


                }

            </div>
        );
    }
}

PostDetail.propTypes = {};
PostDetail.defaultProps = {};


PostDetail.propTypes = {};
PostDetail.defaultProps = {};

const mapStateToProps = (state, ownProps) => {
    console.log("MapStateToProps")
    return {
        posts: state.blog.posts,
        comments: state.blog.comments,
        connection: state.connection
    }
}

export default withRouter(connect(mapStateToProps, {
    getPost, getComments, addCommentAndFetch
})(PostDetail))