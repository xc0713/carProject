import {Getstyle} from '@/services/style'

const state={
   styleList:[],
   title:[]
}
const actions={
 async GetStyle({commit}:any,payload:any){
     let data = await Getstyle(payload)
     console.log(data.data,'data...')
     //数据处理
     let updata=data.data.map((item:any)=>{
           item.List=item.List.map((val:any)=>{
            return val.Url.replace(/\{0}/g,3)
           })
         return item.List
     })
     let dats=data.data
     let obj={updata,dats}
     commit('init',obj)
 }
}
const mutations={
   init(state:any,payload:any){
      state.styleList=payload.updata
      state.title=payload.dats
      console.log(state.styleList,'styleList...')
      console.log( state.title,' state.title....')
   }
}
export default {
    namespaced:true,
    state,
    actions,
    mutations
}
