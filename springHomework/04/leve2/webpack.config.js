const path = require('path');
module.exports = {
    mode: 'development',
    entry:'./redrock.txt',
    output:{
        path:path.resolve(__dirname,'./dist')
    },
    module:{
        rules:[
            {
                test:/.txt$/,
                use:['./redRock-loader']
            }
        ]
    }
}