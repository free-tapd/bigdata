/**
 * 备案人数的折线图
 * 单独修改
 */
var myChart1 = echarts.init(document.getElementById('line-chart'));
option = {
    grid:{
        backgroundColor:'transparent',
    },
    tooltip:{
        show:true,
        trigger:'axis',
        axisPointer: {
            type: 'cross',
            animation: false,
            label: {
                backgroundColor: '#ccc',
                borderColor: '#aaa',
                borderWidth: 1,
                shadowBlur: 0,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                textStyle: {
                    color: '#222'
                }
            }
        },
        // formatter: function (params) {
        //     return params[2].name + '<br />' + params[2].value;
        // }
    },
    xAxis: {

        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        axisTick:{
            show:false,
            lineStyle:{
                color:"#f00"
            }
        },
        axisLabel:{
            color:'#fff'
        },
        splitLine:{
            show:true
        }
    },
    yAxis: {
        type: 'value',
        // interval:1500,
        axisLine:{
            lineStyle:{
                width:2,
                color:'rgba(12,102,173,.5)',
            }
        },
        data:[0,1500,3000,4500,6000],
        // axisLabel:{
        //     formatter: function (value, index) {
        //         console.log(value,index)
        //         // 格式化成月/日，只在第一个刻度显示年份
        //         var date = new Date(value);
        //         var texts = [(date.getMonth() + 1), date.getDate()];
        //         if (index === 0) {
        //             texts.unshift(date.getYear());
        //         }
        //         return texts.join('/');
        //     }
        // },

        axisTick:{
            show:false,
        },
        axisLabel:{
            color:'#fff'
        },
    },
    series: [{
        data: [820, 932, 50, 934, 1290, 2000, 1320],
        symbolSize: 10,
        type: 'line',//'effectScatter',
        itemStyle: {
            normal: {
                color: '#09b0f5',
                lineStyle: {
                    color: "#37FFF3"
                }
            }
        },
        rippleEffect:{
            period: 4,
            scale: 2.5,
            brushType: 'fill',
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(0,255,254 ,1)'
                }, {
                    offset: .4,
                    color: 'rgba(0,255,254 ,.5)',
                    opacity:'.1'
                },{
                    offset:1,
                    color:'#031230'
                }])
            }
        },
        textStyle:{
            color:"#fff",
            fontWeight:'600'
        }
    }]
};

myChart1.setOption(option)