import {getCarBrand,getCarDetail} from '@/services/home';
const state={
    getCarBrandList:[],
    getcarDetailArr:[],
    getmarket_attribute:{},
    yearArr:[],
    pic:null,
    count:0,
    newCarList:[],
    defType:''   
}
// 异步改变
const actions = {
   async getCarBrandData({commit}:any, payload:any){
       // console.log('payload...',payload)
            let list:any=await getCarBrand();
            commit('changeCarBrandData',list.data)
    },
    async getCarDetailData({commit}:any, payload:any){
            //  console.log('payload...',payload)
             let list:any=await getCarDetail({SerialID:payload.SerialID});
             commit('changeCarDetailData',{market:list.data.market_attribute,lists:list.data.list,pic:list.data.CoverPhoto,count:list.data.pic_group_count})
            //  console.log(list.data)
            // console.log('list...',list.data)
     }
}
// 同步改变, 改变数据的唯一途径
const mutations = {
    changeCarBrandData(state:any,payload:any){
        state.getCarBrandList=payload
    },
    changeCarDetailData(state:any,payload:any){
        state.yearArr=[];
        payload.lists.map((item:any,i:any)=>{
            let data = state.yearArr.filter((items:any)=>items===item.market_attribute.year);
            if(data.length){
                return;
            }else{
                state.yearArr.push(item.market_attribute.year)
            }
        })
        // console.log('payload...', payload.lists)
        state.defType=payload.lists[0].exhaust_str+payload.lists[0].max_power_str+payload.lists[0].inhale_type;
        state.pic=payload.pic;
        state.count=payload.count;
        state.getmarket_attribute=payload.market;
        state.getcarDetailArr=payload.lists;
        state.newCarList=payload.lists;
    },
    changeYearList(state:any,payload:any){
        if(payload.value==='全部'){
            state.newCarList = state.newCarList;
        }else{
            let data= state.getcarDetailArr.filter((item:any,i:any)=>{
                return item.market_attribute.year===payload.value;
            })
            if(data.length){
                state.newCarList = data;
            }else{
                return;
            }
        }
        // console.log('data...11', state.newCarList)
    }
}


export default {
    namespaced: true,
    state,
    actions,
    mutations
}