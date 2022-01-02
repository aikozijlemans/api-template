const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {registerValidation,loginValidation} = require('../middleware/validation');

//register
router.post('/register', async (req, res) => {
    //error logging the validation
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //check for email duplications
    const emailExists = await User.findOne({email: req.body.email});
    if (emailExists) return res.status(400).send('Email already exists');
    //password hashing
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    //create new user
    const user = new User({name: req.body.name, email: req.body.email, password: hashedPassword});
    try {
        const savedUser = await user.save();
        res.send({
            status: 200,
            username: user.name,
            email: user.email,
            userid: user._id
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
    if (!validPass) return res.status(400).send('Invalid password');
    //create token
    const token = jwt.sign({_id: user._id, username: user.name}, process.env.TOKEN,);
    res.header('auth', token).send(token)
});

module.exports = router;