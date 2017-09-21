import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom"
import {truncate} from "../util/textutil"
class RecentCommentsPanel extends Component {
    getComments() {
        const {comments} = this.props
        return comments.map( comment => (
            <li key={comment.id} className="list-group-item"><Link
                to={`/post/${comment.parentId}#${comment.id}`}>{truncate(comment.body, 30, "...")}</Link>
                        </li>
        ))
    }

    render() {
        return (
            <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4>Recent Comments</h4>
                    </div>
                    <ul className="list-group">
                        {this.getComments()}
                    </ul>
                </div>
        );
    }
}

RecentCommentsPanel.propTypes = {
    comments:  PropTypes.array.isRequired
};
RecentCommentsPanel.defaultProps = {
    comments: ["No Comments Found!"]
};


export default RecentCommentsPanel;
