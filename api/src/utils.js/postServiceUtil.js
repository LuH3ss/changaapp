const {Service, Category} = require('../db')

async function postServiceUtil ( name, description, price, day, hours, category_id) {
    try {
        let service = Service.create({
            name, description, price, day, hours
        })

        let category = Category.findByPk(category_id)

        service.addCategories(category)
        
    } catch (error) {
        console.log('postServiceUtil fallando' + error)
    }
}

module.exports = postServiceUtil