const errorHandler = (err,req,res,next)=>{
    console.log(err)
    const statusCode = err.statusCode ||500
    res.status(statusCode).json((err.messages&&err.messages.length>0) ? err.messages : err.message || 'Internal server error, ' )
}

module.exports = {errorHandler}