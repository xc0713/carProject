<template>
    <div class="wrap">
        <div class="type">
            <div>
                <div class="typeSub">
                    <span v-for="(val,i) in yearArr"
                    :key="i" @click="changeTab(i,val)" :class="i===defaultIndex?'active':''">
                        {{val}}
                    </span>
                </div>
                <div class="typeContent">
                    <p class="defTtp">{{defType}}</p>
                    <ul class="typeList">
                        <li v-for="(val,i) in newCarList"
                        :key="i"  @click="changeTit(val)">
                            <p class="p1">
                                <span>{{val.market_attribute.year}}款&nbsp;{{val.car_name}}</span>
                                <span>{{val.market_attribute.dealer_price_min}}</span>
                            </p>
                            <p class="p2">
                                <span>{{val.horse_power}}马力{{val.gear_num}}档{{val.trans_type}}</span>
                                <span>指导价{{val.market_attribute.dealer_price_max}}</span>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script >
import Vue from 'vue';
import {mapState, mapActions,mapMutations} from 'vuex';
export default Vue.extend({
    name:'quotation',
    data(){
        return{
           defaultIndex:0,
           defValue:''
        }
    },
  computed: {
    ...mapState({
        newCarList: state=>state.home.newCarList,
        yearArr: state=>state.home.yearArr,
        defType:state=>state.home.defType
    })
  },
  methods: {
    ...mapActions({
        // getQuotationData:'quotation/getQuotationData'
    }),
    ...mapMutations({
       changeYearList:'home/changeYearList'
    }),
    changeTab(i,val){
        this.defaultIndex=i;
        this.defValue=val;
        this.changeYearList({value:val})
    },
    changeTit(val){
        this.$router.history.push('/quotation?carId='+val.car_id+'&cityId='+201)
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
    .wrap{
        width: 100%;
        height: 100%;
    }
    .type{
        width: 100%;
        background: #f4f4f4;
        position: absolute;
        top: 0;
        z-index: 101;
        div{
            height: 100%;
            .typeSub{
                margin-top: .15rem;
                padding-left: .2rem;
                font-size: .3rem;
                line-height: .76rem;
                height: .76rem;
                background: #fff;
                overflow-y: scroll;
                -webkit-overflow-scrolling: touch;
                span{
                    padding-right: .42rem;
                    font-size: .3rem;
                    &.active{
                        color: #00afff;
                    }
                }
            }
            .typeContent{
                width: 100%;
                .defTtp{
                   height: .5rem;
                   line-height: .5rem;
                   padding: 0 .2rem;
                   font-size: .24rem;
                   color: #666;
                   background: #eee;
                }
                .typeList{
                    background: #fff;
                    width: 100%;
                    li{
                        margin: 0 .2rem;
                        padding: .28rem .06rem;
                        border-bottom: 1px solid #eee;
                        box-sizing: border-box;
                        height: 1.25rem;
                        line-height: 1;
                        p{
                            display: flex;
                            justify-content: space-between;
                        }
                        p:nth-child(1){
                           font-size: .3rem;
                           span:nth-child(1) {
                                width: 5rem;
                                display: inline-block;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                white-space: nowrap;
                                font-size: .3rem;
                            }
                            span:nth-child(2) {
                                float: right;
                                color: red;
                                font-size: .26rem;
                            }
                        }
                        p:nth-child(2){
                            padding-top: .16rem;
                            font-size: .24rem;
                            span:nth-child(1) {
                                color: #b3b3b3;
                            }
                            span:nth-child(2) {
                                color: #818181;
                            }
                        }
                    }
                }
            }
        }
    }
  
</style>

