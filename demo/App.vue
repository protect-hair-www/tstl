<!--
 * @Author: hzheyuan
 * @Date: 2021-12-02 13:22:09
 * @LastEditTime: 2022-03-01 15:27:48
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: \tstl\demo\App.vue
-->
<template>
  <div>
    <!-- <RBTree /> -->
    <!-- <Iter /> -->
    <Set />
  </div>
</template>

<script setup lang="ts">
import RBTree from './rbtree.vue'
import Iter from './Iterator.vue'
import Set from './Set.vue'
</script>

<style>
html body {
  padding: 0;
  margin: 0;
  overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 10px;
}
</style>
