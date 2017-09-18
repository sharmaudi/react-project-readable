import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import _ from 'lodash'

class CategoryList extends Component {

    componentDidMount() {

    }

    renderCategories() {
        const {categories, selectedCategory} = this.props

        if (categories) {
            const catArray = _.values(categories)
            return catArray.map(category => {

                console.log(`Selected category is ${selectedCategory}`)

                if(category.name === selectedCategory)  {
                    return (
                        <Link to={"/category/" + category.path}
                             className="list-group-item active"
                              selected="true"
                             key={category.name}>
                    {category.name}
                </Link>
                    )
                } else {
                    return (
                        <Link to={"/category/" + category.path}
                             className="list-group-item"
                             key={category.name}>
                    {category.name}
                </Link>
                    )
                }


            })
        } else {
            return null
        }

    }


    render() {
        return (
            <div className="list-group">
                {this.renderCategories()}
            </div>
        );
    }
}

CategoryList.propTypes = {};
CategoryList.defaultProps = {};

export default CategoryList;
