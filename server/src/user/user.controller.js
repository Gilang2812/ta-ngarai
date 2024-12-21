const router = require('express').Router(); 
const { getAllUsers, createNewUser, deleteDetailUser } = require("./user.service");
const { adminSchema } = require('./user.validation');

router.get('/' , async (req,res)=>{
    try {
        const users = await getAllUsers()
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(error.statusCode||500).json( error.message||'Internal server error, ' );
    }
})

router.post('/', async (req,res)=>{
    try {
        let data= req.body
        const {error} = adminSchema.validate(data)
        if(error) throw new Error(error.details[0].message,400)
        const user = await createNewUser(data);
        let response = {
            data : user,
            success:"user created successfully",
        }
        res.status(201).json(response);
    } catch (error) {
        console.error(error);
        res.status(error.statusCode||500).json(error.messages ||error.message|| 'Internal server error, ' );
    }
})

router.delete('/:user_id/:group_id',async (req,res)=>{
    try {
        const data = await deleteDetailUser(req.params)
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(error.statusCode||500).json(error.message || 'Internal server error, ' );
    }
} )

 

module.exports = router;