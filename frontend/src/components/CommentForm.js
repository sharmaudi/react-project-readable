import React, {Component} from 'react'
import {Form, Text, Textarea} from 'react-form'


class CommentForm extends Component {
    formConfig = {

        onSubmit: (values) => {
            console.log("Success!", values)
            this.props.submitComment(this.props.postId, values.name, values.comment)
            values.name=""
            values.comment=""
        },

        defaultValues: {name: ''},

        validate: values => {
            const {name, comment} = values

            return {
                name: !name ? 'Name is required' : undefined,
                comment: !comment ? 'Comment is required' : undefined
            }
        },

        onValidationFail: () => {
            alert('Form validation failed. Please have a look.')
        },


    }


    render() {
        return (
            <div className="well">
                <h4>Leave a comment</h4>
                <Form
                    onSubmit={this.formConfig.onSubmit}
                    defaultValues={this.formConfig.defaultValues}
                    validate={this.formConfig.validate}
                    onValidationFail={this.formConfig.onValidationFail}
                >
                    {({submitForm, values}) => {
                        return (
                            <form onSubmit={submitForm} className="clearfix">
                                <div className="col-md-12 form-group">
                                    <label className="sr-only" htmlFor="name">Name</label>
                                    <Text field="name" className="form-control" id="name" placeholder="Name"/>
                                </div>

                                <div className="col-md-12 form-group">
                                    <label className="sr-only" htmlFor="comment">Comment</label>
                                    <Textarea field="comment" rows="6" className="form-control" placeholder="Comment"/>
                                </div>
                                <div className="col-md-12 form-group text-right">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        )
                    }}

                </Form>
            </div>
        );
    }
}

CommentForm.propTypes = {};
CommentForm.defaultProps = {};

export default CommentForm;
