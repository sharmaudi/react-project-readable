import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect, Provider} from 'react-redux'
import Header from "../components/Header"
import '../css/App.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import Main from "./Main"
import PostDetail from "./PostDetail"
import SideBar from "./SideBar"
import {Redirect, Route, Switch, withRouter} from "react-router-dom"
import {init} from "../actions"
import AddOrUpdatePost from "./AddOrUpdatePost"
import ErrorPage from "../components/ErrorPage"
import Loader from 'halogenium/lib/BounceLoader';


class Root extends Component {

    componentWillMount() {
        console.log("Component root will mount")
        this.props.init()

    }


    render() {
        const {store, connection} = this.props

        if (!connection.error && !connection.init_pending) {
            return (

                <Provider store={store}>

                    <div>
                        <Header currentRoute={this.props.location.pathname}/>

                        <div className="container sm-margin-top">
                            <div className="row">
                                <div className="col-md-8">

                                    <Switch>

                                        <Route exact path="/" render={
                                            (props) => (
                                                <Redirect to="/category/all"/>
                                            )
                                        }/>
                                        <Route exact path="/category/:categoryName" component={Main}/>
                                        <Route exact path="/post/:postId" component={PostDetail}/>
                                        <Route exact path="/edit/:postId" component={AddOrUpdatePost}/>
                                        <Route exact path="/create" component={AddOrUpdatePost}/>
                                        <Route component={ErrorPage}/>
                                    </Switch>
                                </div>
                                <div className="col-md-4">
                                    <SideBar/>
                                </div>
                            </div>
                        </div>


                    </div>


                </Provider>
            )
        } else if(connection.init_pending || connection.pending) {
            return <div>
                <Loader color="#26A65B" size="16px" margin="4px"/>
            </div>
        } else if(connection.error) {
            return <ErrorPage/>
        }

    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
}


const mapStateToProps = ({blog, connection}) => {
    const {posts, comments} = blog
    return {
        posts,
        comments,
        connection
    }
}


export default withRouter(connect(mapStateToProps, {
    init
})(Root))