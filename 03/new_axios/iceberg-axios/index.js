let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
//axios的默认参数配置
const defaultConfig = {
    method: "GET",
    url: '127.0.0.1',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    responseType:'json',
    data:''
}
function createInstance(config = {...defaultConfig}) {
    //axios的默认传参
    let localConfig = setConfig(config.url,config)
    return xmlFunction(localConfig)
}
//设置配置文件
function setConfig(url,config,method){
    let localConfig = {...defaultConfig}
    for(let key in config){
        localConfig[key] = {...config}[key]
    }
    localConfig.url = url
    if(method === "GET"){
        localConfig.method = "GET"
    }else if(method === "POST"){
        if(typeof(localConfig.data) === "object"){
            let stringData = ""
            let data = localConfig.data
            for(let key in data){
                stringData += key+"="+data[key]+"&&"
            }
            localConfig.data = stringData
        }
        localConfig.method = "POST"
    }
    return localConfig
}
//axios的get方法
createInstance.get = (url,config = {...defaultConfig}) =>{
    let localConfig = setConfig(url,config,"GET")
    return xmlFunction(localConfig)
}
//axios的post方法
createInstance.post = (url,config = {...defaultConfig}) =>{
    let localConfig = setConfig(url,config,"POST")
    return xmlFunction(localConfig)
}
//通过xmlhttprequest远程访问
function xmlFunction(config) {
    return new Promise(function(resolve,reject){
        const xmlHttp = new XMLHttpRequest()
        xmlHttp.open(config.method,config.url)
        xmlHttp.responseType = config.responseType
        const headers = config.headers
        for(let key in headers){
            xmlHttp.setRequestHeader(key,headers[key])
        }
        xmlHttp.onreadystatechange = function(){
            if(xmlHttp.readyState == 4 && xmlHttp.status ==200){
                resolve(this.responseText);
            }else if(xmlHttp.readyState == 4 && xmlHttp.status !=200){
                reject(new Error("There have some error"))
            }
            
        }
        xmlHttp.send(config.data)
    })
}
let axios = createInstance;
module.exports = axios;