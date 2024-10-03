const jwt = require('jsonwebtoken');

const authentication = (req,res,next)=>{

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

module.exports = {authentication};