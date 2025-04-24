const { CustomError } = require("./CustomError");

const handleInput = (body,schema)=>{
    const {error,success,data} = schema.safeParse(body); 
    if(!success){
        console.log(error.errors);
        throw new CustomError(error.errors, 400);
    }
    return data
}

module.exports ={handleInput}  