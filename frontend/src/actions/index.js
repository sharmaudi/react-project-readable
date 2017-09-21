import api from "../util/Api"

export const getPosts = () => ({
    type: ActionTypes.GET_POSTS,
    payload: api.Posts.get_all_posts()
})

export const getPostsForCategory = (category) => ({
    type: ActionTypes.GET_POSTS_FOR_CATEGORY,
    payload: category==="all"?api.Posts.get_all_posts():api.Posts.get_posts(category),
    meta: {
        category: category
    }
})

export const getCategories = () => ({
    type: ActionTypes.GET_CATEGORIES,
    payload: api.Posts.get_all_categories()
})

export const getPost = (id) => ({
    type: ActionTypes.GET_POST,
    payload: api.Posts.get_post_by_id(id),
    meta: {
        postId: id
    }
})

export const getComments = (id) => ({
    type: ActionTypes.GET_COMMENTS,
    payload: api.Posts.get_comments(id),
    meta: {
        postId: id
    }
})

export const addComment = (post_id, data) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: api.Posts.add_comment_to_post(post_id, data),
    meta: {
        postId: post_id
    }
})

export const addCommentAndFetch = (post_id, data) => {
    return dispatch => {
        return dispatch({
            type: ActionTypes.ADD_COMMENT_AND_FETCH,
            payload: Promise.all([
                dispatch(addComment(post_id, data)),
                dispatch(getComments(post_id))
            ])

        })
    }
}

export const init = () => {
    console.log("Initializing App")
    return dispatch => {

        dispatch({
            type: 'INIT_PENDING'
        })

        //dispatch non-promise payloads for multiple dependent calls
        api.Posts.get_all_posts().then(({data: posts}) => {
            console.log("Dispatching now")
            dispatch({
                type: 'GET_POSTS_FULFILLED',
                payload: {
                    data: posts
                }
            })


            for (let post of posts) {
                api.Posts.get_comments(post.id).then(({data: comments}) => {
                    dispatch({
                        type: 'GET_COMMENTS_FULFILLED',
                        payload: {
                            data: comments
                        },
                        meta: {
                            post_id: post.id
                        }
                    })
                    dispatch({type: 'INIT_FULFILLED'})
                }).catch(err => {
                    dispatch({
                        type: 'INIT_REJECTED',
                        payload: err,
                        meta: {
                            message: 'GET_COMMENTS_REJECTED'
                        }
                    })
                })
            }
        }).catch(err => {
            dispatch({
                type: 'INIT_REJECTED',
                payload: err,
                meta: {
                    message: 'GET_COMMENTS_REJECTED'
                }
            })
        })


        //this dispatch will be picked up by redux promise
        dispatch(getCategories())

    }
}


export const ActionTypes = {
    GET_POSTS: 'GET_POSTS',
    GET_CATEGORIES: 'GET_CATEGORIES',
    GET_POSTS_FOR_CATEGORY: 'GET_POSTS_FOR_CATEGORY',
    GET_POST: 'GET_POST',
    GET_COMMENTS: 'GET_COMMENTS',
    ADD_COMMENT: 'ADD_COMMENT',
    ADD_COMMENT_AND_FETCH: 'ADD_COMMENT_AND_FETCH',
    INIT: 'INIT'
}
