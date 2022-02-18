<!--
 * @Author: hzheyuan
 * @Date: 2022-02-17 15:19:12
 * @LastEditTime: 2022-02-18 17:06:48
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
    // const array = [5, 7, 3, 2, 4, 8, 6, 1, 9];
    const array = [5, 7, 2, 3];
    const tr = new Tree((a, b) => a - b);
    array.forEach((key) => {
      tr.insert(key)
    });
    console.log(tr.root);
    tr.inorderWalk(tr.root);

    // 格式化显示
    function dfs(node) {
      if (node === tr.nil) {
        return { name: 'nil', itemStyle: {color: '#000'}, children: []};
      }

      let data = {
        name: node.key, 
        itemStyle: {
            color: node.color === 0 ? '#f00' : '#000'
        }, 
        children: []
      };
      if (node.left) {
        let ld = dfs(node.left);
        data.children.push(ld);
      }

      if (node.right) {
        let rd = dfs(node.right);
        data.children.push(rd);
      }

      return data;
    }

    const data = dfs(tr.root);
    console.log(data);

    const chartDom = document.getElementById('main');
    const myChart = echarts.init(chartDom);

    let option;
    myChart.setOption(
      (option = {
        series: [
          {
            type: 'tree',
            data: [data],
            left: '2%',
            right: '2%',
            top: '8%',
            bottom: '20%',
            symbolSize: 32,
            symbol: 'circle',
            orient: 'vertical',
            initialTreeDepth: -1,
            label: {
              position: 'inside',
              verticalAlign: 'middle',
              align: 'middle',
              fontSize: 14
            },
            lineStyle: {
              curveness: 0
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