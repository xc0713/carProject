<template>
      
     
</template>
<script>
import {mapActions} from 'vuex'
export default {
   props:['data'],
   data(){
       return{
           Index:0,
           current:'',
           isTouch:false
       }
   },
   methods:{
       ...mapActions({
         upINDEX:'home/upINDEX' 
       }),
       updataIndex(index){
         this.Index=index
         this.upINDEX(index)
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
   }
}
import BScroll from "better-scroll"
</script>

<style lang='scss' scoped>
 
</style>
