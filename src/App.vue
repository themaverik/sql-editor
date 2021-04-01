<template>
  <!-- Warpper -->
  <div>
    <!-- Nav -->
    <Nav />
    
    <!-- Editor -->
    <Editor />

    <!-- SQL query results -->
    <Result />
  </div>
</template>

<script>
import Editor from './components/Editor.vue'
import Nav from './components/Nav.vue'
import Result from './components/Result.vue'

export default {
  name: 'App',
  components: {
    Editor,
    Nav,
    Result
  }
}
</script>

<style>
.container {
  max-width: 1320px;
  width: 100%;
  align-items: center !important;
  padding-right: var(--bs-gutter-x, .75rem);
  padding-left: var(--bs-gutter-x, .75rem);
  margin-right: auto;
  margin-left: auto;
}
</style>