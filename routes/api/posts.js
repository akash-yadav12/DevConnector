const express = require('express')
const router = express.Router()


// @route GET api/posts/test
// @desc test posts route
// @access public
router.get('/test',(req,res)=>{
    res.json({message: "posts Works"})
})

module.exports = router
