import {Getlist} from '../../services/home'

const state={
    list:[],
    letter:[],
    INDEX:'',
    MasterID:0
}
const actions={
   async getlist({commit}:any,payload:any){
       let data = await Getlist()
       console.log(data,'data.....')
       commit('details',data.data)
   },
   upINDEX({commit}:any,payload:any){
      commit('updataINDEX',payload)
   },
   gitMasterID({commit}:any,payload:any){
      commit('MasterID',payload)
   }
}
const mutations={
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
        state.MasterID=payload
        console.log(state.MasterID,'MasterID..')
    }
}
export default {
    namespaced:true,
    state,
    actions,
    mutations
}
