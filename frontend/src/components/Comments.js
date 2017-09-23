import React, {Component} from 'react'
import PropTypes from "prop-types"
import {formatDate} from "../util/dateutil"
import Modal from 'react-modal'
import {sort} from "../util/textutil"
import SortForm from "./SortForm"

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class Comments extends Component {

    constructor() {
        super();

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.updateComment = this.updateComment.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.removeComment = this.removeComment.bind(this);
    }

    state = {
        modalIsOpen: false,
        selectedComment: {},
        updatedComment: {}
    }

    openModal(comment) {
        this.setState({
            modalIsOpen: true,
            selectedComment: comment,
            updatedComment: comment
        });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.

    }

    closeModal() {
        this.setState({
                modalIsOpen: false,
                selectedComment: {},
                updatedComment: {}
            }
        );
    }


    handleCommentChange(e, field) {
        console.log("Updating comment")
        e.preventDefault()
        this.setState({
            ...this.state, updatedComment: {...this.state.updatedComment, [field]: e.target.value}
        })
    }

    updateComment() {
        if (this.state.selectedComment.body !== this.state.updatedComment.body) {
            console.log("Updating comment to ", this.state.updatedComment)
            this.props.onUpdateComment(this.state.updatedComment)
            this.closeModal()
        } else {
            console.log("No changes to comment. Not updating.")
            this.closeModal()
        }

    }


    removeComment(commentId) {
        console.log("Removing comment " + commentId)
        this.props.onDeleteComment(commentId)
    }

    showComments() {
        const origComments = this.props.comments
        const {sortBy, sortDirection} = this.props
        const comments = sort(origComments, sortBy, sortDirection)

        console.log("Sorted Comments: ", comments)

        if (comments.length > 0) {

            return comments.map(comment => (
                <li className="comment" key={comment.id}>
                    <div className="clearfix">
                        <h4 id={comment.id} className="pull-left">
                            {comment.author}


                        </h4>

                        <span className="pull-right">
                            <span className="sm-padding">
                            <a href="#edit"
                               onClick={(e) => {
                                   this.openModal(comment)
                               }

                               }
                               className="sm-padding"
                               title="Edit comment"
                            >
                                <span className="glyphicon glyphicon-edit xs-padding"/>
                            </a>

                            <a href="#remove"
                               onClick={(e) => {
                                   e.preventDefault()
                                   this.removeComment(comment.id)
                               }}
                               className="xs-padding"
                               title="Remove comment"
                            >
                            <span className="glyphicon glyphicon-remove xs-padding"/>
                            </a>
                        </span>


                            {formatDate(comment.timestamp)}

                        </span>

                    </div>
                    <div className="clearfix">
                        <em className="sm-padding">{comment.body}</em>

                        <span className="sm-padding pull-right">
                            <span className="glyphicon glyphicon-heart xs-padding"/>
                            {comment.voteScore}
                        </span>

                        <span className="sm-padding pull-right">
                            <a href="#edit"
                               onClick={(e) => {
                                   e.preventDefault()
                                   this.props.onLikeComment(comment.id)
                               }

                               }
                               className="sm-padding"
                               title="Edit comment"
                            >
                                <span className="glyphicon glyphicon-thumbs-up xs-padding"/>
                            </a>

                            <a href="#remove"
                               onClick={(e) => {
                                   e.preventDefault()
                                   this.props.onLikeComment(comment.id)
                               }

                               }
                               className="sm-padding"
                               title="Remove comment"
                            >
                            <span className="glyphicon glyphicon-thumbs-down xs-padding"/>
                            </a>
                        </span>


                    </div>
                    <hr/>
                </li>
            ))
        } else {
            return (
                <li className="comment" key="1">
                    <p>
                        <em>No Comments yet</em>
                    </p>
                </li>
            )
        }


    }

    render() {
        const {sortBy, sortDirection, sortKeys} = this.props
        return (

            <div className="well">

                <div className="row">
                    <div className="col-md-5">
                        <strong>COMMENTS</strong>
                    </div>

                    <div className="col-md-2"/>
                    <div className="col-md-5 text-right">

                        <SortForm sortKeys={sortKeys}
                                  sortBy={sortBy}
                                  sortDirection={sortDirection}
                                  onSortChange={this.props.onSortChange}
                        />

                    </div>
                </div>


                <hr/>
                <ul id="comments" className="comments">
                    {this.showComments()}
                </ul>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >

                    <h4>Edit Comment</h4>
                    <form className="clearfix">
                        <div className="col-md-12 form-group">
                            <label className="sr-only" htmlFor="name">Name</label>
                            <input className="form-control"
                                   id="name"
                                   readOnly="true"
                                   onChange={
                                       e => {
                                           this.handleCommentChange(e, "author")
                                       }
                                   }
                                   value={this.state.updatedComment.author}
                                   placeholder="Name"/>
                        </div>

                        <div className="col-md-12 form-group">
                            <label className="sr-only" htmlFor="comment">Comment</label>
                            <textarea rows="6"
                                      className="form-control"
                                      onChange={
                                          e => {
                                              this.handleCommentChange(e, "body")
                                          }
                                      }
                                      value={this.state.updatedComment.body}
                                      placeholder="Comment"/>
                        </div>
                        <div className="col-md-12 form-group text-right">
                            <button type="cancel"
                                    onClick={this.closeModal}
                                    className="btn btn-primary pull-left">Cancel
                            </button>
                            <button type="submit"
                                    onClick={this.updateComment}
                                    className="btn btn-primary">Submit
                            </button>
                        </div>
                    </form>
                </Modal>
            </div>

        );
    }
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired,
    onDeleteComment: PropTypes.func.isRequired,
    onUpdateComment: PropTypes.func.isRequired,
    sortBy: PropTypes.string,
    sortDirection: PropTypes.string,
    sortKeys: PropTypes.array,
    onSortChange: PropTypes.func,
    onLikeComment: PropTypes.func,
    onDislikeComment: PropTypes.func
};
Comments.defaultProps = {};

export default Comments;
