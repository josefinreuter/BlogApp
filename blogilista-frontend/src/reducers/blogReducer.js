import blogService from '../services/blogs'

const blogReducer = (store = [], action) => {
  console.log('ACTION: ', action.type)
  switch(action.type){
  case 'INIT':
    return action.data
  case 'ADD':
    return action.data
  case 'LIKE':
    return action.data
    case 'DELETE':
    return action.data
  default:
    return store
  }
}

export const initialize = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: blogs
    })
  }
}

const clearNotification = (dispatch) => {
    setTimeout(() => {
        dispatch({
            type: 'NOTIFICATION',
            notification: ''
          })
    }, 5000)
}

export const addBlog = (title, author, url) => {
    return async (dispatch) => {
        try {
            const newBlog = await blogService.addBlog({
                title: title,
                author: author,
                url: url
            })

            const blogs = await blogService.getAll()

            dispatch({
                type: 'ADD',
                data: blogs
              })

            dispatch( {
                type: 'NOTIFICATION',
                notification: `A new blog: '${newBlog.title}' by ${newBlog.author} was added!`
            })
            clearNotification(dispatch)
            
        } catch (e) {
            dispatch( {
                type: 'NOTIFICATION',
                notification: 'Blog addition failed, title or url missing.'
            })
            clearNotification(dispatch)
        }
      
    }
  }

  export const likeBlog = (id, oldBlogs) => {
    return async (dispatch) => {
        try {
            const blog = oldBlogs.find(b => b.id === id)


            await blogService.updateBlog(blog.id, {
                title: blog.title,
                author: blog.author,
                url: blog.url,
                likes: blog.likes + 1,
                user: blog.user
            })


            const blogs = await blogService.getAll()


            dispatch({
                type: 'LIKE',
                data: blogs
              })

            dispatch({
                type: 'NOTIFICATION',
                notification: `You liked ${blog.title}`
            })
            clearNotification(dispatch)

        } catch (e) {
            console.log(e)

        }
    }
  }

  export const deleteBlog = (id, oldBlogs) => {
    return async (dispatch) => {
        try {
            const blog = oldBlogs.find(b => b.id === id)

            if (window.confirm(`Delete '${blog.title}'?`)) {
                await blogService.deleteBlog(id)

                const blogs = oldBlogs.filter(b => b.id !== id)

                dispatch({
                    type: 'DELETE',
                    data: blogs
                  })

                  dispatch( {
                    type: 'NOTIFICATION',
                    notification: `'${blog.title}' by ${blog.author} was deleted!`
                })
                clearNotification(dispatch)
                
            }
        } catch (e) {
            dispatch( {
                type: 'NOTIFICATION',
                notification: 'Blog deletion failed.'
            })
            clearNotification(dispatch)
        }
     
    }
  }


export default blogReducer