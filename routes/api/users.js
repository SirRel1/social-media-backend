const router = require('express').Router();
const { User, Thoughts, Reaction, theUser } = require('../../models/User.js')


router.get('/:id', (req, res) => {
    console.log(req.params.id)
    res.status(200)

});


router.get('/', async (req, res) => {
    const Users = await theUser.find();
    res.json({message: "Hey Terrell"})
    console.log(Users)


});


router.post('/', (req, res) => {

})

module.exports = router;