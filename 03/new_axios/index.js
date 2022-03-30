let axios = require("iceberg_axios")
//默认传参，直接传入配置文件
axios({
    url: "http://127.0.0.1:8080/api/get?A=2"
}).then((res) => {
    console.log(res)
})
//get传参
axios.get("http://127.0.0.1:8080/api/get?A=1").then((res) => {
    console.log(res)
})
//post传参
axios.post("http://127.0.0.1:8080/api/post", {data:{a:1,b:1,c:1}}).then((res) => {
    console.log(res)
})