import React, {Component} from 'react'
import _ from 'lodash'
import 'bootstrap-select/dist/css/bootstrap-select.css'
import 'react-select/dist/react-select.css'
import PostSnippet from "./PostSnippet"
import PropTypes from "prop-types"
import {sort} from "../util/textutil"

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

    changeSortBy(e) {
        const val = e.target.value
        this.props.onSortChange(val, this.props.sortDirection)
    }

    changeSortDirection(e) {
        const val = e.target.value
        this.props.onSortChange(this.props.sortBy, val)
    }

    render() {

        const {comments, posts, category, sortBy, sortDirection} = this.props


        return (
            <div>
                <div className="row">
                    <div className="col-md-5">
                        {category === "all" && <span className="strong">LATEST POSTS</span>}
                        {category && category !== "all" && <span className="strong">{category.toUpperCase()}</span>}
                    </div>

                    <div className="col-md-2"/>
                    <div className="col-md-5 text-right">

                        <form className="form-inline">
                            <span htmlFor="sel1" className="xs-padding strong">SORT BY </span>

                            <select value={sortBy} onChange={this.changeSortBy.bind(this)} className="form-control" id="sel1">
                                <option value="voteScore"
                                >Votes</option>
                                <option
                                    value="timestamp"
                                >Date</option>
                            </select>

                            <select value={sortDirection} onChange={this.changeSortDirection.bind(this)} className="form-control" id="sel1">
                                <option value="desc">DESC</option>
                                <option value="asc">ASC</option>
                            </select>

                        </form>


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

