const {User} = require('../db')

async function postUserUtil (firstName, lastName, birthDate, email, img) {
    try {
        let user = User.create({
            firstName, lastName, birthDate, email, img
        })
        
    } catch (error) {
        console.log('postUserUtil fallando' + error)
    }
}

module.exports = postUserUtil