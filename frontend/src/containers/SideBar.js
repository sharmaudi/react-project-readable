import React, {Component} from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import {getCategories} from "../actions"
import CategoryList from "../components/CategoryList"



class SideBar extends Component {

    componentWillMount() {
        this.props.getCategories()
    }


    render() {
        const {categories,selectedCategory} = this.props
        return (
                <CategoryList categories={categories} selectedCategory={selectedCategory}/>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        categories : state.posts.categories,
        selectedCategory: state.posts.selected_category,
        connection: state.connection
    }
}


SideBar.propTypes = {};
SideBar.defaultProps = {};



export default withRouter(connect(mapStateToProps, {
  getCategories
})(SideBar))