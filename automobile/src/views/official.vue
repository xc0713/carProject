<template>
    <div class="wrap">
        <div class="carMain">
            <div class="carCont">
                <div class="img">
                    <img :src="pic" alt="">
                    <span>{{count}}张图片</span>
                </div>
                <div class="info">
                    <p>{{getmarket_attribute.dealer_price}} <span>万</span></p>
                    <p>指导价 {{getmarket_attribute.official_refer_price}}</p>
                    <div class="infoBtn">
                        <button>询问低价</button>
                    </div>
                </div>
                <div class="carList">
                    <div class="carListType">
                        <span @click="changeStatus(-1,'全部')" 
                        :class="defaultIndex===-1?'active':''">全部</span>
                        <span v-for="(val,i) in yearArr"
                        :key="i" @click="changeStatus(i,val)"
                        :class="i===defaultIndex?'active':''">
                            {{val}}
                        </span>
                    </div>
                    <div class="carContType">
                        <p class="defType">{{defType}}</p>
                        <ul class="carUl">
                            <li v-for="(val,index) in newCarList"
                            :key="index">
                                <p>{{val.market_attribute.year}}款&nbsp;{{val.car_name}}</p>
                                <p>{{val.horse_power}}马力{{val.gear_num}}档{{val.trans_type}}</p>
                                <p>
                                    <span>指导价{{val.market_attribute.dealer_price_max}}</span>
                                    <span>{{val.market_attribute.dealer_price_min}}</span>
                                </p>
                                <button @click="cheapAsk(val.link,val.car_id)">低价询问</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="carBottom">
                <p>询问底价</p>
                <p>本地经销商为你报价</p>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import {mapState, mapActions,mapMutations} from 'vuex';
export default Vue.extend({
    data(){
        return{
            SerialID:0,
            defaultIndex:-1,
            defValue:'全部'
        }
    },
  computed: {
    ...mapState({
        pic: state=>state.home.pic,
        count: state=>state.home.count,
        getmarket_attribute: state=>state.home.getmarket_attribute,
        getcarDetailArr: state=>state.home.getcarDetailArr,
        yearArr: state=>state.home.yearArr,
        newCarList:state=>state.home.newCarList,
        defType:state=>state.home.defType
    })
  },
  methods: {
    ...mapActions({
       getCarDetailData:'home/getCarDetailData'
    }),
    ...mapMutations({
       changeYearList:'home/changeYearList'
    }),
    changeStatus(index,val){
        this.defValue=val;
        this.defaultIndex=index;
        this.changeYearList({value:this.defValue})
    },
    cheapAsk(link,carId){
        let cityId=link.split('?')[1].split('&')[2].split('=')[1];
        this.$router.history.push('/quotation?carId='+carId+'&cityId='+210)
    }
  },
  created(){
      this.SerialID=Number(this.$route.query.SerialID);
      this.getCarDetailData({SerialID:this.SerialID})
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
    html,body{
        width: 100%;
        height: 100%;
    }
    .wrap{
        width: 100%;
        height: 100%;
        background:#f4f4f4;
    }
    .carMain{
        width: 100%;
        height: 100%;
        .carCont{
            height: 100%;
            .img{
                position: relative;
                height: 3.29rem;
                overflow: hidden;
                img{
                    width: 100%;
                    top: 50%;
                    -webkit-transform: translateY(-50%);
                    transform: translateY(-50%);
                    position: absolute;
                }
                span{
                     position: absolute;
                     bottom: .3rem;
                     right: .3rem;
                     color: #fff;
                     padding: 1px .1rem;
                     border-radius: .2rem;
                     background: rgba(0,0,0,.6);
                     font-size: .24rem;
                }
            }
            .info{
                padding: .36rem .2rem .3rem;
                background: #fff;
                position: relative;
                p{
                    max-width: 3.4rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    &:nth-child(1){
                        font-size: .36rem;
                        color: red;
                        font-weight: 500;
                        span{
                            font-size: .32rem;
                            font-weight: 400;
                        }
                    }
                    &:nth-child(2){
                        font-size: .26rem;
                        color: silver;
                    }
                }
                .infoBtn{
                    padding-top: .2rem;
                    -webkit-box-pack: justify;
                    justify-content: space-between;
                    width: 50%;
                    position: absolute;
                    right: .1rem;
                    top: .22rem;
                    display: flex;
                    button{
                        width: 100%;
                        border-radius: .1rem;
                        font-size: .32rem;
                        height: .7rem;
                        width: 3.45rem;
                        border: none;
                        box-sizing: border-box;
                        background: #00afff;
                        color: #fff;
                        outline: 0;
                    }
                }
            }
            .carList{
                width: 100%;
                .carListType{
                    border-top: .15rem solid #f4f4f4;
                    padding: 0 .3rem;
                    font-size: .32rem;
                    height: .77rem;
                    line-height: .77rem;
                    background: #fff;
                    span{
                       padding-right: .46rem;
                    }
                    .active{
                        color: #00afff;
                    }
                }
                .carContType{
                    width: 100%;
                    .defType{
                        padding: 0 .2rem;
                        height: .5rem;
                        line-height: .5rem;
                        font-size: .26rem;
                        color: #999;
                        background: #f4f4f4;
                    }
                    .carUl{
                        background: #fff;
                        display: block;
                        li{
                            padding: 0 .2rem;
                            border-bottom: .18rem solid #f4f4f4;
                            overflow: hidden;
                            background: #fff;
                            p{
                                &:nth-child(1){
                                    padding: .26rem 0 .18rem;
                                    font-size: .3rem;
                                    line-height: 1;
                                    color: #3d3d3d;
                                }
                                &:nth-child(2){
                                    color: #bdbdbd;
                                    font-size: .26rem;
                                }
                                &:nth-child(3){
                                    text-align: right;
                                    padding-bottom: .1rem;
                                    font-size: .24rem;
                                    color: #818181;
                                    span:nth-child(2){
                                        font-size: .3rem;
                                        color: #ff2336;
                                        margin-left: .1rem;
                                    }
                                }
                            }
                            button{
                                display: block;
                                border: none;
                                border-top: 1px solid #eee;
                                width: 110%;
                                height: .8rem;
                                font-size: .32rem;
                                color: #00afff;
                                background: #fff;
                                font-weight: 500;
                                margin-left: -.3rem;
                                outline: 0;
                            }
                        }
                        &:last-child {
                                border-bottom: 1rem solid #f4f4f4;
                        }
                    }
                }
            }
        }
        .carBottom{
            position: fixed;
            width: 100%;
            bottom: 0;
            z-index: 99;
            background: #3aacff;
            height: 1rem;
            color: #fff;
            text-align: center;
            p:nth-child(1){
                font-size: .32rem;
                margin-top: .12rem;
                font-weight: 500;
            }
            p:nth-child(2){
                font-size: .24rem;
            }
        }
    }
</style>

