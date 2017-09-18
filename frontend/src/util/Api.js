import client from './http_client'
import uuid from 'uuid'

const Posts = {
    get_all_posts: () => client.get('/posts'),
    create_post: data => client.post('/posts', {...data, timestamp: Date.now(), id: uuid()}),
    get_all_categories: () => client.get('/categories'),
    get_posts: (category) => client.get(`/${category}/posts`),
    get_post_by_id: (id) => client.get(`/posts/${id}`),
    upvote: (id) => client.post(`/posts/${id}`, {option: 'upVote'}),
    downvote: (id) => client.post(`/posts/${id}`, {option: 'downVote'}),
    update_post: (id, data) => client.put(`/posts/${id}`, data),
    delete_post: (id) => client.delete(`/posts/${id}`),
}

const Comments = {
    add_comment_to_post: (post_id, data) => client.post('/posts', {
        ...data,
        parentId: post_id,
        timestamp: Date.now(),
        id: uuid()
    }),
    get_comment: (id) => client.get(`/comments/${id}`),
    upvote: (id) => client.post(`/comments/${id}`, {option: 'upVote'}),
    downvote: (id) => client.post(`/comments/${id}`, {option: 'downVote'}),
    update_comment: (id, data) => client.put(`/comments/${id}`, data),
    delete_comment: (id) => client.delete(`/comment/${id}`),
}


export default {
    Posts,
    Comments
};