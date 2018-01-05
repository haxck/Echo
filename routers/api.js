const express = require('express');
const router = express.Router();

//
router.route('/')
    .get((req, res, next) => {
        res.send('Hello');
    })
router.route('/letter')
    .get((req, res, next)=>{
        res.json({"id":1,"ctx":"Hello,world"})
    })
    .post((req, res, next)=>{
        console.log(req)
    })
module.exports = router;