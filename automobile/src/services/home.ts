import request from '../utils/request'

export function getCarBrand(params:any){
    // console.log(params,'params....')
    return request({
        url:'/v2-car-getMakeListByMasterBrandId.html?MasterID='+params,
        method:"GET"
    })
}
///location-client.html 城市id
export function getCityId(){
    // console.log(params,'params....')
    return request({
        url:'location-client.html',
        method:"GET"
    })
}

export function getCarDetail(params:any){
    return request({
        url:'/v2-car-getInfoAndListById.html?SerialID='+params.SerialID,
        method:"GET"
    })
}
//请求首页数据
export function Getlist(){
   return request({
       url:"/v2-car-getMasterBrandList.html",
       method:'GET'
   })
}
