import React, {Component} from 'react'
import _ from 'lodash'
import 'bootstrap-select/dist/css/bootstrap-select.css'
import 'react-select/dist/react-select.css'
import PostSnippet from "./PostSnippet"
import PropTypes from "prop-types"
import {sort} from "../util/textutil"
import SortForm from "./SortForm"


class PostList extends Component {

    renderPosts(origPosts, comments) {
        const {sortBy, sortDirection} = this.props

        const posts = sort(_.values(origPosts), sortBy, sortDirection)

        if (posts && posts.length > 0) {
            return posts.map(post => {
                console.log(post)

                let commentCount = 0
                if (comments) {
                    commentCount = _.values(comments).filter(comment => comment.parentId === post.id).length
                }

                return (
                    <PostSnippet key={post.id} post={post} commentCount={commentCount}/>

                )
            })
        } else {
            return (<li key="1">No Posts yet.</li>)
        }
    }

    render() {

        const {comments, posts, category, sortBy, sortDirection, sortKeys, onSortChange} = this.props


        return (
            <div>
                <div className="row">
                    <div className="col-md-5">
                        {category === "all" && <span className="strong">LATEST POSTS</span>}
                        {category && category !== "all" && <span className="strong">{category.toUpperCase()}</span>}
                    </div>

                    <div className="col-md-2"/>
                    <div className="col-md-5 text-right">

                        <SortForm sortKeys={sortKeys}
                                  sortBy={sortBy}
                                  sortDirection={sortDirection}
                                  onSortChange={onSortChange}
                        />

                    </div>
                </div>
                {this.renderPosts(posts, comments)}
            </div>
        );
    }
}

PostList.propTypes = {
    comments: PropTypes.object,
    posts: PropTypes.object,
    category: PropTypes.string.isRequired,
    sortBy: PropTypes.string,
    sortDirection: PropTypes.string,
    sortKeys: PropTypes.array,
    onSortChange: PropTypes.func
};
PostList.defaultProps = {};

export default PostList;

