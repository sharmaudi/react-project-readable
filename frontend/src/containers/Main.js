import React, { Component } from 'react';
import {connect} from 'react-redux'
import {getPosts, getPostsForCategory} from "../actions"
import Spinner from "react-spinkit"
import { withRouter } from 'react-router-dom'
import PostList from "../components/PostList"

class Main extends Component {

  spin() {
      return (
          <Spinner name="three-bounce" color="coral"/>
      )
  }


  refresh(category) {
      if(category) {
          console.log(`Loading category ${category}`)
          this.props.getPostsForCategory(category)
      } else {
          console.log('Loading all posts')
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

        if(category !== newCategory) {
            this.refresh(newCategory)
        }
    }


    render() {
    const {posts, pending} = this.props.posts
    const {match} = this.props


    return (
      <div>
          {pending && this.spin()}
          <PostList posts={posts} category={match.params.categoryName}/>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
    return {
        posts : state.posts,
        connection: state.connection
    }
}


export default withRouter(connect(mapStateToProps, {
  getPosts, getPostsForCategory
})(Main))