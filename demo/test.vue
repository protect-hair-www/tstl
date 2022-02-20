<!--
 * @Author: hzheyuan
 * @Date: 2022-02-17 15:19:12
 * @LastEditTime: 2022-02-20 16:37:32
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: /tstl/demo/test.vue
-->
<template>
  <dev class="test">
    <div class="op">
      <div>
        <label for="insert">insert</label>
        <input type="number" @keyup.enter="onEnter" />
      </div>
      <div>
        <label for="delete">delete</label>
        <input type="number" @keyup.enter="onDelete" />
      </div>
      <div>
        <label for="rotate">rotateLeft</label>
        <input type="number" @keyup.enter="onRotateLeft" />
      </div>
      <div>
        <label for="rotate">rotateRight</label>
        <input type="number" @keyup.enter="onRotateRight" />
      </div>
    </div>
    <div id="main" style="width: 100vw;height:100vh;"></div>
  </dev>
</template>

<script>
import { Tree } from '../src/container/tree/Tree'
import { randomNum } from './util';

export default {
  components: {
  },

  data() {
    return {
      chart: null,
      tr: null
    }
  },

  computed: {
  },

  methods: {
    updateChart() {
      const data = this.getChartData(this.tr.root);
      let op = this.chart.getOption();
      op.series[0].data[0] = data;
      // this.chart.clear()
      this.chart.setOption(op, { notMerge: true });
    },
    drawChart(data) {
      let option;
      this.chart.setOption(
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
              leaves: {
                lineStyle: {
                  width: 0
                },
                itemStyle: {
                  opacity: 0
                }
              },
              animationDurationUpdate: 750
            }
          ]
        })
      )
    },

    getChartData(root) {
      const dfs = (node) => {
        if (node === this.tr.nil) {
          return { name: 'nil', itemStyle: { color: '#000' }, children: [] };
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
      return dfs(root)
    },

    onEnter(e) {
      const v = Number(e.target.value)
      this.tr.insert(v);
      this.updateChart();
    },

    onDelete(e) {
      const v = Number(e.target.value)
      this.tr.delete(v);
      this.updateChart();
    },

    onRotateLeft(e) {
      const v = Number(e.target.value)
      const n = this.tr.find(v);
      this.tr.leftRotate(n);
      this.updateChart();
    },

    onRotateRight(e) {
      const v = Number(e.target.value)
      const n = this.tr.find(v);
      this.tr.rightRotate(n);
      this.updateChart();
    },

    getRanddomTestData(num) {
      let c = num;
      const test = new Set();
      while (c >= 0) {
        test.add(randomNum(1, 1001));
        --c;
      }
      return Array.from(test);
    }
  },

  mounted() {
    // 格式化显示
    const chartDom = document.getElementById('main');
    this.chart = echarts.init(chartDom);
    // const array = [11, 2, 14, 1, 7, 15, 5, 8, 6, 3, 3.2]
    const array = [11, 2, 14, 1, 7, 15, 5, 8, 4, 9, 12, 17, 10, 20, 22]
    this.tr = new Tree((a, b) => a - b);
    array.forEach((key) => {
      this.tr.insert(key)
    });
    // this.tr.inorderWalk(this.tr.root);

    const data = this.getChartData(this.tr.root);
    this.drawChart(data);
  }
}
</script>
<style lang="css" scoped>
.op {
  display: flex;
  flex-direction: row;
}

.op > div {
  margin-right: 10px;
}
</style>