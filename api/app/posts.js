const express = require('express');
const mongoose = require("mongoose");
const Post = require("../models/Post");
const multer = require('multer');
const config = require('../config');
const path = require("path");
const {nanoid} = require('nanoid');

myDate = new Date().toISOString();

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname))
  }
});

const upload = multer({storage});

router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    if (!req.body.title) {
      return res.status(400).send({message: 'Title of the post is required'});
    }

    const postData = {
      user: req.body.user,
      title: req.body.title,
      description: req.body.description,
      date: myDate,
      image: null,
    };

    if (req.file) {
      postData.image = req.file.filename;
    }

    const post = new Post(postData);

    await post.save();

    return res.send({message: 'Created new post', id: post._id});
  } catch (e) {
    next(e);
  }
});



router.get('/', async (req, res, next) => {
  try {
    const query = {};
    const sort = {};

    if (req.query.filter === 'image') {
      query.image = {$ne: null};
    }

    if (req.query.orderby === 'date' && req.query.direction === 'desc') {
      sort._id = -1;
    }

    const posts = await Post.find().sort(sort).populate("user", "name");

    return res.send(posts);
  } catch (e) {
    next(e);
  }
});




module.exports = router;