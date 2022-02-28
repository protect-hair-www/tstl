<!--
 * @Author: hzheyuan
 * @Date: 2022-02-17 15:19:12
 * @LastEditTime: 2022-02-28 19:30:33
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: \tstl\demo\rbtree.vue
-->
<template>
  <dev class="red-black-tree">
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
          // name: `${node.key}:${node.size}`,
          name: `${node.key}`,
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
      const n = this.tr.insert_unique(v);
      console.log(n);
      this.updateChart();
    },

    onDelete(e) {
      const v = Number(e.target.value)
      this.tr.erase(v);
      this.updateChart();
    },

    onRotateLeft(e) {
      const v = Number(e.target.value)
      const n = this.tr.find(v).get();
      this.tr.leftRotate(n);
      this.updateChart();
    },

    onRotateRight(e) {
      const v = Number(e.target.value)
      const n = this.tr.find(v).get();
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
    // const array = this.getRanddomTestData(100)
    const array = [11, 2, 14, 1, 7, 15, 5, 8, 4, 9, 12, 17, 10, 20, 22]
    // const array = [10]
    this.tr = new Tree();
    array.forEach((key) => {
      this.tr.insert_unique(key)
      // console.log('verify', this.tr.verify())
    });
    // console.log('verify', this.tr.verify())
    // 可视化整颗树
    const data = this.getChartData(this.tr.root);
    this.drawChart(data);
    // this.tr.inorderWalk(node => console.log(node.key), 14);
    console.log('tree instance: ', this.tr)
    console.log('size', this.tr.size);
    console.log('empty', this.tr.empty);
    console.log('lower_bound', this.tr.lower_bound(3).get())
    console.log('upper_bound', this.tr.upper_bound(5).get())

    // begin迭代器
    let beginItr = this.tr.begin();
    console.log('begin iterator', beginItr.get());
    let bstr = ''
    for(let item of beginItr) {
      bstr += ` ${item}`
    }
    console.log('begin loop', bstr)

    // entries
    // let entriesItr = this.tr.begin();
    // for(let e of entriesItr.entries()) {
    //   console.log(e)
    // }
    // keys
    // let keysItr = this.tr.begin();
    // for(let k of keysItr.keys()) {
    //   console.log(k)
    // }
    // values
    // let valuesItr = this.tr.begin();
    // for(let k of valuesItr.values()) {
    //   console.log(k)
    // }

    // end迭代器
    let endItr = this.tr.end();
    console.log('end iterator', endItr);
    console.log('iter equal', beginItr.get() === endItr.get())

    // find方法，返回一个迭代器
    let findItr = this.tr.find(10);
    console.log('find iterator', findItr);

    console.log(findItr.get());
    // console.log(this.tr._black_size(findItr.get()))

    // let fstr = ''
    // for(let item of findItr) {
    //   fstr += ` ${item}`
    // }
    // console.log('find loop', fstr)
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