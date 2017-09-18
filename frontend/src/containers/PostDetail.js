import React, {Component} from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import {getPost} from "../actions/index"


class PostDetail extends Component {

    componentWillMount() {
        const postId = this.props.match.params.postId

        //get post from server when not already available(e.g. deep linked)
        if(!(this.props.posts && this.props.posts[postId])) {
            this.props.getPost(postId)
        }

    }


    render() {

        console.log(this.props.posts)
        const postId = this.props.match.params.postId
        const selectedPost = this.props.posts? this.props.posts[postId]:[]
        console.log("Selected Post:")
        console.log(selectedPost)
        return (
            <div>
            {selectedPost  && <div>{selectedPost.title}</div>}
            </div>
        );
    }
}

PostDetail.propTypes = {};
PostDetail.defaultProps = {};


const mapStateToProps = (state, ownProps) => {
    console.log("MapStateToProps")
    return {
        posts : state.posts.posts,
    }
}

export default withRouter(connect(mapStateToProps, {
getPost
})(PostDetail))