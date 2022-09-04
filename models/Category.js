const {Schema, model} = require('mongoose')

const CategorySchema = new Schema({
    name:{
        type: String,
        required: true
    },
    icon:{
        type: String,
        
    }

})
module.exports = model('category', CategorySchema)