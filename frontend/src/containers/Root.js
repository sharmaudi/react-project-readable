import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux'
import Header from "../components/Header"
import '../css/App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import Main from "./Main"
import PostDetail from "./PostDetail"
import SideBar from "./SideBar"
import {Route} from "react-router-dom"

class Root extends Component {

    componentWillMount() {
        console.log("Component root will mount")
    }


    render() {
        const {store} = this.props
        return (
            <Provider store={store}>
                <div>
                    <Header/>
                    <div className="container">
                        <div className="row row-offcanvas row-offcanvas-right">
                            <div className="col-xs-12 col-sm-9">
                                <Route exact path="/" component={Main}/>
                                <Route exact path="/category/:categoryName" component={Main}/>
                                <Route exact path="/post/:postId" component={PostDetail}/>
                            </div>
                            <div className="col-xs-6 col-sm-3 sidebar-offcanvas" id="sidebar">
                                <SideBar/>
                            </div>
                        </div>
                    </div>
                </div>

            </Provider>
        )
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
}

export default Root
