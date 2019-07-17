import {getQuotation,getCityList,getProvinceList} from '../../services/quotation';
const state={
    detailObj:{},
    quotationArr:[],
    pic:null,
    provinceArr:[],
    cityList:[],
    AliasName:null
}
// 异步改变
const actions = {
   async getQuotationData({commit}:any, payload:any){
        // console.log('payload...',payload)
        let list:any=await getQuotation({carId:Number(payload.carId),cityId:Number(payload.cityId)});
        commit('changeQuotationData',{details:list.data.details,delList:list.data.list,pic:list.data.details&&list.data.details.serial.CoverPhoto,name:list.data.details&&list.data.details.serial.AliasName})
        // console.log('list....',list.data.details.serial.AliasName)
    },
    async getCityData({commit}:any, payload:any){
        // console.log('payload...',payload)
        let list:any=await getCityList();
        commit('getProvince',list.data)
    //    console.log('list...11',list.data)  
    },
    async getProvinceData({commit}:any, payload:any){
        // console.log('payload...',payload)
        let list:any=await getProvinceList(payload);
        commit('getCityList',list.data)
        //    console.log('list...11',list.data)
    }
}
// 同步改变, 改变数据的唯一途径
const mutations = {
    changeQuotationData(state:any,payload:any){
        // console.log('payload...',payload)
        payload.delList&&payload.delList.map((item:any)=>{
            item.flag=false;
        })
        // console.log('lists....',payload.delList)
        state.AliasName=payload.name
        state.pic=payload.pic;
        state.detailObj=payload.details;
        state.quotationArr=payload.delList;
    },
    getProvince(state:any,payload:any){
        state.provinceArr=payload;
    },
    getCityList(state:any,payload:any){
        console.log('payload...',payload)
        state.cityList=payload;
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}