<template>
    <div class="wrap">
        <header>
            <p>可向多个商家咨询最低价，商家及时回复</p>
        </header>
       <div class="content" ref='content'>
           <div class="contInfo">
               <img :src="pic" alt="">
               <div class="contInfoDiv" @click="toCarStyle">
                   <p>{{AliasName}}</p>
                   <p>{{detailObj&&detailObj.car_name}}</p>
               </div>
           </div>
           <div class="personInfo">
               <p class="personTit">个人信息</p>
               <ul class='personUl'>
                   <li>
                       <span>姓名</span>
                       <input type="text" placeholder="输入你的真实中文姓名"  v-model="personName" >
                   </li>
                   <li>
                       <span>手机</span>
                       <input type="text" placeholder="输入你的真实手机号码"   v-model="personTel">
                   </li>
                   <li>
                       <span>城市</span>
                       <span @click="changeActive">{{name}}</span>
                   </li>
               </ul>
               <div class="personBtn">
                   <button @click="getcheapData">询最低价</button>
               </div>
           </div>
           <div class="dealerInfo">
               <p class="dealerTit">选择报价经销商</p>
               <ul class="dealerUl">
                 <li v-for="(val,index) in quotationArr"
                 :key="index">
                     <p>
                         <span>{{val.dealerShortName}}</span>
                         <span>{{val.promotePrice}}万</span>
                     </p>
                     <p>
                         <span>{{val.address}}</span>
                         <span>售{{val.saleRange}}</span>
                     </p>
                     <p :class="val.flag?'active':''" @click="changeFlag(val)">{{val.flag?'√':''}}</p>
                 </li>
               </ul>
           </div>
       </div>
       <footer v-if="flag"> 
           <button @click="getcheapData">询最低价</button>
       </footer>
       <div class="city" v-if="activeFlag" >
           <div class="provinces">
               <div class="locationCity">
                  <p>自动定位</p>
                  <p>北京</p>
               </div>
               <div class="cityList">
                   <p>省市</p>
                   <ul>
                       <li v-for="(val,index) in provinceArr"
                       :key="index" @click="getCitysId(val.CityID)" >
                            {{val.CityName}}
                       </li>
                   </ul>
               </div>
           </div>
           <div class="provincesCitys" v-if="maskFlag" @click="maskFlag=!maskFlag">
                <ul class="citysRender">
                    <li v-for="(val,i) in cityList"
                    :key="i" @click="changeActive(val.CityName,val.CityID)">{{val.CityName}}</li>
                </ul>
           </div>
       </div>
       <div class="alert" v-if="isOk">
           <div class="alertCont">
               <div class="alertWrap">
                   <span class="alertSub"></span>
                   <span class="alertTit">{{message}}</span>
                   <span class="alertOk" @click="isOk=!isOk">好</span>
               </div>
           </div>
       </div>
       <div class="result" v-if="isResult">
            <div class="resultWrap">
                <img src="../assets/dui.png" alt="">
                <p class="p1">询价成功</p>
                <p class="p2">
                    稍后有专业汽车顾问为你服务 <br>
                    请保持手机畅通
                </p>
                <div>
                    <button @click="isResult=!isResult">确定</button>
                </div>
            </div>
       </div>
    </div>
</template>

<script >
import Vue from 'vue';
import {mapState, mapActions} from 'vuex';
export default Vue.extend({
    name:'quotation',
    data(){
        return{
            personName:'',
            personTel:null,
            isOk:false,
            flag:false,
            activeFlag:false,
            maskFlag:false,
            name:'北京',
            carId:null,
            message:'',
            num:'',
            isResult:false
        }
    },
  computed: {
    ...mapState({
       detailObj: state=>state.quotation.detailObj,
       quotationArr: state=>state.quotation.quotationArr,
       pic:state=>state.quotation.pic,
       provinceArr:state=>state.quotation.provinceArr,
       cityList:state=>state.quotation.cityList,
       AliasName:state=>state.quotation.AliasName
    })
  },
  methods: {
    ...mapActions({
       getQuotationData:'quotation/getQuotationData',
       getCityData:'quotation/getCityData',
       getProvinceData:'quotation/getProvinceData',
       sendsData:'quotation/sendsData'
    }),
    toCarStyle(){
         this.$router.history.push('/allCarStyle')
    },
    getcheapData(){
        this.num='';
        // console.log(/^([\u4e00-\u9fa5]){2,7}$/.test(this.personName))
        if(!/^([\u4e00-\u9fa5]){2,7}$/.test(this.personName)){
            this.message='请输入真实的姓名';
            this.isOk=true;
        }else if(!/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(this.personTel)){
            this.message='请输入正确的手机号';
            this.isOk=true;
        }else{
             let data=this.quotationArr.filter((item,i)=>{
                 return item.flag===true;
             })
             if(data.length===0){
                this.message='请先选择报价经销商';
                this.isOk=true;
             }else{     
                 data.map(item=>{
                    this.num+=item.dealerId+','
                 })
                 if(this.personName&&this.personTel&&this.name&&this.carId&&this.num){
                     this.isResult=true;
                 }
                 this.sendsData({location:this.name,mobile:this.personTel,carid:this.carId,name:this.personName,dealerids:this.num});
             }
        } 
    },
    changeFlag(val){
        val.flag=!val.flag;
    },
    changeActive(name,cityId){
        this.name=name;
        this.activeFlag=!this.activeFlag;
        this.getQuotationData({carId:this.carId,cityId:cityId});
    },
    getCitysId(provinceid){
        this.maskFlag=!this.maskFlag;
        this.getProvinceData(provinceid)
    },
    handleScroll(){
        let clientHeight = document.documentElement.clientHeight || document.body.clientHeight; 
        let scrollObj =this.$refs.content;
        let scrollTop = scrollObj.scrollTop; // div 到头部的距离
        let scrollCount=clientHeight+scrollTop;
        if(scrollCount>=1065){
            this.flag=true;
        }else{
            this.flag=false;
        }
    }
  },
  mounted(){
      window.addEventListener('scroll', this.handleScroll, true);  // 监听（绑定）滚轮滚动事件
  },
  created(){
      this.carId=this.$route.query.carId;
      this.getCityData();
      this.getQuotationData({carId:this.$route.query.carId,cityId:this.$route.query.cityId});
  },
  beforeDestroy(e) {
      window.removeEventListener('scroll', this.handleScroll);   //  离开页面清除（移除）滚轮滚动事件
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
        font-size: 12px;
        display: flex;
        flex-direction: column;
        .result{
            position: fixed;
            z-index: 101;
            top: 0;
            width: 100%;
            height: 100%;
            text-align: center;
            background: rgba(0,0,0,.5);
            display: -webkit-box;
            display: flex;
            -webkit-box-align: center;
            align-items: center;
            -webkit-box-pack: center;
            justify-content: center;
            .resultWrap{
                height: auto;
                background: #fff;
                border-radius: .2rem;
                padding: .3rem .3rem 0;
                text-align: center;
                display: inline-block;
                width: 76%;
                overflow: hidden;
                img{
                    width: .8rem;
                    display: block;
                    margin: 0 auto .3rem;
                }
                .p1{
                    font-size: .4rem;
                    color: #3cc144;
                    margin: .1rem;
                }
                .p2{
                    font-size: .24rem;
                    color: silver;
                    margin: .15rem;
                }
                div{
                    width: 120%;
                    margin-left: -10%;
                    height: .8rem;
                    margin-top: .3rem;
                    border-top: 1px solid #f4f4f4;
                    button{
                        border: none;
                        width: 50%;
                        background: transparent;
                        font-size: .3rem;
                        line-height: .8rem;
                        padding: 0;
                        box-sizing: border-box;
                        color: #3aacff;
                        outline: 0;
                    }
                }
            }
        }
        .alert{
            width: 100%;
            height: 100%;
            overflow: hidden;
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            z-index: 1001;
            background-color: rgba(0,0,0,.4);
            .alertCont{
                position: fixed;
                z-index: 1002;
                background: #f6f6f6;
                border-radius: 7px;
                width: 72%;
                left: 50%;
                top: 50%;
                text-align: center;
                transform: translate(-50%,-50%);
                .alertWrap{
                    height: 100%;
                    .alertSub{
                        display: block;
                        width: 80%;
                        margin: 0 auto;
                        padding: 18px 0 6px;
                        line-height: 22px;
                        font-size: 16px;
                        font-weight: 700;
                    }
                    .alertTit{
                        display: block;
                        margin: 0 auto;
                        padding: 0 0 20px;
                        max-width: 86%;
                        line-height: 16px;
                        font-size: 13px;
                        color: #000;
                    }
                    .alertOk:before{
                        content: "";
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        border-bottom: 1px solid #c8c7cc;
                        transform: scaleY(.5);
                     }
                    .alertOk{
                        position: relative;
                        display: block;
                        width: 100%;
                        padding: 14px 0;
                        border-radius: 0 0 7px 7px;
                        line-height: 16px;
                        font-size: 16px;
                        color: #007aff;
                    }
                }
            }
        }
        header{
            height: .6rem;
            line-height: .6rem;
            width: 100%;
            background: #79cd92;
            text-align: center;
            z-index: 99;
            p{
                color: #fff;
                font-size: .3rem;
                display: inline-block;
            }
        }
        .content{
            -webkit-box-flex: 1;
            flex: 1;
            width: 100%;
            height: auto;
            background: #f4f4f4;
            overflow-y: scroll;
            .contInfo{
                background: #fff;
                padding: .32rem .18rem .24rem;
                position: relative;
                height: 2rem;
                box-sizing: border-box;
                display: flex;
                img{
                    width: 2.3rem;
                    height: 1.41rem;
                    border: 1px solid #eee;
                    box-sizing: border-box;
                    border-radius: 5px;
                }
                .contInfoDiv{
                    margin-left: .2rem;
                    width: 4.3rem;
                    justify-content: center;
                    flex-direction: column;
                    display: flex;
                    p:nth-child(1){
                        font-size: .36rem;
                        line-height: 1;
                    }
                    p:nth-child(2){
                        margin-top: .26rem;
                        font-size: .32rem;
                        line-height: 1.2;
                        color: #333;
                    }
                }
            }
            .personInfo{
                width: 100%;
                .personTit{
                    height: .5rem;
                    line-height: .5rem;
                    font-size: .24rem;
                    color: #666;
                    background: #eee;
                    padding: 0 .2rem;
                }
                .personUl{
                    background: #fff;
                    padding: 0 .2rem;
                    li{
                        font-size: .32rem;
                        height: .88rem;
                        line-height: .88rem;
                        border-bottom: 1px solid #eee;
                        box-sizing: border-box;
                        color: #000;
                        &:nth-child(3){
                            span:nth-child(2){
                                display: inline-block;
                                width: 88%;
                                color: #555;
                                text-align: right;
                                box-sizing: border-box;
                            }
                            span:nth-child(2):after{
                                content: "";
                                display: inline-block;
                                padding-top: .16rem;
                                padding-right: .16rem;
                                border-top: 1px solid silver;
                                border-right: 1px solid silver;
                                -webkit-transform: rotate(45deg);
                                transform: rotate(45deg);
                            }
                        }
                        span{
                            font-size: .32rem;
                            height: .88rem;
                            line-height: .88rem;
                            border-bottom: 1px solid #eee;
                            box-sizing: border-box;
                            color: #000;
                        }
                        input{
                            font-size: .32rem;
                            padding-right: .2rem;
                            width: 88%;
                            text-align: right;
                            box-sizing: border-box;
                            color: #555;
                            outline: none;
                            border:0;
                        }
                    }
                }
                .personBtn{
                    background: #fff;
                    text-align: center;
                    padding-top: .3rem;
                    padding-bottom: .28rem;
                    button{
                        font-size: .32rem;
                        color: #fff;
                        width: 80%;
                        background: #3aacff;
                        height: .7rem;
                        border-radius: .1rem;
                        border:0;
                        outline: 0;
                    }
                }
            }
            .dealerInfo{
                width: 100%;
                height: 100%;
                .dealerTit{
                    height: .5rem;
                    line-height: .5rem;
                    font-size: .24rem;
                    color: #666;
                    background: #eee;
                    padding: 0 .2rem;
                }
                .dealerUl{
                    width: 100%;
                    background: #fff;
                    padding: 0 .18rem;
                    li{
                        position: relative;
                        padding: .26rem 0 .26rem .54rem;
                        border-bottom: 1px solid #eee;
                        box-sizing: border-box;
                        height: 1.65rem;
                        
                        p:nth-child(1){
                            font-size: .3rem;
                            span:nth-child(2){
                                font-size: .24rem;
                                float: right;
                                color: red;
                            }
                        }
                        p:nth-child(2){
                            margin-top: .1rem;
                            font-size: .24rem;
                            color: #a2a2a2;
                            span:nth-child(1){
                                display: inline-block;
                                max-width: 4.6rem;
                            }
                            span:nth-child(2){
                                float: right;
                            }
                        }
                        p:nth-child(3){
                            content: "";
                            display: inline-block;
                            width: .32rem;
                            height: .32rem;
                            border-radius: 50%;
                            border: 2px solid #ccc;
                            box-sizing: border-box;
                            position: absolute;
                            left: .05rem;
                            top: 50%;
                            -webkit-transform: translate3d(0,-50%,0);
                            transform: translate3d(0,-50%,0);
                            &.active{
                                content: "√";
                                background: #3aacff;
                                border: none;
                                color: #fff;
                                text-align: center;
                            }
                        }
                    }
                }
            }
            .contInfo:before{
                content: "";
                display: inline-block;
                padding-top: .16rem;
                padding-right: .16rem;
                border-top: 2px solid #ccc;
                border-right: 2px solid #ccc;
                -webkit-transform: rotate(45deg);
                transform: rotate(45deg);
                position: absolute;
                right: .26rem;
                top: .9rem;
            }
        }
        footer{
            width: 100%;
            z-index: 99;
            button{
                width: 100%;
                height: 1rem;
                line-height: 1rem;
                background: #3aacff;
                text-align: center;
                font-size: .34rem;
                color: #fff;
                border:0;
                outline: 0;
            }
        }
        .city{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 106;
            background: #fff;
            overflow: hidden;
            height: 0;
            height: 100%;
            transition: transform .2s ease;
            .provinces{
                height: 100%;
                overflow-y: scroll;
                .locationCity{
                    width: 100%;
                    p:nth-child(1){
                        height: .4rem;
                        line-height: .4rem;
                        font-size: .24rem;
                        padding-left: .2rem;
                        background: #f4f4f4;
                    }
                    p:nth-child(2){
                        padding-left: .4rem;
                        font-size: .28rem;
                        height: .8rem;
                        line-height: .8rem;
                        background: #fff;
                    }
                }
                .cityList{
                    width: 100%;
                    p{
                        height: .4rem;
                        line-height: .4rem;
                        font-size: .24rem;
                        padding-left: .2rem;
                        background: #f4f4f4;
                    }
                    ul{
                        li{
                            padding-left: .3rem;
                            font-size: .28rem;
                            height: .8rem;
                            line-height: .8rem;
                            border-bottom: 1px solid #eee;
                            box-sizing: border-box;
                            margin-left: .1rem;
                            position: relative;
                        }
                        li:after{
                            content: "";
                            display: inline-block;
                            padding-top: .16rem;
                            padding-right: .16rem;
                            border-top: 1px solid #999;
                            border-right: 1px solid #999;
                            -webkit-transform: rotate(45deg);
                            transform: rotate(45deg);
                            position: absolute;
                            right: .35rem;
                            top: .3rem;
                        }
                    }
                }
            }
            .provincesCitys{
                position: fixed;
                top: 0;
                left:0;
                width: 100%;
                height: 100%;
                z-index: 107;
                background: rgba(0,0,0,.6);
                .citysRender{
                    width: 70%;
                    height: 100%;
                    float: right;
                    overflow-y: scroll;
                    -webkit-overflow-scrolling: touch;
                    background: #fff;
                    li{
                        padding-left: .3rem;
                        font-size: .28rem;
                        height: .8rem;
                        line-height: .8rem;
                        border-bottom: 1px solid #eee;
                        box-sizing: border-box;
                        margin-left: .1rem;
                        &:last-child{
                            border:0;
                        }
                    }
                }
            }
        }
    }
</style>

