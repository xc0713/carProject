import {Getlist} from '../../services/home'

const state={
    list:[]
}
const actions={
   async getlist({commit}:any,payload:any){
       let data = await Getlist()
       console.log(data,'data.....')
   }
}
const mutations={
      details(payload:any){
        return state.list = payload
    }
}
export default {
    namespaced:true,
    state,
    actions,
    mutations
}


// import {detailImg} from '@rver/index.ts'
// const state={
//     data:[]
// };

// const getters={

// };

// const actions={
//     async detail({commit}:any,payload:any){
//         let data = await detailImg(payload)
//         console.log(data.data)
//         commit('details',data.data)
//     }
// };

// const mutations={
//     details(payload:any){
//         console.log(payload)
//         return state.data = payload
//     }
// };

// export default{
//     namespaced:true,
//     state,
//     getters,
//     actions,
//     mutations
// }