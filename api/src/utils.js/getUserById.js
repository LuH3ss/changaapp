const {User} = require('../db')

async function getUserById(id) {
    try {
        await User.findByPk(id)
        
    } catch (error) {
        console.log('getUserById fallando' + error)
    }
}

module.exports = getUserById