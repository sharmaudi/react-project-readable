import api from "../util/Api"


export const getPostsForCategory = (category) => ({
    type: ActionTypes.GET_POSTS_FOR_CATEGORY,
    payload: category
})

export const getCategories = () => ({
    type: ActionTypes.GET_CATEGORIES,
    payload: api.Posts.get_all_categories()
})


export const getComments = (id) => ({
    type: ActionTypes.GET_COMMENTS,
    payload: api.Posts.get_comments(id),
    meta: {
        postId: id
    }
})


const dispatchPending = (dispatch, actionType) => {
    dispatch({
        type: actionType + "_PENDING"
    })
}

const dispatchFulfilled = (dispatch, actionType, payload, meta) => {
    dispatch({
        type: actionType + "_FULFILLED",
        payload,
        meta
    })
}

const dispatchRejected = (dispatch, actionType, error, meta) => {
    dispatch({
        type: actionType + "_REJECTED",
        error,
        meta
    })
}


function handleGetPost(dispatch, post) {
    return new Promise((resolve, reject) => {
        post.comments = []
        dispatchPending(dispatch, ActionTypes.GET_COMMENTS)
        api.Posts.get_comments(post.id).then(({data: comments}) => {
            for (const comment of comments) {
                post.comments.push(comment.id)
            }
            dispatchFulfilled(dispatch, ActionTypes.GET_COMMENTS, {data: comments}, {post_id: post.id})
            resolve(post)
        }).catch(err => {
            dispatchRejected(dispatch, ActionTypes.GET_COMMENTS, err, {message: 'GET_COMMENTS_REJECTED'})
            reject(err)
        })
    })
}

function handleGetPosts(dispatch) {
    return new Promise((resolve, reject) => {
        api.Posts.get_all_posts().then(({data: posts}) => {
            console.log("Dispatching now")
            const promises = []
            for (let post of posts) {
                promises.push(handleGetPost(dispatch, post))
            }

            Promise.all(promises).then(values => {
                console.log("All Resolved")
                console.log(values)
                resolve(values)

            })
        }).catch(err => {
            reject(err)
        })
    })
}

export const getPost = (id) => {
    return dispatch => {
        dispatchPending(dispatch, ActionTypes.GET_POST)
        api.Posts.get_post_by_id(id).then(({data: post}) => {
            handleGetPost(dispatch, post).then(post => {
                dispatchFulfilled(dispatch, ActionTypes.GET_POST, {data: post})
            }).catch(err => dispatchRejected(dispatch, ActionTypes.GET_POST, err))
        }).catch(err => {
                dispatchRejected(dispatch, ActionTypes.GET_POST, err)
            }
        )

    }
}

export const getPosts = () => {
    return dispatch => {
        dispatchPending(dispatch, ActionTypes.GET_POSTS)
        handleGetPosts(dispatch).then((posts) => {
            dispatchFulfilled(dispatch, ActionTypes.GET_POSTS, {data: posts})
        }).catch(err => {
            dispatchRejected(dispatch, ActionTypes.GET_POSTS, err)
        })
    }
}


export const init = () => {
    console.log("Initializing App")
    return dispatch => {
        dispatch({
            type: "INIT_PENDING"
        })
        dispatch(getPosts())
        dispatch(getCategories())
    }
}

export const likePost = (post_id, idDislike = false) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.LIKE_POST,
            payload: idDislike ? api.Posts.downvote(post_id) : api.Posts.upvote(post_id)
        })
        dispatch(getPost(post_id))

    }
}

export const createPost = (data => {
    return dispatch => {
        dispatch({
            type: ActionTypes.CREATE_POST,
            payload: api.Posts.create_post(data)
        })
        dispatch(getPosts())
        dispatch(getCategories())
    }
})

export const updatePost = ( (postId, data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.UPDATE_POST,
            payload: api.Posts.update_post(postId, data)
        })
        dispatch(getPosts())
        dispatch(getCategories())
    }
})

export const deletePost = ( (postId) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.DELETE_POST,
            payload: api.Posts.delete_post(postId)
        })
        dispatch(getPosts())
        dispatch(getCategories())
    }
})

export const addComment = ( (post_id, comment) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.ADD_COMMENT,
            payload: api.Posts.add_comment_to_post(post_id, comment)
        })
        dispatch(getPosts())
    }
})


export const updateComment = ( (post_id, comment) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.EDIT_COMMENT,
            payload: api.Comments.update_comment(comment.id, comment)
        })

        //reconcile post and comments
        dispatch(getPosts())
    }
})

export const deleteComment = ( (post_id, comment_id) => {
    return dispatch => {
        //Delete comment on server than update post
        api.Comments.delete_comment(comment_id).then(({data:deletedComment}) => {
            api.Posts.get_post_by_id(post_id).then(({data: post}) => {
                handleGetPost(dispatch, post).then(post => {
                    dispatchFulfilled(dispatch, ActionTypes.GET_POST, {data: post})
                    //Delete Comment from Client State
                    dispatchFulfilled(dispatch, ActionTypes.DELETE_COMMENT, {data: deletedComment.id})
                })
            })
        })
    }
})

export const ActionTypes = {
    GET_POSTS: 'GET_POSTS',
    GET_CATEGORIES: 'GET_CATEGORIES',
    GET_POSTS_FOR_CATEGORY: 'GET_POSTS_FOR_CATEGORY',
    GET_POST: 'GET_POST',
    GET_COMMENTS: 'GET_COMMENTS',
    ADD_COMMENT: 'ADD_COMMENT',
    ADD_COMMENT_AND_FETCH: 'ADD_COMMENT_AND_FETCH',
    LIKE_POST: 'LIKE_POST',
    INIT: 'INIT',
    CREATE_POST: 'CREATE_POST',
    UPDATE_POST: 'UPDATE_POST',
    DELETE_POST: 'DELETE_POST',
    EDIT_COMMENT: 'EDIT_COMMENT',
    DELETE_COMMENT: 'DELETE_COMMENT'
}
