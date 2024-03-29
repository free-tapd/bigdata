var myChartMain = echarts.init(document.getElementById('main'));
var barCityDate = ["石家庄市", "唐山市", "保定市", "承德", "秦皇岛", "张家口", "衡水市", "沧州市", "邢台市", "定州市", "廊坊市", "辛集市", "邯郸", "雄安新区"];
var barCityData = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 500, 300, 800];
var myColor = ['#eb2100', '#eb3600', '#d0570e', '#d0a00e', '#34da62', '#00e9db', '#00c0e9', '#0096f3', '#33CCFF', '#33FFCC'];
option = {
    backgroundColor: '#0e2147',
    grid: {
        left: '11%',
        top: '12%',
        right: '0%',
        bottom: '8%',
        // top: 20,
        // width: '100%',
        // bottom: 20,
        // left: 70,
        // right:20,
        containLabel: true
    },
    xAxis: [{
        show: false,
    }],
    yAxis: [{
        axisTick: 'none',
        axisLine: {
            show:false,
            lineStyle:{
                color:"#fff"
            }
        },
        offset: '27',
        axisLabel: {
            textStyle: {
                color: '#ffffff',
                fontSize: '16',
            },
            rich: {
                value: {
                    height: 10,
                    align: 'center',
                    backgroundColor: '#fff',
                    width:60,
                    color: '#fff',
                    fontSize: 14,
                    borderWidth:1,
                    borderColor:'transparent',
                },
            }
        },
        data: barCityDate,
    }, {
        axisTick: 'none',
        axisLine: 'none',
        axisLabel: {
            textStyle: {
                color: '#ffffff',
                fontSize: '16',
            }
        },
        data: ['14','13','12','11','10', '9', '8', '7', '6', '5', '4', '3', '2', '1']
    }, {
        name: '',
        nameGap: '30',
        nameTextStyle: {
            color: '#ffffff',
            fontSize: '16',
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(0,0,0,0)'
            }
        },
        data: [],
    }],
    series: [{
            name: '条',
            type: 'pictorialBar',
            yAxisIndex: 0,
            data: [4, 13, 25, 29, 38, 44, 50, 52, 60, 72,85,50,78,47],
               symbol: 'roundRect',//柱子显示的样式，'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                symbolRepeat: true,//每个小symbol是否重复
                symbolSize: [5, 10],//图形的宽和高
                symbolMargin: 1,//图形之间的间距
                itemStyle : {  
                          color: function (params){
                                if(true){//系列预警值，根据预警值变化柱子的颜色
                                    var warningColor= new echarts.graphic.LinearGradient( 0, 0, 1, 0,[{offset: 0, color: '#ff995b'},{offset: 1, color: '#eb3838'}]);
                                    return warningColor;
                                }
                                else{
                                    var normalColor= new echarts.graphic.LinearGradient( 0, 0, 1, 0,[{offset: 0, color: '#6fb7ff'},{offset: 1, color: '#1f81e2'}]);
                                    return normalColor;
                                }
                            },
                            
                },
            // label: {
            //     normal: {
            //         show: true,
            //         position: 'right',
            //         textStyle: {
            //             color: '#ffffff',
            //             fontSize: '16',
            //         }
            //     }
            // },
            barWidth: 20,
            itemStyle: {
                normal: {
                    color: function(params) {
                        var num = myColor.length;
                        return myColor[params.dataIndex % num]
                    },
                    
                }
            },
            z: 2
        }, {
            name: '白框',
            type: 'bar',
            yAxisIndex: 1,
            barGap: '-100%',
            data: [99, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5,99.5,99.5,99.5,99.5],
            barWidth: 20,
            itemStyle: {
                normal: {
                    color: '#0e2147',
                    barBorderRadius: 5,
                }
            },
            z: 1
        }, {
            name: '外框',
            type: 'bar',
            yAxisIndex: 2,
            barGap: '-100%',
            data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100,100,100,100,100],
            barWidth: 24,
            itemStyle: {
                normal: {
                    color: function(params) {
                        var num = myColor.length;
                        return myColor[params.dataIndex % num]
                    },
                    barBorderRadius: 5,
                }
            },
            z: 0
        },
     
    ]
};

myChartMain.setOption(option);