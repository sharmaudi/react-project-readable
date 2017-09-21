import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux'
import Header from "../components/Header"
import '../css/App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import Main from "./Main"
import PostDetail from "./PostDetail"
import SideBar from "./SideBar"
import {Route, Redirect} from "react-router-dom"
import {init} from "../actions"
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'




class Root extends Component {

    componentWillMount() {
        console.log("Component root will mount")
        this.props.init()

    }


    render() {
        const {store} = this.props
        return (
            <Provider store={store}>
                <div>
                    <Header/>

                    <div className="container sm-margin-top">
                        <div className="row">
                            <div className="col-md-8">

                                <Route exact path="/" render={
                                    (props) => (
                                        <Redirect to="/category/all"/>
                                    )
                                }/>
                                <Route exact path="/category/:categoryName" component={Main}/>
                                <Route exact path="/post/:postId" component={PostDetail}/>
                            </div>
                            <div className="col-md-4">
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


const mapStateToProps = (state) => {
    return {
        posts : state.posts,
        connection: state.connection
    }
}



export default withRouter(connect(mapStateToProps, {
  init
})(Root))