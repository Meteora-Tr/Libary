const async = require('hbs/lib/async')
const mongoose = require('mongoose')
const uri = 'mongodb+srv://Meteora:FcqMZ1ZzIQp2YreS@cluster0.ldzzk.mongodb.net/newNvidia'

module.exports = async () =>{
    try{
         await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        const db = mongoose.connection
        db.on('error',console.error.bind(console,'connection error'))
        db.once('open', function () {
            console.log('MongoDB connected global');

        })
    }catch(err){
        throw err
    }

}