import axios from 'axios'
// create an axios instance
const service = axios.create({
  baseURL: 'http://baojia.chelun.com/',
  // withCredentials: true, // 跨域请求时发送 cookies 127.0.0.1
  timeout: 5000 // request timeout 
})

// request interceptor
service.interceptors.request.use(
  config => {
  // //判断是否有登录状态
  // if(getToken()){
  //   //让每个请求携带authorization
  //   config.headers['authorization']=getToken()
  // }
  return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => response.data,
  error => {
    return Promise.reject(error)
  }
)


export default service
