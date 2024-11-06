const { Attraction } = require("../../models/Attraction");
const CulinaryPlace = require("../../models/CulinaryPlace");
const { Facility } = require("../../models/Facility");
const { SouvenirPlace } = require("../../models/SouvenirPlace");
const { TraditionalHouse } = require("../../models/TraditionalHouse");
const { WorshipPlace } = require("../../models/WorshipPlace");

const objectList ={
    CP: CulinaryPlace,
    TH: TraditionalHouse,
    A: Attraction,
    SP:SouvenirPlace,
    WO:WorshipPlace,
    FC:Facility
}

const findObjects =async(key,id)=>{
    
    const object =await objectList[key].findOne({where:id})
    return object
}
module.exports  = {findObjects}