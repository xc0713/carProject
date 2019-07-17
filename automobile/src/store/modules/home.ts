import {getCarBrand,getCarDetail,Getlist} from '@/services/home';
const state={
    getCarBrandList:[],
    getcarDetailArr:[],
    getmarket_attribute:{},
    yearArr:[],
    pic:null,
    count:0,
    newCarList:[],
    defType:'' ,
    list:[],
    letter:[],
    INDEX:'',
    MasterID:0,
    flag:false
}
// 异步改变
const actions = {
   async getCarBrandData({commit}:any, payload:any){
    //    console.log('payload...',payload)
            let list:any=await getCarBrand(payload);
           
            commit('changeCarBrandData',list.data)
    },
    async getCarDetailData({commit}:any, payload:any){
            //  console.log('payload...',payload)
             let list:any=await getCarDetail({SerialID:payload.SerialID});
             commit('changeCarDetailData',{market:list.data.market_attribute,lists:list.data.list,pic:list.data.CoverPhoto,count:list.data.pic_group_count})
            //   console.log(list.data)
            // console.log('list...',list.data)
     }, 
     async getlist({commit}:any,payload:any){
        let data = await Getlist()
        // console.log(data,'data.....')
        commit('details',data.data)
    },
    upINDEX({commit}:any,payload:any){
       commit('updataINDEX',payload)
    },
    gitMasterID({commit}:any,payload:any){
       commit('MasterID',payload)
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
    //    console.log('payload...', payload.lists)
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
    },
    details(state:any,payload:any){
        let arrAys:any=[]
        let Homelist:any={}
        payload.forEach((item:any)=>{
            let letter=item.Spelling[0];
            if(Homelist[letter]){
                Homelist[letter].push(item)
            }else{
                Homelist[letter]=[item]    
            }
        })
        state.list=Homelist
        state.letter=payload.map((item:any)=>{
           if(!arrAys.includes(item.Spelling.slice(0,1))){
               arrAys.push(item.Spelling.slice(0,1))
           }
           return arrAys
      })
      state.letter=state.letter[0]
    },
    updataINDEX(state:any,payload:any){
       state.INDEX=state.letter[payload]
    },
    MasterID(state:any,payload:any){
        state.flag=payload
    }
}


export default {
    namespaced: true,
    state,
    actions,
    mutations
}

