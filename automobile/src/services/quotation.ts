import request from '../utils/request'

export function getQuotation(params:any){
    // console.log('params...',params)
    return request({
        url:'/v2-dealer-alllist.html?carId='+params.carId+'&cityId='+params.cityId,
        method:"GET"
    })
}
export function getCityList(){
    return request({
        url:'/v1-city-alllist.html',
        method:"GET"
    })
}
export function getProvinceList(params:any){
    return request({
        url:'/v1-city-alllist.html?provinceid='+params,
        method:"GET"
    })
}
export function sendData(params:any){
    return request({
        url:'/h2-submit-lowprice.html?carid='+params.carid+'&mobile='+params.mobile+'&dealerids='+params.dealerids+'&location='+params.location+'&name='+params.name,
        method:"GET"
    })
}

