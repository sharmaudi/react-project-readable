import {ActionTypes} from "../actions/index"
import {combineReducers} from "redux"
import {omit} from 'lodash'

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

const normalizeComments = (comments, oldComments) => {
    console.log(comments)
    if (!oldComments) {
        oldComments = {}
    }
    let commentsObj = oldComments
    if (comments.length > 0) {
        commentsObj = comments.reduce(function (accumulator, value) {
            accumulator[value.id] = value
            return accumulator
        }, oldComments)

    }

    return commentsObj

}

const posts = (state = initialState, action) => {

    if (isFullfilled(action, ActionTypes.GET_POSTS)) {
        return {...state, posts: normalizePosts(action.payload.data), selected_category: null}
    }


    if (isFullfilled(action, ActionTypes.GET_CATEGORIES)) {
        return {...state, categories: normalizeCategories(action.payload.data.categories)}
    }

    if (action.type === ActionTypes.GET_POSTS_FOR_CATEGORY) {
        console.log("Get post for category")
        console.log(action)
        return {...state, selected_category: action.payload}
    }

    if (isFullfilled(action, ActionTypes.GET_POST)) {

        return {
            ...state,
            posts: {...state.posts, [action.payload.data.id]: action.payload.data},
            selected_post: action.payload.data.id
        }
    }

    if (isFullfilled(action, ActionTypes.GET_COMMENTS)) {
        return {...state, comments: normalizeComments(action.payload.data, state.comments)}
    }

    if (isFullfilled(action, ActionTypes.ADD_COMMENT)) {
        return state
    }

    if (isFullfilled(action, ActionTypes.LIKE_POST)) {
        return state
    }

    if (isFullfilled(action, ActionTypes.DELETE_COMMENT)) {
        return {...state, comments: omit(state.comments, action.payload.data)}
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

const ui = (state = {
    post_sort_by: 'voteScore',
    post_sort_direction: 'desc',
    comment_sort_by: 'voteScore',
    comment_sort_direction: 'desc',
    sort_by_keys:['voteScore','timestamp']
}, action) => {

    if(action.type === ActionTypes.CHANGE_SORT_PARAMS) {
        if(action.payload.entity === 'post') {
            return {
                ...state,
                post_sort_by: action.payload.sortBy,
                post_sort_direction: action.payload.sortDirection
            }
        } else if(action.payload.entity === 'comment') {
            return {
                ...state,
                comment_sort_by: action.payload.sortBy,
                comment_sort_direction: action.payload.sortDirection
            }
        }
    }

    return state
}


const rootReducer = combineReducers({
    blog: posts,
    connection: connectionProps,
    ui
})

export default rootReducer