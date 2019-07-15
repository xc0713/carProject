<template>
  <div class="home">
       
    <carMask/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import carMask from '@/components/carMask.vue'; // @ is an alias to /src

export default Vue.extend({
  components: {
   carMask,
  },
});
</script>
