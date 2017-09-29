import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {addComment,
    getComments,
    getPost,
    likePost,
    deletePost,
    updateComment,
    deleteComment,
    likeComment,
    changeSortParams} from "../actions/index"
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

    changeSortMethod(sortBy, sortDirection) {
        this.props.changeSortParams("comment", sortBy, sortDirection)

    }

    submitComment(postId, name, comment) {
        this.props.addComment(postId, {
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

     likeComment(commentId) {
        const postId = this.props.match.params.postId
        this.props.likeComment(postId,commentId)
    }

    dislikeComment(commentId) {
        const postId = this.props.match.params.postId
        this.props.likeComment(postId, commentId, true)
    }

    deletePost(postId) {

        this.props.deletePost(postId)
        this.props.history.push('/')
    }

    editPost(postId) {
        this.props.history.push(`/edit/${postId}`)
    }

    updateComment(comment) {
        const postId = this.props.match.params.postId
        this.props.updateComment(postId, comment)
    }

    deleteComment(commentId) {
        const postId = this.props.match.params.postId
        this.props.deleteComment(postId, commentId)
    }


    render() {

        const postId = this.props.match.params.postId
        const selectedPost = this.props.posts ? this.props.posts[postId] : null
        const all_comments = this.props.comments
        const comments = selectedPost? selectedPost.comments.map( comment_id => all_comments[comment_id]):[]
        const {comment_sort_by, comment_sort_direction, sort_by_keys} = this.props.ui
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
                                <Comments comments={comments}
                                          onDeleteComment={this.deleteComment.bind(this)}
                                          onUpdateComment={this.updateComment.bind(this)}
                                          sortKeys={sort_by_keys}
                                          sortBy={comment_sort_by}
                                          sortDirection={comment_sort_direction}
                                          onLikeComment={this.likeComment.bind(this)}
                                          onDislikeComment={this.dislikeComment.bind(this)}
                                          onSortChange={this.changeSortMethod.bind(this)}
                                />
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

const mapStateToProps = ({blog, connection, ui}) => {
    const {posts, comments} = blog
    return {
        posts,
        comments,
        connection,
        ui
    }
}

export default withRouter(connect(mapStateToProps, {
    getPost,
    getComments,
    addComment,
    likePost,
    deletePost,
    updateComment,
    deleteComment,
    likeComment,
    changeSortParams
})(PostDetail))