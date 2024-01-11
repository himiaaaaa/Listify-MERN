const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	desc: {
		type: String,
		required: true
	},
	photo: {
		public_id: {
			type: String,
		},
		url: {
			type: String,
		}},
	categories: Array,
	likes: Number,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	comment: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment',
	}
}, { timestamps: true })

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	},
})

module.exports = mongoose.model('Blog', blogSchema)
