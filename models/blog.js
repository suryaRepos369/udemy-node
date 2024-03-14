const mongooseToJson = require('@meanie/mongoose-to-json');
const { default: mongoose } = require('mongoose');

const blogSchema = mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  },
);

blogSchema.plugin(mongooseToJson);
const blogModel = mongoose.model('Blog', blogSchema);

module.exports = blogModel;
