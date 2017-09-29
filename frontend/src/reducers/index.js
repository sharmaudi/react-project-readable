import {combineReducers} from "redux"
import blog from './blogReducer'
import connection from './connectionReducer'
import ui from './uiReducer'


const rootReducer = combineReducers({
    blog,
    connection,
    ui
})

export default rootReducer