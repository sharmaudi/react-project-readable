import React, {Component} from 'react';
import {Form, Text, Textarea, Select} from 'react-form'
import PropTypes from "prop-types"


class EditPostForm extends Component {


    config() {
        const {operation, post, categories} = this.props

        const defaults = operation === "edit" ? post : {author: "anonymous"}
        const options = categories?categories.map(category => ({
            label: category.name, value: category.name
        })):[{label:'react', value:'react'}]

        console.log("Options:",options)

        return {

            onSubmit: (values) => {
                console.log("Success!", values)
                if (operation === "edit") {
                    this.props.onSubmit(values, post.id)
                } else {
                    this.props.onSubmit(values)
                }
            },

            defaultValues: defaults,

            validate: values => {
                const {title, author, category, body} = values

                return {
                    title: !title ? 'Title is required' : undefined,
                    author: !author ? 'Author is required' : undefined,
                    category: !category ? 'Category is required' : undefined,
                    body: !body ? 'Body is required' : undefined

                }
            },

            onValidationFail: () => {
                alert('Form validation failed. Please have a look.')
            },

            categoryOptions: options

        }
    }


    render() {

        const config = this.config()


        return (
            <div className="well">
                <h1>Create Post</h1>
                <Form
                    onSubmit={config.onSubmit}
                    defaultValues={config.defaultValues}
                    validate={config.validate}
                    onValidationFail={config.onValidationFail}
                >
                    {({submitForm, values}) => {
                        return (
                            <form className="xs-margin-top form-horizontal clearfix" onSubmit={submitForm}>

                                <div className="form-group">
                                    <label htmlFor="title" className="col-md-2">Title</label>
                                    <div className="col-md-10">
                                        <Text className="form-control" field="title" placeholder="Title"/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="author" className="col-md-2">Author</label>
                                    <div className="col-md-10">
                                        <Text className="form-control" field="author"
                                              placeholder="Author"/>
                                    </div>
                                </div>


                                <div className="form-group">
                                    <label htmlFor="category" className="col-md-2">Category</label>
                                    <div className="col-md-10">
                                        <Select
                                            className="form-control"
                                            field="category"
                                            options={config.categoryOptions}
                                            placeholder="Category"/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="body" className="col-md-2">Body</label>
                                    <div className="col-md-10">
                                            <Textarea
                                                className="form-control"
                                                rows="10"
                                                field="body"
                                                placeholder="Body"/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="col-md-12 text-right">
                                        <button type="submit" className="btn btn-lg btn-primary">Submit!
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )
                    }}

                </Form>

            </div>


        );
    }
}

EditPostForm.propTypes = {
    post: PropTypes.object,
    categories: PropTypes.array,
    onSubmit: PropTypes.func.isRequired,
    operation: PropTypes.string
};
EditPostForm.defaultProps = {};

export default EditPostForm;
