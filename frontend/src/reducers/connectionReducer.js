const api_success = (type) => type.indexOf("_FULFILLED") !== -1
const api_pending = (type) => type.indexOf("_PENDING") !== -1
const api_failure = (type) => type.indexOf("_REJECTED") !== -1

const connection = (state = {
    init_pending: false,
    pending: false,
    error: false,
    error_message: null
}, action) => {
    const {type} = action
    if (action.type === 'GET_POSTS_PENDING') {
        return {...state, init_pending:true}
    }

    if (action.type === 'GET_POSTS_FULFILLED') {
        return {...state, init_pending:false}
    }

    if (api_pending(type)) {
        return {...state, pending: true, error: false, error_message: null}
    }

    if (api_failure(type)) {
        return {...state, pending: false, error: true, error_message: action.error}
    }

    if (api_success(type)) {
        return {...state, pending: false, error: false, error_message: null}
    }
    return state
}

export default connection


