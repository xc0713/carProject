<template>
      <div class="Homelist" ref='Scroll'>
          <div class="div">
               <div class="List" v-for='(item,index) in data' :key='index'>
                 <h4 ref='H4'>{{index}}</h4>
                 <div class="wrap" v-for="(val,i) in item" :key='i'  @click="NavTo(val.MasterID)">
                    <p>
                        <img :src="val.CoverPhoto" alt="">
                        <span>{{val.Name}}</span>
                    </p>
                 </div>
            </div>
            <div class="box"></div>
          </div>
        <div class="letter">
          <ul @touchstart='touchStart'
              @touchmove='touchMove'
              @touchend='touchEnd'
            >
              <li>#</li>
              <li v-for='(item,index) in letter ' :key='index' :class="Index==index?'active':null" @click="updataIndex(index)">
                  {{item}}
              </li>
          </ul>
           <div class="title">{{current}}</div>
      </div>
      </div>
</template>

<script>
import { mapState,mapActions} from 'vuex'
import BScroll from "better-scroll";
export default {
    props:['data'],
    data(){
      return{
           Index:0,
           current:'',
           isTouch:false,
           bscroll:null
      }
    },
    computed:{
        ...mapState({
           letter:state=>state.home.letter,
           INDEX:state=>state.home.INDEX 
        })
    },
    created(){

    },
    methods:{
        ...mapActions({
         upINDEX:'home/upINDEX',
         gitMasterID:'home/gitMasterID'
       }),
       updataIndex(index){
         this.Index=index
         this.upINDEX(index)
         let Element=''
         this.$refs.H4&&this.$refs.H4.forEach(item=>{
            if(this.INDEX==item.innerHTML){
                 Element=item
              }
         })
        this.bscroll.scrollToElement(Element,0)
       },
       NavTo(id){
          this.gitMasterID(id)
           this.$router.push({
            path: '/Styles', 
            name: 'Styles'
        })

       },
       touchStart(e){
         this.isTouch=true
       },
       touchMove(e){
       let pageY=e.touches[0].pageY
       let letterHeight=0.4*window.innerWidth/750*100;
       let letterOffsetTop=(window.innerHeight-letterHeight*this.data.length)/2
       let letterIndex=Math.floor((pageY-letterOffsetTop)/letterHeight)
       if(letterIndex<0){
         letterIndex=0
       }
       if(letterIndex>this.data.length-1){
           letterIndex=this.data.length-1
       }
       this.current=this.data[letterIndex]
      },
      touchEnd(e){
         this.isTouch=false
      }
    },
    mounted(){
     this.bscroll= new BScroll(this.$refs.Scroll,{
            probeType:2,
            click:true
        })
     }
}
</script>

<style lang='scss' scoped>
    .Homelist{
        width: 100%;
        height: 100%;
        font-size: 35px;
        .div{
            overflow: hidden;
          .List{
            width: 100%;
            margin: 0;
            h4{
                font-size: .28rem;
                line-height: .4rem;
                background: #f4f4f4;
                padding-left: .3rem;
                color: #aaa;
            }
            .wrap{
                    height: 1rem;
                    box-sizing: border-box;
                    border-bottom: 1px solid #ddd;
                p{
                     width: 95%;
                     margin: 0 auto;
                     display: flex;
                     img{
                        width: 35px;
                        height: 35px;
                        margin-top: 7px;
                     }
                     span{
                         width: 80%;
                         height: 100%;
                         text-align: left;
                         line-height:50px;
                         padding-left: 35px;
                     }
                }
            }
        }
        .box{
            width: 100%;
            height:350px;
        }
    }
    .letter{
       width:80px;
       height: 100%;
       font-size: 40px;
       position: fixed;
       right: 0;
       top: 0;
       z-index: 10;
       ul{
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
       }
   }
   .active{
       color: red;
   }
   .title{
       width:30px;
       height: 30px;
       position: fixed;
       right: 0;
       top: 0;
       border-radius: 5px;
       background: rgba(0, 0, 0, .6);
       text-align: center;
       line-height: 30px;
       color: #fff;
   }
    }
</style>
