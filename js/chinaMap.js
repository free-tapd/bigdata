
        var myEcharts = echarts.init(document.getElementById('CHINAMAP'))
        var chinaDatas = [{
                "name": "石家庄",
                "value": 0
            },
            {
                "name": "保定",
                "value": 20
            },
            {
                "name": "张家口",
                "value": 30
            },
            {
                "name": "承德",
                "value": 40
            },
            {
                "name": "秦皇岛",
                "value": 50
            },
            {
                "name": "唐山",
                "value": 60
            },
            {
                "name": "廊坊",
                "value": 30
            },
            {
                "name": "沧州",
                "value": 20
            },
            {
                "name": "邯郸",
                "value": 30
            },
            {
                "name": "衡水",
                "value": 60
            },
            {
                "name": "邢台",
                "value": 50
            }, {
                "name": "雄安新区",
                "value": 90
            }, {
                "name": "辛集",
                "value": 50
            }, {
                "name": "定州",
                "value": 60
            }, {
                "name": "省本级",
                "value": 50
            }
        ]
        var chinaDatas2 = [
            [{
                name: '黑龙江',
                value: 0
            }],
            [{
                name: '内蒙古',
                value: 0
            }],
            [{
                name: '吉林',
                value: 0
            }],
            [{
                name: '辽宁',
                value: 0
            }],
            [{
                name: '河北',
                value: 0
            }],
            [{
                name: '天津',
                value: 0
            }],
            [{
                name: '山西',
                value: 0
            }],
            [{
                name: '陕西',
                value: 0
            }],
            [{
                name: '甘肃',
                value: 0
            }],
            [{
                name: '宁夏',
                value: 0
            }],
            [{
                name: '青海',
                value: 0
            }],
            [{
                name: '新疆',
                value: 0
            }],
            [{
                name: '西藏',
                value: 0
            }],
            [{
                name: '四川',
                value: 0
            }],
            [{
                name: '重庆',
                value: 0
            }],
            [{
                name: '山东',
                value: 0
            }],
            [{
                name: '河南',
                value: 0
            }],
            [{
                name: '江苏',
                value: 0
            }],
            [{
                name: '安徽',
                value: 0
            }],
            [{
                name: '湖北',
                value: 0
            }],
            [{
                name: '浙江',
                value: 0
            }],
            [{
                name: '福建',
                value: 0
            }],
            [{
                name: '江西',
                value: 0
            }],
            [{
                name: '湖南',
                value: 0
            }],
            [{
                name: '贵州',
                value: 0
            }],
            [{
                name: "云南",
                value: 0
            }],
            [{
                name: "广东",
                value: 0
            }],
            [{
                name: '广西',
                value: 0
            }],
            [{
                name: '海南',
                value: 0
            }],
            [{
                name: '上海',
                value: 0
            }]
        ];

        function hebeiMap(obj) {

            $.get('./js/hebei.geoJson', function (chinaJson) {
                console.log(chinaJson);
                console.log(echarts);

                echarts.registerMap('河北', chinaJson);
                var chart = echarts.init(document.getElementById('main'));
           
              
                var convertData = function (data) {
                    var res = [];
                    for (var i = 0; i < data.length; i++) {
                        var dataItem = data[i];
                        var toCoord = obj.chinaGeoCoordMap[dataItem[0].name];
                        var fromCoord = obj.chinaGeoCoordMap[obj.city];
                        if (obj.isCome) {
                            //是转入
                            if (fromCoord && toCoord) {
                                res.push([{
                                    coord: toCoord,
                                    value: dataItem[0].value
                                }, {
                                    coord: fromCoord,

                                }]);
                            }

                        } else {
                            //转出
                            if (fromCoord && toCoord) {
                                res.push([{
                                    coord: fromCoord,
                                }, {
                                    coord: toCoord,
                                    value: dataItem[0].value
                                }]);
                            }
                        }

                    }
                    return res;
                };
                var series = [];
                [
                    [obj.city, obj.chinaDatas]
                ].forEach(function (item, i) {

                    console.log(convertData(item[1]))
                    series.push({
                            type: 'lines',
                            zlevel: 2,
                            effect: {
                                show: true,
                                period: 4, //箭头指向速度，值越小速度越快
                                trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
                                symbol: 'arrow', //箭头图标
                                symbolSize: 5, //图标大小
                            },
                            lineStyle: {
                                normal: {
                                    width: 1, //尾迹线条宽度
                                    opacity: 1, //尾迹线条透明度
                                    curveness: .3, //尾迹线条曲直度 
                                    color: "#00eaff"
                                },

                            },
                            data: convertData(item[1])
                        }, {
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            zlevel: 2,
                            rippleEffect: { //涟漪特效
                                period: 4, //动画时间，值越小速度越快
                                brushType: 'stroke', //波纹绘制方式 stroke, fill
                                scale: 4 //波纹圆环最大限制，值越大波纹越大
                            },
                            label: {
                                normal: {
                                    show: false,
                                    position: 'right', //显示位置
                                    offset: [5, 0], //偏移设置
                                    formatter: function (params) { //圆环显示文字
                                        return params.data.name;
                                    },
                                    fontSize: 13
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            symbol: 'circle',
                            symbolSize: function (val) {
                                return 5 //+ val[2] * 5; //圆环大小
                            },
                            itemStyle: {
                                normal: {
                                    show: false,
                                    // color: '#f00'
                                }
                            },
                            data: item[1].map(function (dataItem) {
                                console.log(dataItem);
                                return {
                                    name: dataItem[0].name,
                                    value: obj.chinaGeoCoordMap[dataItem[0]
                                            .name]
                                        .concat([
                                            dataItem[0].value
                                        ])
                                };
                            }),
                        },
                        //被攻击点
                        {
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            zlevel: 2,
                            rippleEffect: {
                                period: 4,
                                brushType: 'stroke',
                                scale: 4
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'right',
                                    //offset:[5, 0],
                                    color: '#0f0',
                                    formatter: '{b}',
                                    textStyle: {
                                        color: "#0f0"
                                    }
                                },
                                emphasis: {
                                    show: true,
                                    color: "#f60"
                                }
                            },
                            symbol: 'pin',
                            symbolSize: 10,
                            data: [{
                                name: item[0],
                                value: obj.chinaGeoCoordMap[item[0]].concat([
                                    10
                                ]),
                            }],
                        }
                    );
                });


                option = {
                    grid:{
                        top:20
                    },
                    color: '#00eaff',
                    title: {
                        text: '',
                        x: 'left',
                        top: "10",
                        textStyle: {
                            color: '#000',
                            fontSize: 12
                        }
                    },
                    tooltip: {
                        show: true,
                        formatter: (params) => {
                            let data = "测试1:" + params.name + "<br/>" + "值:" + params.value[
                                    2] +
                                "<br/>" + "地理坐标:[" +
                                params.value[0] + "," + params.value[1] + "]";
                            return data;
                        },
                    },
                    geo: {
                        map: obj.type||'河北',
                        roam: true,
                        itemStyle: {
                            color: '#1d5e98',
                            opacity: 1,
                            borderWidth: 0.4,
                            borderColor: '#fff'
                        },
                        label: {
                            show: true,
                            textStyle: {
                                color: '#fff', //地图初始化区域字体颜色
                                fontSize: 10,
                                opacity: 1,
                                backgroundColor: 'rgba(0,23,11,0)'
                            },
                        },
                        emphasis: { //当鼠标放上去  地区区域是否显示名称
                            label: {
                                show: true,
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 14,
                                    backgroundColor: 'rgba(0,23,11,0)'
                                }
                            }
                        },
                        shading: 'lambert',
                        light: { //光照阴影
                            main: {
                                color: '#fff', //光照颜色
                                intensity: 1.2, //光照强度
                                shadowQuality: 'high', //阴影亮度
                                shadow: false, //是否显示阴影
                                alpha: 55,
                                beta: 10

                            },
                            ambient: {
                                intensity: 0.3
                            }
                        }
                    },
                    series: series
                }

                myEcharts.setOption(option, true);



            });


        }
        $.get('./data/hebeiCity.json', function (res) {
            var chinaGeoCoordMap = {}
            res.hebeiCity.forEach(v => {
                chinaGeoCoordMap[v.name] = v.value
            })
            var arr = [];
            chinaDatas.forEach(v => {
                var a = []
                a.push(v)
                arr.push(a)
            })
            hebeiMap({
                chinaDatas: arr,
                city: '张家口',
                isCome: true,
                chinaGeoCoordMap: chinaGeoCoordMap
            })
        })

        //点击事件,根据点击某个省份计算出这个省份的数据
        myEcharts.on('click', function (params) {

            //逻辑控制
            $.get('./data/hebeiCity.json', function (res) {
                var chinaGeoCoordMap = {}
                res.hebeiCity.forEach(v => {
                    chinaGeoCoordMap[v.name] = v.value
                })
                console.log(chinaGeoCoordMap);
                var arr = [];
                chinaDatas.forEach(v => {
                    var a = []
                    a.push(v)
                    arr.push(a)
                })
                hebeiMap({
                    chinaDatas: arr,
                    city: params.name,
                    isCome: true,
                    chinaGeoCoordMap: chinaGeoCoordMap
                })
            })

        });

        function come() {
            $.get('./data/hebeiCity.json', function (res) {
                var chinaGeoCoordMap = {}
                res.hebeiCity.forEach(v => {
                    chinaGeoCoordMap[v.name] = v.value
                })

                var arr = [];
                chinaDatas.forEach(v => {
                    var a = []
                    a.push(v)
                    arr.push(a)
                })
                hebeiMap({
                    chinaDatas: arr,
                    city: '张家口',
                    isCome: true,
                    chinaGeoCoordMap: chinaGeoCoordMap
                })
            })

        }

        function out() {
            $.get('./data/hebeiCity.json', function (res) {
                var chinaGeoCoordMap = {}
                res.hebeiCity.forEach(v => {
                    chinaGeoCoordMap[v.name] = v.value
                })
                var arr = [];
                chinaDatas.forEach(v => {
                    var a = []
                    a.push(v)
                    arr.push(a)
                })
                hebeiMap({
                    chinaDatas: arr,
                    city: '张家口',
                    isCome: false,
                    chinaGeoCoordMap: chinaGeoCoordMap
                })
            })
        }
        function chinaMap1(){
            $.get('./data/hebeiCity.json', function (res) {
                console.log(res.chinaGeoCoordMap);
                
                hebeiMap({
                    type:"china",
                    chinaDatas: chinaDatas2,
                    city: '黑龙江',
                    isCome: false,
                    chinaGeoCoordMap: res.chinaGeoCoordMap
                })
            })
        }