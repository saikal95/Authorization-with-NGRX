const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    // validate: {
    //   validator: function (value) {
    //     if (!this.isModified('description') && this.image) return true;
    //     else {
    //       return false;
    //     }
    //   },
    //   message: 'Either description or image should be added'
    //
    // }

  },
  image: {
    type: String,
    // validate: {
    //   validator: function (value) {
    //     if (!this.isModified('image') && this.description) return true;
    //     else {
    //       return false;
    //     }
    //   },
    //   message: 'Either description or image should be added'
    // }

  }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;