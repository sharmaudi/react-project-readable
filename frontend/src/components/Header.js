import React from 'react'
import '../css/App.css';
import {Link} from 'react-router-dom'

const Header = (props) => (
        <nav className="navbar navbar-inverse navbar-fixed-top bs-docs-nav" role="banner">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"/>
            <span className="icon-bar"/>
            <span className="icon-bar"/>
          </button>
          <Link to="/" className="navbar-brand">Readable</Link>
        </div>
        <div id="navbar" className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li className="active"><Link to="/">Home</Link></li>
          </ul>
        </div>
      </div>
    </nav>
)

export default Header