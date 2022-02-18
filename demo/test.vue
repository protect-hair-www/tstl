<!--
 * @Author: hzheyuan
 * @Date: 2022-02-17 15:19:12
 * @LastEditTime: 2022-02-18 16:06:57
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: \tstl\demo\test.vue
-->
<template>
  <dev class="test">
    <div id="main" style="width: 600px;height:400px;"></div>
  </dev>
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
    const array = [1, 5, 7, 3, 2, 4, 8, 6];
    const tr = new Tree((a, b) => a - b);
    array.forEach((key) => {
      tr.insert(key)
    });
    tr.inorderWalk(tr.root);

    // 格式化显示
    function dfs(node) {
      if(node === tr.nil) {
        return {};
      }

      let data = {name: node.key, children: []};
      if(node.left) { 
        let ld = dfs(node.left);
        data.children.push(ld);
      }

      if(node.right) {
        let rd = dfs(node.right);
        data.children.push(rd);
      }

      return data;
    }

    const data = dfs(tr.root);

    const chartDom = document.getElementById('main');
    const myChart = echarts.init(chartDom);

    let option;
    myChart.setOption(
      (option = {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [
          {
            type: 'tree',
            data: [data],
            left: '2%',
            right: '2%',
            top: '8%',
            bottom: '20%',
            symbolSize: 30,
            symbol: 'circle',
            orient: 'vertical',
            initialTreeDepth: -1,
            label: {
              position: 'inside',
              verticalAlign: 'middle',
              align: 'middle',
              fontSize: 14
            },
            animationDurationUpdate: 750
          }
        ]
      })
    )
  }
}
</script>
<style lang="css" scoped>
</style>