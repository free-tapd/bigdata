(function () {
    hospitalDesc()
})()
function hospitalDesc() {
    var html=""
    for(var i=0;i<100;i++){
        html+='  <li class="hospital-item">' +
            '                                <i>'+i+'</i>'+
            '                                <p>河北医科大学第一医院</p>' +
            '                                <em> 79</em>' +
            '                            </li>'
    }

    $('.hospital-item-box').html(html)
}
function peopleDesc() {
    var html=""
    for(var i=0;i<100;i++){
        html+='  <li class="hospital-item">' +
            '                                <i>'+i+'</i>'+
            '                                <p>张若飞</p>' +
            '                                <em> 79</em>' +
            '                            </li>'
    }

    $('.hospital-item-box').html(html)
}
function init(){

}
$('.other-tab').on('click','li',function () {
    console.log(this)
    $(this).addClass('tab-active').siblings('li').removeClass('tab-active');
    if($(this).index()==0){
        $('#main').show()
        $('.detail-category').hide()
    }else{
        $('#main').hide();
        $('.detail-category').show()
    }

})

//医院排名
$('.switch-box').on('click','li',function () {
    $(this).addClass('active-selected').siblings('li').removeClass('active-selected');
    var index=$(this).index();
    $('.hospital-title-box').eq(index).show().siblings('.hospital-title-box').hide()
    if(index){
        //人员
        peopleDesc()
    }else{
        hospitalDesc()
    }


})

$(function () {
    jQuery(".hospital-box").slide({ mainCell:".bd ul",autoPage:true,effect:"topLoop",autoPlay:true,vis:
        12,pnLoop:false,interTime:3000});
  
})




/* 地图展示*/
var myChartmap = echarts.init(document.getElementById('bar3'));

var chinaGeoCoordMap = {
    '黑龙江': [127.9688, 45.368],
    '内蒙古': [110.3467, 41.4899],
    "吉林": [125.8154, 44.2584],
    '北京市': [116.4551, 40.2539],
    "辽宁": [123.1238, 42.1216],
    "河北": [114.4995, 38.1006],
    "天津": [117.4219, 39.4189],
    "山西": [112.3352, 37.9413],
    "陕西": [109.1162, 34.2004],
    "甘肃": [103.5901, 36.3043],
    "宁夏": [106.3586, 38.1775],
    "青海": [101.4038, 36.8207],
    "新疆": [87.9236, 43.5883],
    "西藏": [91.11, 29.97],
    "四川": [103.9526, 30.7617],
    "重庆": [108.384366, 30.439702],
    "山东": [117.1582, 36.8701],
    "河南": [113.4668, 34.6234],
    "江苏": [118.8062, 31.9208],
    "安徽": [117.29, 32.0581],
    "湖北": [114.3896, 30.6628],
    "浙江": [119.5313, 29.8773],
    "福建": [119.4543, 25.9222],
    "江西": [116.0046, 28.6633],
    "湖南": [113.0823, 28.2568],
    "贵州": [106.6992, 26.7682],
    "云南": [102.9199, 25.4663],
    "广东": [113.12244, 23.009505],
    "广西": [108.479, 23.1152],
    "海南": [110.3893, 19.8516],
    '上海': [121.4648, 31.2891]
};
var chinaDatas = [
    [{
        name: '黑龙江',
        value: 0
    }],	[{
        name: '内蒙古',
        value: 0
    }],	[{
        name: '吉林',
        value: 0
    }],	[{
        name: '辽宁',
        value: 0
    }],
    // 	[{
    //     name: '河北',
    //     value: 0
    // }],
    	[{
        name: '天津',
        value: 0
    }],	[{
        name: '山西',
        value: 0
    }],	[{
        name: '陕西',
        value: 0
    }],	[{
        name: '甘肃',
        value: 0
    }],	[{
        name: '宁夏',
        value: 0
    }],	[{
        name: '青海',
        value: 0
    }],	[{
        name: '新疆',
        value: 0
    }],[{
        name: '西藏',
        value: 0
    }],	[{
        name: '四川',
        value: 0
    }],	[{
        name: '重庆',
        value: 0
    }],	[{
        name: '山东',
        value: 0
    }],	[{
        name: '河南',
        value: 0
    }],	[{
        name: '江苏',
        value: 0
    }],	[{
        name: '安徽',
        value: 0
    }],	[{
        name: '湖北',
        value: 0
    }],	[{
        name: '浙江',
        value: 0
    }],	[{
        name: '福建',
        value: 0
    }],	[{
        name: '江西',
        value: 0
    }],	[{
        name: '湖南',
        value: 0
    }],	[{
        name: '贵州',
        value: 0
    }],
    [{
        name:"云南",
        value:0
    }],[{
        name:"广东",
        value:0
    }],[{
        name: '广西',
        value: 0
    }],	[{
        name: '海南',
        value: 0
    }],	[{
        name: '上海',
        value: 0
    }]
];

var convertData = function(data) {
    var res = [];
    for(var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var toCoord = chinaGeoCoordMap[dataItem[0].name];
        var fromCoord = [114.507605,38.045729];
        if(fromCoord && toCoord) {
            res.push([{
                coord: fromCoord,
               
            }, {
                coord: toCoord, 
                value: dataItem[0].value
            }]);
        }
    }
    return res;
};
var series = [];
[['河北', chinaDatas]].forEach(function(item, i) {
    console.log(item)
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
                    curveness: .3 //尾迹线条曲直度
                }
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
                    show: true,
                    position: 'right', //显示位置
                    offset: [5, 0], //偏移设置
                    formatter: function(params){//圆环显示文字
                        // console.log(params);
                        return params.data.name;
                    },
                    fontSize: 13
                },
                emphasis: {
                    show: true
                }
            },
            symbol: 'circle',
            symbolSize: function(val) {
                return 5+ val[2] * 5; //圆环大小
            },
            itemStyle: {
                normal: {
                    show: false,
                    color: '#f00'
                }
            },
            data: item[1].map(function(dataItem) {
                return {
                    name: dataItem[0].name,
                    value: chinaGeoCoordMap[dataItem[0].name].concat([dataItem[0].value])
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
            symbolSize: 50,
            data: [{
                name: item[0],
                value: chinaGeoCoordMap[item[0]].concat([10]),
            }],
        }
    );
});

option = {
    tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(166, 200, 76, 0.82)',
        borderColor: '#FFFFCC',
        showDelay: 0,
        hideDelay: 0,
        enterable: true,
        transitionDuration: 0,
        extraCssText: 'z-index:100',
        formatter: function(params, ticket, callback) {
            //根据业务自己拓展要显示的内容
            console.log(params);
            
            var res = "";
            var name = params.name;
            var value = params.value//[params.seriesIndex + 1];
            res = "<span style='color:#fff;'>" + name + "</span><br/>数据：" + value;
            console.log(res)
            return res;
        }
    },
    backgroundColor:'transparent',//"#013954",
    visualMap: { //图例值控制
        min: 0,
        max: 1,
        calculable: true,
        show: true,
        color: ['#f44336', '#fc9700', '#ffde00', '#ffde00', '#00eaff'],
        textStyle: {
            color: '#fff'
        }
    },
    geo: {
        map: 'china',
        
        zoom: 1.2,
        label: {
            emphasis: {
                show: false
            }
        },
        roam: true, //是否允许缩放
        itemStyle: {
            normal: {
                color: 'rgba(51, 69, 89, .5)', //地图背景色
                borderColor: '#516a89', //省市边界线00fcff 516a89
                borderWidth: 1
            },
            emphasis: {
                color: 'rgba(37, 43, 61, .5)' //悬浮背景
            }
        }
    },
    series: series
};

myChartmap.setOption(option)


function hebeiMap(){

    var myChartMain = echarts.init(document.getElementById('main'));
    var city = [{
            "name": "石家庄",
            "value": [114.48, 38.31]
        },
        {
            "name": "保定",
            "value": [115.48, 39.17]
        },
        {
            "name": "张家口",
            "value": [114.88, 41.12]
        },
        {
            "name": "承德",
            "value": [117.88, 41.32]
        },
        {
            "name": "秦皇岛",
            "value": [119.38, 40.22]
        },
        {
            "name": "唐山",
            "value": [118.28, 39.92]
        },
        {
            "name": "廊坊",
            "value": [116.58, 39.22]
        },
        {
            "name": "沧州",
            "value": [116.28, 38.32]
        },
        {
            "name": "邯郸",
            "value": [114.78, 36.37]
        },
        {
            "name": "衡水",
            "value": [115.68, 37.98]
        },
        {
            "name": "邢台",
            "value": [114.88, 37.32]
        }
    ]
   
    var min=0,max=300;
    var option = {
        tooltip:{
            formatter:function(params){
                var content='',
                content=params.name+params.value[0]+params.value[1];
                return content;
            },
        },
        backgroundColor:'#fff',
        visualMap: {
            show: false,
            min: min,
            max: max,
            inRange: {
                color: ['#e0ffff', '#006edd']
            },
            calculable:true

        },
        geo3D:{
            show:true,
            map:"河北",
            environment: '#000',
            // 配置为垂直渐变的背景
            environment: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0, color: '#00aaff' // 天空颜色
            }, {
            offset: 0.7, color: '#998866' // 地面颜色
            }, {
            offset: 1, color: '#998866' // 地面颜色
            }], false),
            groundPlane :{
                show:true,
                // color:"#f00"
            },
            label:{
                show:true,
                formatter: '{b}: {c}',
                textStyle:{
                    color:"#fff",
                    borderWidth:1
                }
            },
            itemStyle :{
                color:"#92F7FF",
                opacity:1,
                borderWidth:1,
                borderColor:"#000"
            },
            emphasis:{
                label:{
                    formatter: '{b}: {c}'
                }
                
            },
            regions:[{
                
            }]

        },
        series: {
            name:'河北',
            type: 'map',
            map: '河北',
            data:city,


            regionHeight: 2,
            boxWidth:70,
            //boxHeight:50,
            boxDepth:50,
            top:'-10%',
           //left:'10%',


           label: {
                show:true,
                formatter:function(params){
                    var content='',
                    content=params.name;
                    return content;
                },
                textStyle:{
                    color:'#EECBAD',
                    fontWeight : 'normal',
                    fontSize : 5,
                    backgroundColor: 'rgba(0,23,11,0)'
                },


                emphasis: {//对应的鼠标悬浮效果
                    show: true,
                    textStyle:{color:"#f00"}
                } 
            },
            itemStyle: {

                    normal: {

                        borderWidth: 0.4
                    }, //阴影效果
                    emphasis: {
                        color: 'rgb(255,255,255)'
                    }
            },

            viewControl: {
                    autoRotate: false,
                    distance: 70
            }


            }
        }
        
        
myChartMain.setOption(option);



}


function hebeiMap() {

    $.get('./js/hebei.geoJson', function (chinaJson) {
        console.log(chinaJson);
        console.log(echarts);

        echarts.registerMap('河北', chinaJson);
        var chart = echarts.init(document.getElementById('hebeiMap'));
        var geoCoordMap = [{
                "name": "石家庄",
                "value": [114.48, 38.31]
            },
            {
                "name": "保定",
                "value": [115.48, 39.17]
            },
            {
                "name": "张家口",
                "value": [114.88, 41.12]
            },
            {
                "name": "承德",
                "value": [117.88, 41.32]
            },
            {
                "name": "秦皇岛",
                "value": [119.38, 40.22]
            },
            {
                "name": "唐山",
                "value": [118.28, 39.92]
            },
            {
                "name": "廊坊",
                "value": [116.58, 39.22]
            },
            {
                "name": "沧州",
                "value": [116.28, 38.32]
            },
            {
                "name": "邯郸",
                "value": [114.78, 36.37]
            },
            {
                "name": "衡水",
                "value": [115.68, 37.98]
            },
            {
                "name": "邢台",
                "value": [114.88, 37.32]
            },{
                "name":"雄安新区",
                "value":[116.048396,39.002416]
            },{
                "name":"辛集",
                "value":[115.227615,37.888844]
            },{
                "name":"定州",
                "value":[115.227615,37.888844]
            }
        ]
        var data = [{
                name: "石家庄",
                data: 200
            },
            {
                name: "邯郸",
                data: 100
            },
            {
                name: "张家口",
                data: 50
            },
            {
                name: "沧州",
                data: 20
            },
            {
                name: "唐山",
                data: 200
            }, {
                name: "雄安新区",
                data: 500
            }
        ]
        var convertData = function (data) {
            var res = [];
            var geoCoord;
            for (var i = 0; i < data.length; i++) {
                geoCoordMap.forEach(v => {
                    if (v.name == [data[i].name]) {
                        geoCoord = v.value
                    }
                })
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].data)
                    });
                }
            }
            console.log(res)
            return res;
        };
        console.log(convertData(data));



        option = {
            title: {
                text: '',
                x: 'left',
                top: "10",
                textStyle: {
                    color: '#000',
                    fontSize: 14
                }
            },
            tooltip: {
                show: true,
                formatter: (params) => {
                    let data = "测试1:" + params.name + "<br/>" + "值:" + params.value[2] +
                        "<br/>" + "地理坐标:[" +
                        params.value[0] + "," + params.value[1] + "]";
                    return data;
                },
            },
            geo3D: {
                map: '河北',
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
                        fontSize: 14,
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
            series: [{
                    grid3DIndex: 1,
                    globeIndex: 1,
                    bevelSize: 1,
                    bevelSmoothness: 2,
                    name: 'bar3D',
                    type: "bar3D",
                    coordinateSystem: 'geo3D',
                    barSize: 1, //柱子粗细
                    shading: 'lambert',
                    opacity: 1,
                    bevelSize: 0.3,
                    animation: true,
                    label: {
                        show: true,
                        formatter: function (params) {
                            console.log(params);
                            return params.data.name + ":" + params.data.value[2]
                        }
                    },
                    data: convertData(data)

                }

            ]
        }
        echarts.init(document.getElementById('hebeiMap')).setOption(option);
    });
}

hebeiMap()