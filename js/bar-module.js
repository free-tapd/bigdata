$(document).ready(function () {
    /**柱状图**/
    //随即颜色函数
    function randomHexColor() { //随机生成十六进制颜色
        var hex = Math.floor(Math.random() * 16777216).toString(16); //生成ffffff以内16进制数
        while (hex.length < 6) { //while循环判断hex位数，少于6位前面加0凑够6位
            hex = '0' + hex;
        }
        return '#' + hex; //返回‘#’开头16进制颜色
    }
    var colorList = []
    function changeColorList(fn) {
       
        for (var i = 0; i < 14; i++) {
            var a = new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [{
                        offset: 0,
                        color: randomHexColor()
                    },
                    {
                        offset: 1,
                        color:'#fff'
                    },
                ]
            )
            colorList.push(a)
        }
        
    }

    var myChartBarCity = echarts.init(document.getElementById('barCity'));
    var barCityDate = ["石家庄市", "唐山市", "保定市", "承德", "秦皇岛", "张家口", "衡水市", "沧州市", "邢台市", "定州市", "廊坊市", "辛集市", "邯郸", "雄安新区"];
    var barCityData = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 500, 300, 800];


    function initBarCity() {
           changeColorList()
           
        option = {
            grid: {
                top: '60'
            },
            tooltip: {
                show: true,
                trigger: 'axis',
                axisPointer: {
                    type: "shadow",
                    axis: 'auto',
                }
            },
            backgroundColor: 'transparent',
            xAxis: {
                type: 'category',
                axisLabel: {
                    color: '#fff',
                    interval: 0
                },
                axisTick: {
                    //x轴线的刻度
                    show: false,
                },
                // splitLine: {
                //     show: true,
                //     lineStyle:{
                //         width:1,
                //         type:'solid',
                //     }
                // },
                axisLine: {
                    lineStyle: {
                        color: '#083162',
                        width: '2'
                    }
                },
                minInterval: 0,
                splitArea : {
                    show : true,
                    interval:0,
                    areaStyle : {
                        // color : [ 'rgba(0,0,0,.1)' ],
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        opacity :.1
                    }
                },
            },
        
            yAxis: {
                type: "value",
                axisLabel: {
                    color: "#fff",
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#083162',
                        width: '2'
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            },
            series: [{
                type: 'bar',
                barWidth: 13,
                barCategoryGap: '80%',
                barGap: '20%',
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        color: '#099bdb',
                        fontSize: 13,
                        fontWeight: 'bold',
                    }
                },
                itemStyle: {
                    normal: {
                        // color: new echarts.graphic.LinearGradient(
                        //     0, 0, 0, 1,
                        //     [
                        //         {offset: 0, color: '#09b0f5'},
                        //         {offset: 1, color: '#0c66ad'},
                        //     ]
                        // )

                        color: function (params) {
                        
                           // var colorList = [a, '#EFE42A', '#64BD3D', '#EE9201', '#29AAE3', '#B74AE5', '#0AAF9F', '#E89589', '#16A085', '#4A235A', '#C39BD3 ', '#F9E79F', '#BA4A00', '#ECF0F1', '#616A6B', '#EAF2F8', '#4A235A', '#3498DB'];
                          
                           return colorList[params.dataIndex]
                          
                        }
                    },
                    emphasis: {
                        // color: new echarts.graphic.LinearGradient(
                        //     0, 0, 0, 1,
                        //     [{
                        //             offset: 0,
                        //             color: '#2378f7'
                        //         },
                        //         {
                        //             offset: 0.7,
                        //             color: '#0c66ad'
                        //         },
                        //         {
                        //             offset: 1,
                        //             color: '#0c66ad'
                        //         }
                        //     ]
                        // )
                    }


                },

                // data: data
            }]
        };
    }

    function makeBarCity() {
        option.series[0].data = barCityData;
        option.xAxis.data = barCityDate;
        myChartBarCity.setOption(option);
    }
    initBarCity();
    makeBarCity();

    //左边的柱状图
    function initMain() {
        // var myChartMain = echarts.init(document.getElementById('main'));
        var warningcolorValue=400;//根据预警值变化柱子的颜色，值设置
        option = {
            tooltip: {
                    trigger: 'axis',
                    formatter: '{b}：{c}人',//悬停显示数据单位
                    backgroundColor:'gray',
                    borderWidth: 2,
                    extraCssText: 'box-shadow: 0 0 13px yellow;',
                    axisPointer: {
                        type: 'line',
                        lineStyle:{
                           type:'dotted',
                        }
                    }
            },
            grid: [{
                top: 20,
                width: '100%',
                bottom: 20,
                left: 70,
                right:20,
                // containLabel: false,
                // backgroundColor: 'red',
            },],
            xAxis: [{
                type: 'value',
                // min:1.1,
                // max:.8,
                // splitNumber:10,
                axisLine: {show: false},
                splitLine: {show: false},
                axisTick: {show: false},
                offset: 10,
                axisLabel: {
                    margin:10,
                    textStyle: {
                    color: function (value) {//x轴颜色的设定
                         return value >= warningcolorValue ? 'yellow' : 'blue';//横坐标预警值
                    },
                }
            }
            }],
            yAxis: [{
                type: 'category',
                data: barCityDate,
                
                splitLine: {
                    show: true,
                    lineStyle:{
                        width:1,
                        type:'solid',
                        color: ['#112958'],
                    }
                },
                minInterval :1,
                interval :10,  
                axisTick: {show: false},
                axisLine: {show: false},
                axisLabel: {
                    formatter: function (value) {
                        console.log('{value|' + value + '}');
                        
                        return '{value|' + value + '}';
                    },
                    margin: 10,
                    rich: {
                        value: {
                            height: 10,
                            align: 'center',
                            backgroundColor: 'transparent',
                            width:60,
                            color: '#fff',
                            fontSize: 14,
                            borderWidth:1,
                            borderColor:'transparent',
                        },
                    }
                },
                splitArea : {
                            show : true,
                            areaStyle : {
                                color : [ 'transparent' ]
                            }
                        },
            },{

            }],
            series: [{
                type: 'pictorialBar',//指定类型
                symbol: 'roundRect',//柱子显示的样式，'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                symbolRepeat: true,//每个小symbol是否重复
                symbolSize: [5, 10],//图形的宽和高
                symbolMargin: 1,//图形之间的间距
                itemStyle : {  
                          color: function (params){
                                if(params.data>warningcolorValue){//系列预警值，根据预警值变化柱子的颜色
                                    var warningColor= new echarts.graphic.LinearGradient( 0, 0, 1, 0,[{offset: 0, color: '#ff995b'},{offset: 1, color: '#eb3838'}]);
                                    return warningColor;
                                }
                                else{
                                    var normalColor= new echarts.graphic.LinearGradient( 0, 0, 1, 0,[{offset: 0, color: '#6fb7ff'},{offset: 1, color: '#1f81e2'}]);
                                    return normalColor;
                                }
                            },
                            
                },
                emphasis: { 
                    itemStyle : { 
                        shadowColor: 'gray',
                        shadowBlur: 10,
                        shadowOffsetX:10,
                        shadowOffsetY:-4,
                    }
                },
                label: {
                         position: 'right',//标签数据显示的位置
                        show: true,
                        color:'#fff',
                        formatter: '{c}人'//加单位
                },
                data: barCityData,
            }]
         
        }
        
        // myChartMain.setOption(option);
        
    }

    initMain()
})