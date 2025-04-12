const { getHomestayWithFacility, getHomestayFacilities, createHomestayFacility, getDetailHomestayFacilities, createDetailHomestayFacility, deleteDetailHomestayFacility } = require("./homestayFacility.service");

const router = require("express").Router();

router.get('/',async (req,res,next)=>{
  try {
    const homestayFacilities = await getHomestayFacilities ()

    res.status(200).json(homestayFacilities);

  } catch (error) {
    console.error(error);
    res.status(error.statusCode||500).json(error.messages ||error.message|| 'Internal server error, ' );
  }
})

router.get("/:id", async (req, res) => {
  try {
    const homestay = await getHomestayWithFacility(req.params.id);
    res.status(200).json(homestay);
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || 500)
      .json(error.messages || error.message || "Internal server error, ");
  }
});

router.post('/',async (req,res,next)=>{
  try {
    const  newHomestayFacility =await createHomestayFacility(req.body)

    return res.status(201).json(newHomestayFacility)
  } catch (error) {
    console.error(error);
    res.status(error.statusCode||500).json(error.messages ||error.message|| 'Internal server error, ' );
  }
})

router.get('/details',async (req,res,next)=>{
  try {
    const details = await getDetailHomestayFacilities()
    res.status(200).json(details)
  } catch (error) {
    console.error(error);
    res.status(error.statusCode||500).json(error.messages ||error.message|| 'Internal server error, ' );
  }
})

router.post('/details',async (req,res,next)=>{
  try {
    console.log(req.body)
    const  newDetailFacility = await createDetailHomestayFacility(req.body);
    res.status(200).json(newDetailFacility)
  } catch (error) {
    console.error(error);
    res.status(error.statusCode||500).json(error.messages ||error.message|| 'Internal server error, ' );
  }
})

router.delete('/:homestay_id/:facility_homestay_id', async (req,res,next)=>{
  try {
    const deleted =await deleteDetailHomestayFacility(req.params)
    return res.status(200).json(deleted)
  } catch (error) {
    console.error(error);
    res.status(error.statusCode||500).json(error.messages ||error.message|| 'Internal server error, ' );
  }
})

module.exports = router;
