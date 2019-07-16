import request from '../utils/request'
//请求首页数据
export function Getlist(){
   return request({
       url:"/v2-car-getMasterBrandList.html",
       method:'GET'
   })
}
