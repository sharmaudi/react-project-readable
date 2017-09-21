import React, {Component} from 'react';
import EditPostForm from "../components/EditPostForm"

import {createPost, updatePost} from "../actions/index"
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'


class AddOrUpdatePost extends Component {



    componentWillMount() {
        if (!this.props.posts && !this.props.connection.pending) {
            this.props.getPosts()
        }

    }

    createOrUpdatePost(data, postId) {

        if (postId) {
            console.log("Updating post", data)
            this.props.updatePost(postId, data)
        } else {
            console.log("Creating post", data)
            this.props.createPost(data)
        }

    }


    render() {
        const postId = this.props.match.params.postId

        let post = {}
        if (postId && this.props.posts) {
            post = this.props.posts[postId]
        }

        const oper = this.props.location.pathname.startsWith('/create') ? "create" : "edit"

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <EditPostForm onSubmit={this.createOrUpdatePost.bind(this)} post={post} operation={oper}/>
                    </div>
                </div>
            </div>
        );
    }
}

AddOrUpdatePost.propTypes = {};
AddOrUpdatePost.defaultProps = {};


const mapStateToProps = (state) => {
    return {
        posts: state.blog.posts,
        connection: state.connection
    }
}

export default withRouter(connect(mapStateToProps, {
    createPost, updatePost
})(AddOrUpdatePost))
