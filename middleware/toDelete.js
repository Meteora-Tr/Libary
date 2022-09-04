const fs = require('fs')
const async = require('hbs/lib/async')
const path = require('path')
const p = path.dirname(require.main.filename)


module.exports = (filePath) => {
    if (filePath) {
        fs.unlink(p + '/../public/images/' + filePath , (err) => {
            if (err) {
                console.log(err);
            }
        })

    }
    
}