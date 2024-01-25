<template>
  <div id="app">
    <img alt="Lyra logo" class="lyra-logo" src="./assets/lyra.png" />
    <lyra-demo />
  </div>
</template>

<script>
import LyraDemo from './components/LyraDemo1.vue'

export default {
  name: 'App',
  components: {
    LyraDemo
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.lyra-logo {
  height: 150px;
}

</style>
