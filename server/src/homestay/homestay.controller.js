const router = require('express').Router();
 

const { getAllHomestay, getHomestay, createHomestay, deleteHomestay, editHomestay } = require("./homestay.service");
const { handleError } = require('../../utils/HandleError');
const { homestaySchema } = require('./homestay.validation');

router.get('/', async (req,res)=>{
    try {
        const homestays = await getAllHomestay()
        res.json(200, homestays);
    } catch (error) {
        console.error(error);
        res.status(error.statusCode||500).json(error.message||'Internal server error, ' );
    }
}
)
 


router.post('/',async (req,res)=>{
    try {
        const {name,address,open,close,geom} = req.body;
        req.body.geom= req.body.geom || {
            type: "MultiPolygon",
            coordinates: [
              [
                [
                  [100.354, -0.948],
                  [100.355, -0.949],
                  [100.356, -0.947],
                  [100.354, -0.948] 
                ]
              ]
            ]
          }
     
        console.log('ini terst')
          console.log(req.body||'ini harislnya')
        const {error} = handleError({name,address,open,close,geom},homestaySchema)
       
        if(error ) return res.status(400).json(error.details?.map(h=>h.message) ||'Internal server error, ')
        const newHomestay = await createHomestay(req.body)
        res.status(201).json(newHomestay);
    } catch (error) {
        console.error(error);
        res.status(error.statusCode||500).json(error.messages ||error.message|| 'Internal server error, ' );
    }
})
router.get('/:id',async (req,res)=>{
  try {
    const homestay = await getHomestay(req.params.id)
    res.status(200).json(homestay);
  } catch (error) {
    console.error(error);
    res.status(error.statusCode||500).json(error.messages ||error.message|| 'Internal server error, ' );
  }
})

router.patch('/:id',async (req,res)=>{
  try {
    const body = req.body || {};
    body.id = req.params.id
    body.geom = JSON.parse(body.geom)
    const homestay = await editHomestay(body)

    res.status(200).json(homestay);

  } catch (error) {
    console.error(error);
    res.status(error.statusCode||500).json(error.messages ||error.message|| 'Internal server error, ' );
  }
})
router.delete('/:id',async (req,res)=>{
  try {
    const id = req.params.id

    const deletedHomestay = await deleteHomestay(id)
    res.status(200).json(deletedHomestay);
  } catch (error) {
    console.error(error);
    res.status(error.statusCode||500).json(error.messages ||error.message|| 'Internal server error, ' );
  }
})
module.exports = router