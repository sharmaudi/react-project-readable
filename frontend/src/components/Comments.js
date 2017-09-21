import React, {Component} from 'react';
import PropTypes from "prop-types"
import {formatDate} from "../util/dateutil"

class Comments extends Component {

    showComments() {
        const comments = this.props.comments
        return comments.map(comment => (
            <li className="comment" key={comment.id}>
                    <div className="clearfix">
                        <h4 className="pull-left">{comment.author}</h4>
                        <p className="pull-right">{formatDate(comment.timestamp)}</p>
                    </div>
                    <p>
                        <em>{comment.body}</em>
                    </p>
            </li>
        ))
    }

    render() {
        return (
            
            
            <div className="well"><ul id="comments" className="comments">
                {this.showComments()}
            </ul></div>
            
        );
    }
}

Comments.propTypes = {
    comments:PropTypes.object.isRequired
};
Comments.defaultProps = {};

export default Comments;
