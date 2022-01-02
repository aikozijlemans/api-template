const jwt = require('jsonwebtoken');
//middleware verify token function
module.exports = function(req,res,next){
    const token = req.header('auth');
    if(!token) return res.status(401).send('Access Denied');
    try{
        const verified = jwt.verify(token, process.env.TOKEN);
        req.user = verified;
        next();
    }catch (err){
        res.status(400).send('Invalid Token');
    }
}