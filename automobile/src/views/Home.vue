<template>
  <div class="home">
       <Homelist :data='list' />
       <carMask/>
  </div> 
</template>

<script>
import Vue from 'vue';
import carMask from '@/components/carMask.vue'; // @ is an alias to /src
import Homelist from '@/components/Homelist.vue'
import {mapState,mapActions} from 'vuex'
export default Vue.extend({
  data(){
    return{
       MBscroll:''
    }
  },
  components: {
   carMask,Homelist
  },
  computed:{
      ...mapState({
        list:state=>state.home.list
      })
  },
  methods:{
    ...mapActions({
        getlist:'home/getlist'
    })
    
  },
   created(){
        this.getlist() 
     
  }
})
</script>

<style lang="scss" scope>
  .home{
    width: 100%;
    height: 100%;
  }

</style>
