const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next)=>{

    let secret = process.env.SECRET_TOKEN;

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token ==null){
        return res.status(401).json({message: 'Token not provided'}); 
    }
    
    jwt.verify(token, secret, (err, user)=>{
        if(err){
            return res.status(403).json({message: 'Invalid token'});
        }else {
            req.user = user;
            next();
        }         
    })

}

const verifyAdmin = (req,res,next)=>{
    if(req.user.group_id!= 3){
        return res.status(403).json({message: 'Unauthorized to access admin routes'});
    }
    next();
}

module.exports = {verifyToken,verifyAdmin};