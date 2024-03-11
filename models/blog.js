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
});

const blogModel = mongoose.model('Blog', blogSchema);

module.exports = blogModel;
