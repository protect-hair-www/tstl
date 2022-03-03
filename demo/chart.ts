/*
 * @Author: hzheyuan
 * @Date: 2022-03-03 14:42:44
 * @LastEditTime: 2022-03-03 15:00:39
 * @LastEditors: hzheyuan
 * @Description: 绘制数据结构，方便测试
 * @FilePath: \tstl\demo\chart.ts
 */

export class Chart {
    chart: any

    constructor(id) {
        this.createChart(id)
    }

    createChart(id) {
        const chartDom = document.getElementById(id);
        this.chart = ((window as any).echarts).init(chartDom);
    }

    getChartData = (tr) => {
        const dfs = (node: any) => {
            if (node === tr.nil) {
                return { name: 'nil', itemStyle: { color: '#000' }, children: [] };
            }

            let data: any = {
                name: `${node.key}:${node.value}`,
                // name: `${node.key}`,
                itemStyle: {
                    color: node.color === 0 ? '#f00' : '#000'
                },
                children: []
            };
            if (node.left) {
                let ld: any = dfs(node.left);
                data.children.push(ld);
            }

            if (node.right) {
                let rd = dfs(node.right);
                data.children.push(rd);
            }
            return data;
        }
        return dfs(tr.root)
    }

    drawTree = (tr) => {
        const data = this.getChartData(tr)
        this.chart.setOption(
            ({
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
    }

    updateChart = (tr) => {
        const data = this.getChartData(tr);
        let op = this.chart.getOption();
        op.series[0].data[0] = data;
        // this.chart.clear()
       this.chart.setOption(op, { notMerge: true });
    }
}



