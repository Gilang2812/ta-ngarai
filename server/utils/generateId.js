const { Op } = require('sequelize');

async function generateCustomId(prefix, model,length) {
  const prefixLength = prefix.length; 
  const remainingLength = length - prefixLength; 

  const lastRecord = await model.findOne({
    where: {
      id: {
        [Op.like]: `${prefix}%` 
      }
    },
    order: [['id', 'DESC']], 
  });

  const newNumber = lastRecord
    ? parseInt(lastRecord.id.replace(prefix, ''), 10) + 1
    : 1; 

  const formattedNumber = String(newNumber).padStart(remainingLength, '0');

  return `${prefix}${formattedNumber}`;
}


module.exports = { generateCustomId };
