const express = require('express')
const router = express.Router()

// @route GET api/users/test
// @desc test user route
// @access public
router.get('/test',(req,res)=>{
    res.json({message:'users Works'})
})

module.exports = router