const router = require("express").Router();
const { userLogin, userRegister } = require("./auth.service");
const { registerSchema, loginScheme } = require("./auth.validation.js");
const { CustomError } = require("../../utils/CustomError.js");
 
router.post('/login', async (req,res)=>{
    try {

        let data= req.body
        const {error} = loginScheme.validate(data)
        if (error) {
            throw new CustomError(error.details[0].message, 400);
        }
        const token  = await userLogin(data.email,data.password)
        res.json(token)
    } catch (error) {
        console.error(error);
        res.status(error.statusCode||500).json(error.message||'Internal server error, ' );
    }
}
)

router.post('/register',async (req,res)=>{
    try {
        const { error } = registerSchema.validate(req.body);
        if (error) {
            throw new CustomError(error.details[0].message, 400);
        }
        const newUser = await userRegister(req.body)
        res.json(201,newUser)
    } catch (error) {
        console.error(error);
        res.status(error.statusCode||500).json( error.message||'Internal server error, ' );
    }
}
)
module.exports = router;