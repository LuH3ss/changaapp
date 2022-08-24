const {User, Category} = require('../db')

async function getUsersByCategory(category_name) {
    try {
        User.findAll({
            includes: [Category]
        })
        
    } catch (error) {
        
    }
}

module.exports = getUsersByCategory