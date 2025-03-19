  const mongoose = require('mongoose');

  const blogSchema = mongoose.Schema(
    {
      title: {
        type: String,
        default: '',
      },
      description: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        default: '',
      },
      tags: {
        type: [String],
        default: [],
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      comments: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
          text: {
            type: String,
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
    {
      timestamps: true,
    }
  );

  module.exports = mongoose.model('Blog', blogSchema);