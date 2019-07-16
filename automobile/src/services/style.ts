import request from '../utils/request'
//请求汽车款式数据
export function Getstyle(params:any){
    return request({
        url:'v2-car-getImageList.html?SerialID=2974&_1563281762812',
        method:"GET"
    })
}