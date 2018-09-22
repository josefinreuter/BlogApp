const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
    try {
        const blogs = await Blog
            .find({})
            .populate('user', {username: 1, name: 1})

        response.json(blogs.map(Blog.format))

    } catch (exception) {
        console.log(exception)
        response.status(500).json({error: 'something went wrong...'})
    }
})

blogsRouter.post('/', async (request, response) => {
    try {
        const body = request.body

        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if (!request.token || !decodedToken.id) {
            return response.status(401).json({error: 'token missing or invalid'})
        }

        if (body.title === undefined || '' === body.title.trim() || body.url === undefined || '' === body.url.trim()) {
            return response.status(400).json({error: 'title or url missing'})
        }

        const user = await User.findById(decodedToken.id)

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes === undefined ? 0 : body.likes,
            comments: [],
            user: user._id
        })

        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()


        response.json(Blog.format(savedBlog))

    } catch (exception) {
        if (exception.name === 'JsonWebTokenError') {
            response.status(401).json({error: exception.message})
        } else {
            console.log(exception)
            response.status(500).json({error: 'something went wrong...'})
        }
    }
})

blogsRouter.post('/:id/comments', async (request, response) => {
    try {
    const body = request.body

    if (body.comment === undefined || '' === body.comment.trim() ) {
        return response.status(400).json({error: 'Comment is empty'})
    }

    const blog = await Blog.findById(request.params.id)
    
    if(blog.comments !== null) {
        blog.comments = blog.comments.concat({comment: body.comment})
    } else {
        blog.comments = [{comment: body.comment}]
    }
    
    const updated = await blog.save()

    response.json(Blog.format(updated))

    } catch (e) {
        console.log(e)
        response.status(400).send({error: 'malformatted id'})
    }

})

blogsRouter.put('/:id', async (request, response) => {
    try {
        const body = request.body

        const blog = {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            comments: body.comments
        }

        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})

        response.json(Blog.format(updatedBlog))

    } catch (exception) {
        console.log(exception)
        response.status(400).send({error: 'malformatted id'})

    }


})

blogsRouter.delete('/:id', async (request, response) => {
    try {

        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if (!request.token || !decodedToken.id) {
            return response.status(401).json({error: 'token missing or invalid'})
        }

        const blog = await Blog.findById(request.params.id)

        if (blog.user.toString() !== decodedToken.id.toString()) {

            return response.status(400).send({error: 'not allowed to delete other users entries'})
        }

        const user = await User.findById(decodedToken.id)

        user.blogs.splice(user.blogs.indexOf(blog._id), 1);
        console.log(user.blogs)
        await user.save()

        await Blog.findByIdAndRemove(blog._id)
        response.status(204).end()


    } catch (exception) {
        if (exception.name === 'JsonWebTokenError') {
            response.status(401).json({error: exception.message})
        } else {
            console.log(exception)
            response.status(400).send({error: 'malformatted id'})
        }
    }

})

module.exports = blogsRouter