import api from "../util/Api"

export const getPosts = () => ({
    type: ActionTypes.GET_POSTS,
    payload: api.Posts.get_all_posts()
})

export const getPostsForCategory = (category) => ({
    type: ActionTypes.GET_POSTS_FOR_CATEGORY,
    payload: api.Posts.get_posts(category),
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
        postId:id
    }
})


export const ActionTypes = {
    GET_POSTS: 'GET_POSTS',
    GET_CATEGORIES:'GET_CATEGORIES',
    GET_POSTS_FOR_CATEGORY:'GET_POSTS_FOR_CATEGORY',
    GET_POST:'GET_POST'
}
