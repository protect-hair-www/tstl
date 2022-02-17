<!--
 * @Author: hzheyuan
 * @Date: 2022-02-17 15:19:12
 * @LastEditTime: 2022-02-17 17:36:10
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: \tstl\demo\test.vue
-->
<template>
  <dev class="test">tesxxxt</dev>
</template>

<script>
import { Tree } from '../src/container/tree/Tree'
export default {
  components: {
  },

  data() {
    return {
    }
  },

  computed: {
  },

  methods: {
  },

  mounted() {
    const array = [1, 5, 3, 2, 4, 8, 6];
    const tr = new Tree();
    array.forEach((key, index) => tr.insert(index, key));
  }
}
</script>
<style lang="css" scoped>
</style>