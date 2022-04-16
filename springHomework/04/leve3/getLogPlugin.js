let exec = require('child_process').execSync;

class GetLogPlugin {
    apply(compiler) {
        compiler.hooks.emit.tap("GetLogPlugin", (compilation,cb) => {
            compilation.assets['README.txt'] = {
                source : function (){
                    let re = exec('git log');
                    return re.toString();
                }
            }

        })
    }
}
module.exports = GetLogPlugin;