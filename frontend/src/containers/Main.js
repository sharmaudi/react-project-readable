import React, {Component} from 'react';
import {connect} from 'react-redux'
import {getPosts, getPostsForCategory, init} from "../actions"
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


    render() {
        const {posts, comments} = this.props.blog
        const {categoryName} = this.props.match.params

        const postsInCategory = categoryName === "all" ? posts : _.values(posts).filter(post => post.category === categoryName)

        return (
            <div>
                <PostList posts={postsInCategory} category={categoryName} comments={comments}/>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        blog: state.blog,
        connection: state.connection
    }
}


export default withRouter(connect(mapStateToProps, {
    getPosts, getPostsForCategory, init
})(Main))