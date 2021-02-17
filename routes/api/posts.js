const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Post Model
const Post = require('../../models/Posts')

// Profile Model
const Profile = require('../../models/Profile')


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
// @access public
router.get('/',(req,res) =>{
    Post.find()
        .sort({date: -1})
        .then(posts => {res.json(posts)})
        .catch(err => res.status(404).json({error: "No Posts Found"}))
})

// @route Get api/posts/:id
// @desc Get posts by id
// @access public
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

// @route Delete api/posts/:id
// @desc Delete posts by id
// @access private
router.delete('/:id',passport.authenticate('jwt', {session:false}), (req,res)=>{

    Profile.findOne({ user: req.user.id})
        .then( profile =>{
            Post.findById(req.params.id)
                .then(post => {
                    // Check for Post owner
                    if(post.user.toString() !== req.user.id){
                        return res.status(401).json({ notauthorized: 'User not authorized'})
                    }

                    // Delete
                    post.remove()
                        .then(() => res.json({ success: true}))
                })
                .catch(err => res.status(404).json({postnotfound: 'No post found'}))
        })
})


// @route Post api/posts/like/:id
// @desc like posts
// @access private
router.post('/like/:id',passport.authenticate('jwt', {session:false}), (req,res)=>{

    Profile.findOne({ user: req.user.id})
        .then( profile =>{
            Post.findById(req.params.id)
                .then(post => {
                    if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                        return res.status(400).json({ alreadyLiked: 'User already liked this post '})
                    }

                    // Add user Id to likes array
                    post.likes.unshift({user: req.user.id})

                    post.save()
                        .then(post => res.json(post))
                })
                .catch(err => res.status(404).json({ postnotfound: 'No post found'}))
        })
})

// @route Post api/posts/unlike/:id
// @desc unlike posts
// @access private
router.post('/unlike/:id',passport.authenticate('jwt', {session:false}), (req,res)=>{

    Profile.findOne({ user: req.user.id})
        .then( profile =>{
            Post.findById(req.params.id)
                .then(post => {
                    if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
                        return res.status(400).json({ notliked: 'You have not yet liked this post '})
                    }

                    // Get remove index
                    const removeIndex = post.likes
                        .map( item => item.user.toString())
                        .indexOf(req.user.id);

                    // Splice out of array
                    post.likes.splice(removeIndex, 1)

                    // save
                    post.save()
                        .then(post => res.json(post))
                })
                .catch(err => res.status(404).json({ postnotfound: 'No post found'}))
        })
})

module.exports = router
