const { default: mongoose } = require('mongoose');

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  coverImage: {
    type: String,
  },
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
});

const blogModel = mongoose.model('Blog', blogSchema);

module.exports = blogModel;
