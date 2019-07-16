<template>
  <div id="app">
    <router-link to="/"></router-link>
    <router-view />
  </div>
</template>

<style lang="scss">
*{
    margin:0;
    padding:0;
    list-style: none;
  }
  li{
    list-style: none;
  }
  html,body,#root,#app{
    width: 100%;
    height: 100%;
  }
</style>
