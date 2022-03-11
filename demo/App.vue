<!--
 * @Author: hzheyuan
 * @Date: 2021-12-02 13:22:09
 * @LastEditTime: 2022-03-11 18:28:10
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: \tstl\demo\App.vue
-->
<template>
  <div>
    <!-- <RBTree /> -->
    <!-- <Iter /> -->
    <!-- <Set /> -->
    <!-- <MultiSet /> -->
    <!-- <MultiMap /> -->
    <!-- <Map /> -->
    <!-- <List/> -->
    <Vector/>
    <!-- <Deque /> -->
  </div>
</template>

<script setup lang="ts">
import RBTree from './rbtree.vue'
import Iter from './Iterator.vue'
import Set from './Set.vue'
import MultiSet from './MultiSet.vue'
import MultiMap from './MultiMap.vue'
import Map from './Map.vue'
import List from './List.vue'
import Vector from './Vector.vue'
import Deque from './Deque.vue'
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

.op {
  display: flex;
  flex-direction: row;
}

.op > div {
  margin-right: 10px;
}
</style>
