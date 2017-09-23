import React, {Component} from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getCategories} from "../actions"
import CategoryList from "../components/CategoryList"
import LatestPostsPanel from "../components/LatestPostsPanel"
import RecentCommentsPanel from "../components/RecentCommentsPanel"
import _ from "lodash"



class SideBar extends Component {

    componentWillMount() {

        //Load categories if not already loaded
        if(!this.props.categories && !this.props.connection.pending) {
            this.props.getCategories()
        }
    }




    render() {
        const {categories, selectedCategory,posts, comments} = this.props

        console.log("Updating comments", comments)

        let passedComments = _.sortBy(_.values(comments), o => o.timestamp).reverse()
        let passedPosts = _.sortBy(_.values(posts), o => o.timestamp).reverse()


        if (passedComments && passedComments.length > 5) {
            passedComments = _.slice(passedComments, 0, 5)
        }

        if (passedPosts && passedPosts.length > 5) {
            passedPosts = _.slice(passedPosts, 0, 5)
        }

        return (
            <div>
                <CategoryList categories={categories} selectedCategory={selectedCategory}/>
                <LatestPostsPanel posts={passedPosts}/>
                <RecentCommentsPanel comments={passedComments}/>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        categories: state.blog.categories,
        selectedCategory: state.blog.selected_category,
        connection: state.connection,
        posts: state.blog.posts,
        comments: state.blog.comments
    }
}


SideBar.propTypes = {};
SideBar.defaultProps = {};


export default withRouter(connect(mapStateToProps, {
    getCategories
})(SideBar))