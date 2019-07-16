import {getQuotation} from '@/services/quotation';
const state={
  
}
// 异步改变
const actions = {
   async getQuotationData({commit}:any, payload:any){
        console.log('payload...',payload)
        let list:any=await getQuotation({carId:Number(payload.carId),cityId:Number(payload.cityId)});
        console.log('list....',list.data)
    }
}
// 同步改变, 改变数据的唯一途径
const mutations = {
    getQuotationData(state:any,payload:any){
        
    }
}


export default {
    namespaced: true,
    state,
    actions,
    mutations
}