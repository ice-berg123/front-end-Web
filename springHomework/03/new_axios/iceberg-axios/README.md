## 安装

```shell
npm install iceberg_axios
```

## 导入

```
const axios = require('iceberg_axios')
```

## 方法

```javascript
//默认get传参
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
```

