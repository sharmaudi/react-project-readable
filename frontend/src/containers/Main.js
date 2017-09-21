import React, { Component } from 'react';
import {connect} from 'react-redux'
import {getPosts, getPostsForCategory, init} from "../actions"
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
          console.log(`Loading posts for category ${category}`)
          this.props.getPostsForCategory(category)
      } else {
          if(!this.props.blog && !this.connection.pending)
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
    const {posts,comments} = this.props.blog
    const {match} = this.props


    return (
      <div>
          <PostList posts={posts} category={match.params.categoryName} comments={comments}/>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
    return {
        blog : state.blog,
        connection: state.connection
    }
}


export default withRouter(connect(mapStateToProps, {
  getPosts, getPostsForCategory, init
})(Main))