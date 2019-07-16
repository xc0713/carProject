<template>
    <div id="root">
        <div class="maskMain" v-show="flag">
            <div class="maskCont">
               <div  v-for="(val,index) in getCarBrandList"
                 :key="index">
                    <p @click="upflag">{{val.GroupName}}</p>
                    <ul>
                        <li v-for="(item,i) in val.GroupList"
                        :key='i' @click="toCarDetail(item.SerialID)">
                            <img :src="item.Picture" alt="">
                            <div>
                                <h3>{{item.AliasName}}</h3>
                                <div>{{item.DealerPrice}}</div>
                            </div>
                        </li>
                    </ul>
               </div>
            </div>
        </div>
    </div>
</template>

<script >
import Vue from 'vue';
import {mapState, mapActions} from 'vuex';
export default Vue.extend({
    data(){
        return{
         
        }
    },
  computed: {
    ...mapState({
      getCarBrandList: state=>state.home.getCarBrandList,
      flag:state=>state.home.flag,
      MasterID:state=>state.home.MasterID
    })
  },
  methods: {
    toCarDetail(SerialID){
         this.$router.history.push('/offical?SerialID='+SerialID)
    },
    ...mapActions({
        gitMasterID:'home/gitMasterID'
    }),
    upflag(){
      this.gitMasterID(false)
    }
  },
  created(){
     
  }
});
</script>

<style lang="scss" scoped>
    *{
        margin:0;
        padding:0;
    }
    li{
        list-style: none;
    }
    #root{
        width: 100%;
        height: 100%;
    }
    .maskMain{
        position: fixed;
        top: 0;
        right: 0;
        width: 0;
        transition: all .2s ease;
        z-index: 100;
        height: 100%;
        box-shadow: 0 0 0.5rem #eee;
        width: 75%;
        overflow-y: auto;
        background:#fff;

        .show{
            transform: translateX(0);
        }
        .maskCont{
            width: 100%;
            overflow-y: auto;
            p{
                margin-left: 1px;
                font-size: .28rem;
                line-height: .48rem;
                background: #f2f2f2;
                padding-left: .3rem;
                color: #717171;
            }
           ul{
               li{
                   width: 100%;
                   display: flex;
                    height: 1.4rem;
                    box-sizing: border-box;
                    border-bottom: 1px solid #ddd;
                    align-items: center;
                   img{
                        margin: 0 .1rem 0 .2rem;
                        width: 1.8rem;
                        height: 1.2rem;
                  }
                  div{
                      h3{
                          font-size: .34rem;
                          color: #5f687a;
                      }
                      div{
                          margin-top: .1rem;
                          font-size: .28rem;
                         color: red;
                      }
                  }
               }
           }
        }
    }
</style>

