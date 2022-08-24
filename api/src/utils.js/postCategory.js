const {Category, User} = require('../db')

async function postCategoryUtil(name)
    try {
        let category = await Category.create(
            name
        )
       
    } catch (error) {
        console.log('postCatUtils fallando' + error )
    }

module.exports = postCategoryUtil    