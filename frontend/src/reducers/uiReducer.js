import ActionTypes from "../actions/types"

const ui = (state = {
    post_sort_by: 'voteScore',
    post_sort_direction: 'desc',
    comment_sort_by: 'voteScore',
    comment_sort_direction: 'desc',
    sort_by_keys:[{key:'voteScore',value:'Vote Score'},{key:'timestamp',value:'Date'}]
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

export default ui