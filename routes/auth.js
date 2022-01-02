const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verify = require('../middleware/verify')
const {registerValidation,loginValidation, updateValidation} = require('../middleware/validation');

//register
router.post('/register', async (req, res) => {
    //error logging the validation
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //check for id duplications
    const idExists = await User.findOne({id: req.body.id});
    if (idExists) return res.status(400).send('ID already exists');
    //check for email duplications
    const emailExists = await User.findOne({email: req.body.email});
    if (emailExists) return res.status(400).send('Email already exists');
    //password hashing
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    //create new user
    const user = new User({id: req.body.id, fname: req.body.fname, lname: req.body.lname, username: req.body.username, email: req.body.email, avatar: req.body.avatar, password: hashedPassword});
    try {
        const savedUser = await user.save();
        res.send({
            status: 200,
            userid: user.id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            mongoID: user._id,
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

//login
router.post('/login', async (req, res) => {
//error logging the validation
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //check if email exists
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Email or password is wrong');
    //password check
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Email or password is wrong');
    //create token
    const token = jwt.sign({_id: user._id, username: user.name}, process.env.TOKEN,);
    res.header('auth', token).send(token)
});

router.put('/users/update', async (req, res) => {
    const {error} = updateValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = new User({
        id: req.body.id,
        fname: req.body.fname,
        lname: req.body.lname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar
    });
    try {
        const savedUser = await user.update();
        res.send({
            status: 200,
            userid: user.id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            mongoID: user._id,
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/users', (req,res) => {
    User.find({}, function(err, users) {
        const userMap = {};

        users.forEach(function(user) {
            userMap[user.id] = user;
        });

        res.send(userMap);
    });
})

module.exports = router;