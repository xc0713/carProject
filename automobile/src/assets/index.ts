//格式化数据
export function format(arr:any) {
    let newArr:any = {}
    arr.forEach((item:any) => {
        if(!newArr[item.exhaust_str+"/"+item.max_power_str+item.inhale_type]){
            newArr[item.exhaust_str+"/"+item.max_power_str+item.inhale_type]=[]
            
        }
        newArr[item.exhaust_str+"/"+item.max_power_str+item.inhale_type].push(item)
        
    })
    return newArr
   
}
//排序
export function DataSort(property: any) {
    return function (a:any, b:any) {
        var value1 = a[property];
        var value2 = b[property];  
        return value1 - value2;
    }
}
export default {
    format,DataSort
}