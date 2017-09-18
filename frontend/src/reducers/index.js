import {ActionTypes} from "../actions/index"
import {combineReducers} from "redux"

const initialState = {}

const isFullfilled = (action, desiredActionType) => action.type === (desiredActionType + "_FULFILLED")
const api_success = (type) => type.indexOf("_FULFILLED") !== -1
const api_pending = (type) => type.indexOf("_PENDING") !== -1
const api_failure = (type) => type.indexOf("_REJECTED") !== -1


const normalizePosts = (posts) => {
    return posts.reduce(function (accumulator, value) {
        accumulator[value.id] = value
        return accumulator

    }, {})
}

const normalizeCategories = (categories) => {
    return categories.reduce(function (accumulator, value) {
        accumulator[value.name] = value
        return accumulator
    }, {})
}

const posts = (state = initialState, action) => {

    if (isFullfilled(action, ActionTypes.GET_POSTS)) {
        return {...state, posts: normalizePosts(action.payload.data), selected_category: null}
    }


    if (isFullfilled(action, ActionTypes.GET_CATEGORIES)) {
        return {...state, categories: normalizeCategories(action.payload.data.categories)}
    }

    if (isFullfilled(action, ActionTypes.GET_POSTS_FOR_CATEGORY)) {
        return {...state, posts: normalizePosts(action.payload.data), selected_category: action.meta.category}
    }

    if (isFullfilled(action, ActionTypes.GET_POST)) {

        return {...state, posts: {...state.posts, [action.payload.data.id]:action.payload.data}, selected_post: action.meta.postId}
    }

    return state
}

const connectionProps = (state = {
    pending: false,
    error: false,
    error_message: null
}, action) => {
    const {type} = action


    if (api_success(type)) {
        return {...state, pending: false, error: false, error_message: null}
    }

    if (api_failure(type)) {
        return {...state, pending: false, error: true, error_message: action.error}
    }

    if (api_pending(type)) {
        return {...state, pending: true, error: false, error_message: null}
    }

    return state
}


const rootReducer = combineReducers({
    posts,
    connection: connectionProps
})

export default rootReducer