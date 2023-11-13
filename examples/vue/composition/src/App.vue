<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <render-elements />
  </div>
</template>

<script>
import RenderElements from './components/RenderElements.vue'

export default {
  name: 'App',
  components: {
    RenderElements
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

#app > img {
  width: 100px;
}
</style>
