import React from 'react'
import '../css/App.css';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

const Header = (props) => (
    <nav className="navbar navbar-inverse navbar-fixed-top bs-docs-nav" role="banner">
        <div className="container">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                        aria-expanded="false" aria-controls="navbar">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"/>
                    <span className="icon-bar"/>
                    <span className="icon-bar"/>
                </button>
                <Link to="/" className="navbar-brand">Readable</Link>
            </div>
            <div id="navbar" className="collapse navbar-collapse">
                <ul className="nav navbar-nav">

                    <li className={props.currentRoute.startsWith('/category') ? "active" : ""}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className={props.currentRoute === "/post/create" ? "active" : ""}>
                        <Link
                            to="/create"
                            >
                            Add Post</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
)


Header.propTypes = {
    currentRoute: PropTypes.string
};
Header.defaultProps = {
    currentRoute: "/"
};
export default Header