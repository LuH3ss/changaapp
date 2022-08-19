const { User } = require('../db.js')

const allUsers = async () => {
    try {
        const users = await User.findAll()
        return users
    } catch (error) {
        console.log('error')
    }
}

module.exports = {
    allUsers,
}