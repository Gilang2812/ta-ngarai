
const handleError = (body,schema)=>{
    const result = schema.validate(body,{abortEarly:false}); 

    return result
}

module.exports ={handleError}