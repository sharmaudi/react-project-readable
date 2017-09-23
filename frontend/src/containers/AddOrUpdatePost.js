import React, {Component} from 'react'
import EditPostForm from "../components/EditPostForm"

import {createPost, updatePost} from "../actions/index"
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import _ from "lodash"


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
            this.props.history.push(`/post/${postId}`)

        } else {
            console.log("Creating post", data)
            this.props.createPost(data)
            this.props.history.push(`/`)
        }

    }


    render() {
        const postId = this.props.match.params.postId

        let post = {}
        if (postId && this.props.posts) {
            post = this.props.posts[postId]
        }

        const oper = this.props.location.pathname.startsWith('/create') ? "create" : "edit"

        const categories = this.props.categories

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <EditPostForm onSubmit={this.createOrUpdatePost.bind(this)} post={post} operation={oper} categories={categories}/>
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
        connection: state.connection,
        categories: _.values(state.blog.categories)
    }
}

export default withRouter(connect(mapStateToProps, {
    createPost, updatePost
})(AddOrUpdatePost))
