import request from '../utils/request'

export function getCarBrand(){
    return request({
        url:'/v2-car-getMakeListByMasterBrandId.html?MasterID=26',
        method:"GET"
    })
}

export function getCarDetail(params:any){
    return request({
        url:'/v2-car-getInfoAndListById.html?SerialID='+params.SerialID,
        method:"GET"
    })
}