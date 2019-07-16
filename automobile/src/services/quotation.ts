import request from '../utils/request'

export function getQuotation(params:any){
    console.log('params...',params)
    return request({
        url:'/v2-dealer-alllist.html?carId='+params.carId+'&cityId='+params.cityId,
        method:"GET"
    })
}