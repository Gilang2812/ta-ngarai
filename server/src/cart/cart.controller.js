const { getCarts, deleteCartById, createCart } = require('./cart.service');

const router = require('express').Router();

router.get('/', async (req,res,next)=>{
    try {
        const cart = await getCarts(19)
        return res.status(200).json(cart)
    } catch (error) {
        next(error)
    }
})

router.post('/',async (req,res,next)=>{
    try {
        const body = req.body || {};
        body.user_id = 19
        const newCart = await createCart(req.body)

        return res.status(201).json(newCart)
    } catch (error) {
        next(error)
    }
})
router.delete('/:id',async (req,res,next)=>{
    try {
        const id = req.params.id
        const cart = await deleteCartById(id)
        return res.status(200).json(cart)
    } catch (error) {
        next(error)
    }
})

 module.exports =router