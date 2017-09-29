import ActionTypes from "../actions/types"
import {omit} from 'lodash'

const initialState = {}
const isFullfilled = (action, desiredActionType) => action.type === (desiredActionType + "_FULFILLED")
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

export default posts
