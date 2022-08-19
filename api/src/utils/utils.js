const { Usuario } = require('../db.js')

const allUsers = async () => {
    try {
        const users = await Usuario.findAll()
        return users
    } catch (error) {
        console.log('error')
    }
}

module.exports = {
    allUsers,
}