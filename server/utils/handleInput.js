const { CustomError } = require("./CustomError");

const handleInput = (body,schema)=>{
    const {error,success} = schema.safeParse(body); 
    if(!success){
        console.log(error.format());
        throw new CustomError(error.errors, 400);
    }
    return error
}

module.exports ={handleInput}  