<template>
  <div class="content">
    <div class="Headers">
      <div>
        <span>颜色</span>
        <b>V</b>
      </div>
      <div>
        <span>车款</span>
        <b>V</b>
      </div>
    </div>
    <div class="wrap">
        <ul>
           <li v-for="(item,index) in styleList" :key='index'>
              
           </li>
        </ul>
    </div>
  </div>
</template>

<script>
import { mapActions,mapState } from "vuex";
export default {
  computed:{
  ...mapState({
       styleList:state=>state.style.styleList,
       title:state=>state.style.title
  })
  },
  methods: {
    ...mapActions({
      GetStyle: "style/GetStyle"
    })
  },
  created() {
    this.GetStyle();
  }
};
</script>

<style  lang='scss' scoped>
.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .Headers{
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    box-shadow: 0 0 10px 0 #ccc;
    div {
      flex: 1;
      text-align: center;
      b {
        margin-left: 10px;
        color: #ccc;
      }
    }
  }
  .wrap{
        flex: 1;
        ul{
            width:100%;
            height: 100%;
            li{
              width: 33%;
              height:25px;
              background: red;
            }
        }
  }
}
</style>
