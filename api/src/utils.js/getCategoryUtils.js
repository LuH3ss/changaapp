const {Category, User} = require('../db')

async function getCategoryUtil(name)
    try {
        let category = await Category.findAll()
       
    } catch (error) {
        console.log('getCatUtils fallando' + error )
    }

module.exports = getCategoryUtil    