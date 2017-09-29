import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPosts, getPostsForCategory, init, changeSortParams, likePost} from "../actions"
import Spinner from "react-spinkit"
import {withRouter} from 'react-router-dom'
import PostList from "../components/PostList"
import _ from "lodash"


class Main extends Component {

    spin() {
        return (
            <Spinner name="three-bounce" color="coral"/>
        )
    }


    refresh(category) {
        if (category) {
            console.log(`Loading posts for category ${category}`)
            this.props.getPostsForCategory(category)
        } else {
            if (!this.props.blog && !this.props.connection.pending)
                this.props.getPosts()
        }
    }

    componentWillMount() {
        const category = this.props.match.params.categoryName
        this.refresh(category)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const category = this.props.match.params.categoryName
        const newCategory = nextProps.match.params.categoryName

        if (category !== newCategory) {
            this.refresh(newCategory)
        }
    }

    changeSortMethod(sortBy, sortDirection) {
        this.props.changeSortParams("post", sortBy, sortDirection)

    }

    likePost(postId) {
        this.props.likePost(postId)
    }

    dislikePost(postId) {
        this.props.likePost(postId, true)
    }



    render() {
        const {posts, comments} = this.props.blog
        const {categoryName} = this.props.match.params
        const {post_sort_by, post_sort_direction, sort_by_keys} = this.props.ui

        const postsInCategory = categoryName === "all" ? posts : _.values(posts).filter(post => post.category === categoryName)

        return (
            <div>
                <PostList posts={postsInCategory}
                          category={categoryName}
                          comments={comments}
                          sortBy={post_sort_by}
                          sortDirection={post_sort_direction}
                          sortKeys={sort_by_keys}
                          onSortChange={this.changeSortMethod.bind(this)}
                          onLikePost={this.likePost.bind(this)}
                          onDislikePost={this.dislikePost.bind(this)}
                />
            </div>
        );
    }
}


const mapStateToProps = ({blog, connection, ui}) => {
    return {
        blog,
        connection,
        ui
    }
}


export default withRouter(connect(mapStateToProps, {
    getPosts, getPostsForCategory, init, changeSortParams, likePost
})(Main))