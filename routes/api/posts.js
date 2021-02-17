const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Post Model
const Post = require('../../models/Posts')

// Validation
const validatePostInput = require('../../validation/post')


// @route GET api/posts/test
// @desc test posts route
// @access public
router.get('/test',(req,res)=>{
    res.json({message: "posts Works"})
})

// @route Get api/posts
// @desc Get posts
// @access private
router.get('/',(req,res) =>{
    Post.find()
        .sort({date: -1})
        .then(posts => {res.json(posts)})
        .catch(err => res.status(404).json({error: "No Posts Found"}))
})

// @route Get api/posts/:id
// @desc Get posts by id
// @access private
router.get('/:id',(req,res) =>{
    Post.findById(req.params.id)
        .then(post => {res.json(post)})
        .catch(err => res.status(404).json({noPostFound: "No Post Found with that id"}))
})

// @route Post api/posts
// @desc Create posts
// @access private
router.post('/',passport.authenticate('jwt', {session:false}), (req,res) => {

    const {errors, isValid} = validatePostInput(req.body)

    if(!isValid){
        // if any errors send 400 with errors object
        res.status(400).json(errors)
    }

    const newPost = new Post({
        text: req.body.text,
        name:req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    })

    newPost.save()
        .then(post => res.json(post))
})

module.exports = router
