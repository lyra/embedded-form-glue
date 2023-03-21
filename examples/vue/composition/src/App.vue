<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <attach-form />
  </div>
</template>

<script>
import AttachForm from './components/AttachForm.vue'

export default {
  name: 'App',
  components: {
    AttachForm
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
</style>
