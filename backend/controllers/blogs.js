const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
//const Comment = require('../models/comment')
const cloudinary = require('../utils/cloudinary.js')

//get blogs
blogsRouter.get('/', async (req, res) => {
	const username = req.query.user
	const catName = req.query.cat
	try{
		let blogs

		if(username){

			const user = await User.findOne({ username })

			if (!user) {
				return res.status(404).json({ error: 'User not found' })
			}

			blogs = await Blog.find({ user: user.id }).populate('comment').populate('user', {
				username: 1,
				email: 1,
				id: 1,
			})

		} else if (catName){

			blogs = await Blog.find({
				categories: {
					$in: [catName],
				},
			})

		} else {

			blogs = await Blog.find({}).populate( 'comment' ).populate('user', {
				username: 1,
				email: 1,
				id: 1,
			})

		}

		res.json(blogs)

	} catch (err){

		res.status(500).json(err)
	}

})

//get blog
blogsRouter.get('/:id', async (req, res) => {
	const blog = await Blog.findById(req.params.id).populate('comment')
	if (blog) {
		res.json(blog)
	} else {
		res.status(404).end()
	}
})


//create post
blogsRouter.post('/', async (request, response) => {

	const { title, desc, photo, likes, categories } = request.body

	const user = request.user //using middleware of userExtractor and tokenExtractor

	if (!user) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}

	const result = await cloudinary.uploader.upload(photo, {
		folder: 'bloglist',
	})

	const blog = new Blog({
		title: title,
		desc: desc,
		photo: {
			public_id: result.public_id,
			url: result.secure_url,
		},
		likes: likes ?? 0,
		user: user.id,
		categories: categories ?? ''
	})
	//comment: comment._id ?? ''
	if (title === undefined) {

		response.status(400).end()

	} else {
    
		const savedBlog = await blog.save()

		user.blogs = user.blogs.concat(savedBlog._id)
		await user.save()

		//comment.blogs = comment.blogs.concat(savedBlog._id);
		//await comment.save();

		response.status(201).json(savedBlog)
	}
})

//delete blog
blogsRouter.delete('/:id', async (request, response) => {

	const { id } = request.params

	const user = request.user

	if (!user) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}

	const blog = await Blog.findById(id)

	if (blog.user.toString() === user.id) {

		await Blog.findByIdAndRemove(id)
		response.status(204).json('Post has been deleted...')

	} else {
		return response
			.status(401)
			.json({ error: 'Unauthorized to delete the blog' })
	}
})


//update blog
blogsRouter.put('/:id', async (request, response) => {
	const { id } = request.params
	const body = request.body
	const user = request.user

	if (!user) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}

	const blog = {
		title: body.title,
		desc: body.desc,
		photo: body.photo
	}

	await Blog.findByIdAndUpdate(
		id, 
		blog, 
		{ new: true })
  
	response.status(201).json(blog)
})

//post comment 
/* blogsRouter.post("/:id/comments", async (request, response) => {
  const body = request.body;

  const comment = new Comment({
    content: body.content
  });

  if (body.content === undefined) {
    response.status(400).end();
  } else {
    const savedComment = await comment.save();

    response.status(201).json(savedComment);
  }
}); */

module.exports = blogsRouter
