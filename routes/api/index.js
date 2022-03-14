const router = require('express').Router();
const Users = require('./users')
const Thoughts = require('./thoughts')

router.use('/users', Users)
router.use('/thoughts', Thoughts)










module.exports = router;