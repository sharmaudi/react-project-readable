import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

class LatestPostsPanel extends Component {

    getPosts() {
        const {posts} = this.props
        return posts.map( post => (
            <li key={post.id} className="list-group-item"><Link
                to={`/post/${post.id}`}>{post.title}</Link>
                        </li>
        ))
    }


    render() {
        return (
            <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4>Latest Posts</h4>
                    </div>
                    <ul className="list-group">
                        {this.getPosts()}
                    </ul>
                </div>
        );
    }
}

LatestPostsPanel.propTypes = {
    posts:  PropTypes.array.isRequired
};
LatestPostsPanel.defaultProps = {
    posts: ["No Posts Found!"]
};

export default LatestPostsPanel;
