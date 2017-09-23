import React, {Component} from 'react'
import PropTypes from 'prop-types'

class SortForm extends Component {

    changeSortBy(e) {
        const val = e.target.value
        this.props.onSortChange(val, this.props.sortDirection)
    }

    changeSortDirection(e) {
        const val = e.target.value
        this.props.onSortChange(this.props.sortBy, val)
    }

    render() {
        const {sortBy, sortDirection, sortKeys} = this.props
        return (
            <form className="form-inline">
                            <span htmlFor="sel1" className="xs-padding strong">SORT BY </span>

                            <select value={sortBy} onChange={this.changeSortBy.bind(this)} className="form-control"
                                    id="sel1">

                                {sortKeys.map(option => (
                                    <option key={option.key} value={option.key}>{option.value}
                                    </option>
                                ))}

                            </select>

                            <select value={sortDirection} onChange={this.changeSortDirection.bind(this)}
                                    className="form-control" id="sel1">
                                <option value="desc">DESC</option>
                                <option value="asc">ASC</option>
                            </select>

                        </form>
        );
    }
}

SortForm.propTypes = {
    sortBy: PropTypes.string,
    sortDirection: PropTypes.string,
    sortKeys: PropTypes.array,
    onSortChange: PropTypes.func

};
SortForm.defaultProps = {};

export default SortForm;
