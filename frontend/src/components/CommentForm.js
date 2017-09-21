import React, {Component} from 'react';

class CommentForm extends Component {
    render() {
        return (
            <div className="well">
                <h4>Leave a comment</h4>
                <form className="clearfix">
                    <div className="col-md-6 form-group">
                        <label className="sr-only" htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" placeholder="Name"/>
                    </div>
                    <div className="col-md-6 form-group">
                        <label className="sr-only" htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="Email"/>
                    </div>
                    <div className="col-md-12 form-group">
                        <label className="sr-only" htmlFor="email">Comment</label>
                        <textarea className="form-control" id="comment" placeholder="Comment"/>
                    </div>
                    <div className="col-md-12 form-group text-right">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

CommentForm.propTypes = {};
CommentForm.defaultProps = {};

export default CommentForm;
