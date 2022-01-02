const router = require('express').Router();
const verify = require('../middleware/verify')

router.get('/', verify, (req,res) => {
    res.send(req.user)
})

module.exports = router;