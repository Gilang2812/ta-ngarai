const errorHandler = (err,req,res,next)=>{
    console.log(err)
    const statusCode = err.statusCode ||500
    res.status(statusCode).json(err.messages ||error.message|| 'Internal server error, ' )
}

module.exports = {errorHandler}