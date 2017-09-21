import React, {Component} from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {addCommentAndFetch, getComments, getPost, likePost, deletePost} from "../actions/index"
import SinglePost from "../components/SinglePost"
import CommentForm from "../components/CommentForm"
import Comments from "../components/Comments"


class PostDetail extends Component {


    componentWillMount() {
        const postId = this.props.match.params.postId
        //get post from server when not already available(e.g. deep linked)
        if (!(this.props.posts && this.props.posts[postId])) {
            this.props.getPost(postId)
        }
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

    submitComment(postId, name, comment) {
        this.props.addCommentAndFetch(postId, {
            body: comment,
            author: name
        })
    }

    likePost(postId) {
        this.props.likePost(postId)
    }

    dislikePost(postId) {
        this.props.likePost(postId, true)
    }

    deletePost(postId) {
        this.props.deletePost(postId)
        this.props.history.push('/')
    }

    editPost(postId) {
        this.props.history.push(`/edit/${postId}`)
    }


    render() {

        const postId = this.props.match.params.postId
        const selectedPost = this.props.posts ? this.props.posts[postId] : null
        const all_comments = this.props.comments
        const comments = selectedPost? selectedPost.comments.map( comment_id => all_comments[comment_id]):[]
        return (
            <div>
                {selectedPost &&
                (
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <SinglePost
                                    post={selectedPost}
                                    comments={comments}
                                    onEditPost={this.editPost.bind(this)}
                                    onDeletePost={this.deletePost.bind(this)}
                                    onLikePost={this.likePost.bind(this)}
                                    onDislikePost={this.dislikePost.bind(this)}/>
                                <hr/>
                                <Comments comments={comments}/>
                                <hr/>
                                <CommentForm postId={selectedPost.id} submitComment={this.submitComment.bind(this)}/>

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
    getPost, getComments, addCommentAndFetch, likePost, deletePost
})(PostDetail))