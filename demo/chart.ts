/*
 * @Author: hzheyuan
 * @Date: 2022-03-03 14:42:44
 * @LastEditTime: 2022-03-05 17:46:02
 * @LastEditors: hzheyuan
 * @Description: 绘制数据结构，方便测试
 * @FilePath: /tstl/demo/chart.ts
 */

import { MarkedLinksPlugin } from "typedoc/dist/lib/output/plugins";

export class Chart {
    chart: any

    constructor(id) {
        this.createChart(id)
    }

    createChart(id) {
        const chartDom = document.getElementById(id);
        this.chart = ((window as any).echarts).init(chartDom);
    }

    getTreeData = (tr) => {
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
        const data = this.getTreeData(tr)
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

    getListData = (list) => {
        const begin = list.begin();
        const end = list.end();
        let data = [], links = []
        // 处理header部分
        data.push({ name: 'header' })
        links.push(
            {
                source: 'header',
                target: begin.getValue(),
                lineStyle: {
                    curveness: -0.05
                }
            },
            {
                source: 'header',
                target: end.prev().getValue(),
                lineStyle: {
                    curveness: 0.05
                }
            }
        )
        let cur = begin
        while (cur.hasNext()) {
            data.push({ name: cur.getValue() })
            const prev = cur.prev()
            const next = cur.next()
            // console.log(cur.getValue(), prev.getValue(), next.getValue(), 'zzz')
            links.push({
                source: cur.getValue(),
                target: prev.isEnd() ? 'header' : prev.getValue(),
                lineStyle: {
                    curveness: 0.05
                }
            })
            links.push({
                source: cur.getValue(),
                target: next.isEnd() ? 'header' : next.getValue(),
                lineStyle: {
                    curveness: -0.05
                }
            })
            cur = cur.next()
        }
        return { data, links }
    }

    drawList(list) {
        const { data, links } = this.getListData(list)
        // console.log(data, links)
        this.chart.setOption(
            {
                title: {
                    text: 'List 结构'
                },
                animationDurationUpdate: 1500,
                animationEasingUpdate: 'quinticInOut',
                series: [
                    {
                        type: 'graph',
                        layout: 'circular',
                        symbolSize: 50,
                        roam: true,
                        label: {
                            show: true
                        },
                        edgeSymbol: ['circle', 'arrow'],
                        edgeSymbolSize: [4, 10],
                        edgeLabel: {
                            fontSize: 20
                        },
                        data: data,
                        links: links,
                        lineStyle: {
                            opacity: 0.9,
                            width: 2,
                            curveness: 0
                        }
                    }
                ]
            }
        )
    }

    updateList(list) {
        const { data, links } = this.getListData(list);
        let op = this.chart.getOption();
        op.series[0].data = data;
        op.series[0].links = links;
        // this.chart.clear()
        this.chart.setOption(op);
    }

    updateChart = (tr) => {
        const data = this.getTreeData(tr);
        let op = this.chart.getOption();
        op.series[0].data[0] = data;
        op.series[0].data[0] = data;
        this.chart.setOption(op, { notMerge: true });
    }
}



