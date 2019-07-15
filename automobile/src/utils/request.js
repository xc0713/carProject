import Fly from "flyio/dist/npm/wx"

export let fly = new Fly
//设置超时
fly.config.timeout=10000;
//设置请求基地址
fly.config.baseURL = 'http://baojia.chelun.com/'
// fly.config.baseURL = "http://123.206.55.50:7001/"
// fly.config.baseURL = "http://169.254.12.68:7001/" //TB
// fly.config.baseURL = 'http://127.0.0.1:7001/'

const HOST = 'https://127.0.0.1' // 更改
//添加请求拦截器
fly.interceptors.request.use((request) => {
 
  return request;
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response) => {
    if (response.request.url.indexOf(HOST) == 0) {
      let hcks = response.headers['set-cookie'] || response.headers['Set-Cookie']
      if (hcks != null) {
        hcks.forEach(v => {
          let ck = v.split(';')[0].split('=')
          cookies[ck[0]] = ck[1]
        })
      }
    }
    //只将请求结果的data字段返回
    return response.data
  },
  (err) => {
    //发生网络错误后会走到这里
    //return Promise.resolve("ssss")
  }
)

export default fly
