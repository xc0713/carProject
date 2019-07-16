<template>
    <div class="wrap">
        <header>
            <p>可向多个商家咨询最低价，商家及时回复</p>
        </header>
    </div>
</template>

<script >
import Vue from 'vue';
import {mapState, mapActions} from 'vuex';
export default Vue.extend({
    name:'quotation',
    data(){
        return{
            
        }
    },
  computed: {
    ...mapState({
    //    getCarBrandList: state=>state.home.getCarBrandList
    })
  },
  methods: {
    ...mapActions({
       getQuotationData:'quotation/getQuotationData'
    })
  },
  created(){
      this.getQuotationData({carId:this.$route.query.carId,cityId:this.$route.query.cityId});
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
    }
</style>

