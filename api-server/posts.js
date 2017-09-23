const clone = require('clone')

let db = {}

const defaultData = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false
  },
    "6nddi6ok3ym7mf1p33lndasfez": {
    id: '6nddi6ok3ym7mf1p33lndasfez',
    timestamp: 1468479767190,
    title: 'Readable Rubric',
    body: '## Default (Root)\n' +
    '- should list all available categories, which should link to a category view for that category\n' +
    '- should list all of the posts ordered by voteScore (highest score first)\n' +
    '- should have a control for changing the sort method for the list, including at minimum, -\n' +
    '- order by voteScore and order by timestamp\n' +
    '- should have a control for adding a new post\n' +
    '\n' +
    '## Category View\n' +
    '- identical to the default view, but filtered to only include posts with the selected category\n' +
    '\n' +
    '## Post Detail View\n' +
    '- should show the details of a post, including: Title, Body, Author, timestamp (in user -\n' +
    '- readable format), and vote score\n' +
    '- should list all of the comments for that post, ordered by voteScore (highest first)\n' +
    '- should have controls to edit or delete the post\n' +
    '- should have a control to add a new comment.\n' +
    '- implement comment form however you want (inline, modal, etc.)\n' +
    '- comments should also have controls for editing or deleting\n' +
    '\n' +
    '## Create/Edit View\n' +
    '- should have a form to create new post or edit existing posts\n' +
    '- when editing, existing data should be populated in the form',
    author: 'usharma',
    category: 'udacity',
    voteScore: 0,
    deleted: false
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByCategory (token, category) {
  return new Promise((res) => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const posts = getData(token)
    res(
      posts[id].deleted
        ? {}
        : posts[id]
    )
  })
}

function getAll (token) {
  return new Promise((res) => {
    const posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function add (token, post) {
  return new Promise((res) => {
    let posts = getData(token)

    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false
    }

    res(posts[post.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let posts = getData(token)
    post = posts[id]
    switch(option) {
        case "upVote":
            post.voteScore = post.voteScore + 1
            break
        case "downVote":
            post.voteScore = post.voteScore - 1
            break
        default:
            console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    res(post)
  })
}

function disable (token, id) {
    return new Promise((res) => {
      let posts = getData(token)
      posts[id].deleted = true
      res(posts[id])
    })
}

function edit (token, id, post) {
    return new Promise((res) => {
        let posts = getData(token)
        for (prop in post) {
            posts[id][prop] = post[prop]
        }
        res(posts[id])
    })
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll
}
