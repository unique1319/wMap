var GridLegendUtil = {
    parseColorAndValueArray: function (LegendObj) {
        var legend = {};
        legend.colorArray = [];
        legend.valueArray = [];

        for (var i = 0; i < LegendObj.length; i++) {
            legend.colorArray[i] = LegendObj[i].color;
            legend.valueArray[i] = LegendObj[i].min;
        }
        return legend;
    },

    initLegendHtml: function (legend) {
        var $legend = $('.index-map-tl .index-legend');
        $legend.empty();
        var colorArray = legend.colorArray;
        var valueArray = legend.valueArray;

        var colorLen = colorArray.length;

        for (var i = colorLen - 1; i >= 0; i--) {
            var val = (isNaN(valueArray[i]) ? '' : valueArray[i]);
            var $li = $("<li style='background: " + colorArray[i] + ";'><span>" + val + "</span></li>");
            if (i === 0) $li.css('border-bottom', '1px solid rgb(0, 0, 0)');
            $legend.append($li);
        }
    }
};


var GridLegend = {

    // Tip:每个要素下common是默认图例
    "rain": {
        "common": [
            {color: '#a5f38d', max: 10, min: 0.1, equalMin: true, equalMax: false},
            {color: '#3db93f', max: 25, min: 10, equalMin: true, equalMax: false},
            {color: '#63b8f9', max: 50, min: 25, equalMin: true, equalMax: false},
            {color: '#0000fe', max: 100, min: 50, equalMin: true, equalMax: false},
            {color: '#f305ee', max: 250, min: 100, equalMin: true, equalMax: false},
            {color: '#810040', max: NaN, min: 250, equalMin: true, equalMax: false}
        ],
        "1h": [{color: '#f9fcd7', max: 1.6, min: 0.1, equalMin: true, equalMax: false},
            {color: '#d1f9cd', max: 7, min: 1.6, equalMin: true, equalMax: false},
            {color: '#a7fac8', max: 15, min: 7, equalMin: true, equalMax: false},
            {color: '#6cf2e1', max: 40, min: 15, equalMin: true, equalMax: false},
            {color: '#12d7ef', max: 50, min: 40, equalMin: true, equalMax: false},
            {color: '#18a0e0', max: NaN, min: 50, equalMin: true, equalMax: false}],
        "3h": [{color: '#f9fcd7', max: 3, min: 0.1, equalMin: true, equalMax: false},
            {color: '#d1f9cd', max: 10, min: 3, equalMin: true, equalMax: false},
            {color: '#a7fac8', max: 20, min: 10, equalMin: true, equalMax: false},
            {color: '#6cf2e1', max: 50, min: 20, equalMin: true, equalMax: false},
            {color: '#12d7ef', max: 70, min: 50, equalMin: true, equalMax: false},
            {color: '#18a0e0', max: NaN, min: 70, equalMin: true, equalMax: false}],
        "6h": [{color: '#f9fcd7', max: 4, min: 0.1, equalMin: true, equalMax: false},
            {color: '#d1f9cd', max: 13, min: 4, equalMin: true, equalMax: false},
            {color: '#a7fac8', max: 25, min: 13, equalMin: true, equalMax: false},
            {color: '#6cf2e1', max: 60, min: 25, equalMin: true, equalMax: false},
            {color: '#12d7ef', max: 120, min: 60, equalMin: true, equalMax: false},
            {color: '#18a0e0', max: NaN, min: 120, equalMin: true, equalMax: false}],
        "12h": [{color: '#f9fcd7', max: 5, min: 0.1, equalMin: true, equalMax: false},
            {color: '#d1f9cd', max: 15, min: 5, equalMin: true, equalMax: false},
            {color: '#a7fac8', max: 30, min: 15, equalMin: true, equalMax: false},
            {color: '#6cf2e1', max: 70, min: 30, equalMin: true, equalMax: false},
            {color: '#12d7ef', max: 140, min: 70, equalMin: true, equalMax: false},
            {color: '#18a0e0', max: NaN, min: 140, equalMin: true, equalMax: false}],
        "24h": [{color: '#fafecd', max: 10, min: 0.1, equalMin: true, equalMax: false},
            {color: '#cefcd1', max: 25, min: 10, equalMin: true, equalMax: false},
            {color: '#95f8cd', max: 50, min: 25, equalMin: true, equalMax: false},
            {color: '#58eef3', max: 100, min: 50.0, equalMin: true, equalMax: false},
            {color: '#34c4f4', max: 250, min: 100, equalMin: true, equalMax: false},
            {color: '#0a86e5', max: NaN, min: 250, equalMin: true, equalMax: false}],
        "hubei1h": [{color: '#a5f38d', max: 1.6, min: 0.1, equalMin: true, equalMax: false},
            {color: '#3db93f', max: 7, min: 1.6, equalMin: true, equalMax: false},
            {color: '#63b8f9', max: 15, min: 7, equalMin: true, equalMax: false},
            {color: '#0000fe', max: 40, min: 15, equalMin: true, equalMax: false},
            {color: '#f305ee', max: 50, min: 40, equalMin: true, equalMax: false},
            {color: '#810040', max: NaN, min: 50, equalMin: true, equalMax: false}],
        "hubei3h": [{color: '#a5f38d', max: 3, min: 0.1, equalMin: true, equalMax: false},
            {color: '#3db93f', max: 10, min: 3, equalMin: true, equalMax: false},
            {color: '#63b8f9', max: 20, min: 10, equalMin: true, equalMax: false},
            {color: '#0000fe', max: 50, min: 20, equalMin: true, equalMax: false},
            {color: '#f305ee', max: 70, min: 50, equalMin: true, equalMax: false},
            {color: '#810040', max: NaN, min: 70, equalMin: true, equalMax: false}],
        "hubei6h": [{color: '#a5f38d', max: 4, min: 0.1, equalMin: true, equalMax: false},
            {color: '#3db93f', max: 13, min: 4, equalMin: true, equalMax: false},
            {color: '#63b8f9', max: 25, min: 13, equalMin: true, equalMax: false},
            {color: '#0000fe', max: 60, min: 25, equalMin: true, equalMax: false},
            {color: '#f305ee', max: 120, min: 60, equalMin: true, equalMax: false},
            {color: '#810040', max: NaN, min: 120, equalMin: true, equalMax: false}]
    },
    "temp": {
        "common": [{color: '#0808f7', max: -12, min: NaN, equalMin: true, equalMax: false},
            {color: '#0845ef', max: -8, min: -12, equalMin: true, equalMax: false},
            {color: '#0865ef', max: -6, min: -8, equalMin: true, equalMax: false},
            {color: '#0882f7', max: -4, min: -6, equalMin: true, equalMax: false},
            {color: '#08a2f7', max: -2, min: -4, equalMin: true, equalMax: false},
            {color: '#08beef', max: 0, min: -2, equalMin: true, equalMax: false},
            {color: '#08dbef', max: 2, min: 0, equalMin: true, equalMax: false},
            {color: '#18ffff', max: 4, min: 2, equalMin: true, equalMax: false},
            {color: '#18ffbd', max: 6, min: 4, equalMin: true, equalMax: false},
            {color: '#18ff84', max: 8, min: 6, equalMin: true, equalMax: false},
            {color: '#18ff42', max: 12, min: 8, equalMin: true, equalMax: false},
            {color: '#84ff18', max: 16, min: 12, equalMin: true, equalMax: false},
            {color: '#9cff18', max: 20, min: 16, equalMin: true, equalMax: false},
            {color: '#bdff18', max: 24, min: 20, equalMin: true, equalMax: false},
            {color: '#deff18', max: 26, min: 24, equalMin: true, equalMax: false},
            {color: '#ffe718', max: 28, min: 26, equalMin: true, equalMax: false},
            {color: '#ffcb18', max: 30, min: 28, equalMin: true, equalMax: false},
            {color: '#ffaa18', max: 32, min: 30, equalMin: true, equalMax: false},
            {color: '#ff8e18', max: 35, min: 32, equalMin: true, equalMax: false},
            {color: '#ff7118', max: 37, min: 35, equalMin: true, equalMax: false},
            {color: '#ff5118', max: 38, min: 37, equalMin: true, equalMax: false},
            {color: '#ff3c18', max: NaN, min: 38, equalMin: true, equalMax: false}],
        // "diff": [{color: '#002FFF', max: -12, min: NaN, equalMin: true, equalMax: false, desc: '<12'},
        //     {color: '#007DFD', max: -10, min: -12, equalMin: true, equalMax: false, desc: '-10~-12'},
        //     {color: '#0093FB', max: -8, min: -10, equalMin: true, equalMax: false, desc: '-8~-10'},
        //     {color: '#00AFF7', max: -6, min: -8, equalMin: true, equalMax: false, desc: '-6~-8'},
        //     {color: '#00C1F2', max: -4, min: -6, equalMin: true, equalMax: false, desc: '-4~-6'},
        //     {color: '#00EBD0', max: -2, min: -4, equalMin: true, equalMax: false, desc: '-2~-4'},
        //     {color: '#FFFFFF', max: 2, min: -2, equalMin: true, equalMax: false, desc: '2~-2'},
        //     {color: '#FFA8AA', max: 4, min: 2, equalMin: true, equalMax: false, desc: '2~4'},
        //     {color: '#FD7A82', max: 6, min: 4, equalMin: true, equalMax: false, desc: '6~4'},
        //     {color: '#FF4650', max: 8, min: 6, equalMin: true, equalMax: false, desc: '8~6'},
        //     {color: '#FA0026', max: 10, min: 8, equalMin: true, equalMax: false, desc: '8~10'},
        //     {color: '#E10023', max: 12, min: 10, equalMin: true, equalMax: false, desc: '10~12'},
        //     {color: '#A9001A', max: NaN, min: 12, equalMin: true, equalMax: false, desc: '>12'}],

        "diff": [{color: '#3d12be', max: -2, min: NaN, equalMin: true, equalMax: false, desc: '<-2'},
            {color: '#3489e9', max: -0.5, min: -2, equalMin: true, equalMax: false, desc: '-2~--0.5'},
            {color: '#69e5f3', max: 0, min: -0.5, equalMin: true, equalMax: false, desc: '-0.5~-0'},
            {color: '#69e5f3', max: 0.5, min: 0, equalMin: true, equalMax: false, desc: '0~0.5'},
            {color: '#3489e9', max: 2, min: 0.5, equalMin: true, equalMax: false, desc: '0.5~2'},
            {color: '#3d12be', max: NaN, min: 2, equalMin: true, equalMax: false, desc: '>2'}],
        "abs": [{color: '#f9fad6', max: 0.5, min: NaN, equalMin: true, equalMax: false, desc: '<0.5'},
            {color: '#69e5f3', max: 1, min: 0.5, equalMin: true, equalMax: false, desc: '0.5~1'},
            {color: '#53bef3', max: 1.5, min: 1, equalMin: true, equalMax: false, desc: '1~-1.5'},
            {color: '#3489e9', max: 2, min: 1.5, equalMin: true, equalMax: false, desc: '1.5~2'},
            {color: '#4160ec', max: 2.5, min: 2, equalMin: true, equalMax: false, desc: '2~2.5'},
            {color: '#5e34dd', max: 3, min: 2.5, equalMin: true, equalMax: false, desc: '2.5~3'},
            {color: '#3d12be', max: 3.5, min: 3, equalMin: true, equalMax: false, desc: '3~3.5'},
            {color: '#8b11b7', max: 4, min: 3.5, equalMin: true, equalMax: false, desc: '3.5~4'},
            {color: '#a70030', max: NaN, min: 4, equalMin: true, equalMax: false, desc: '>4'}]
    },
    "wind": {
        "common": [
            {color: '#59fe04', max: 3.4, min: 1.6, equalMin: true, equalMax: false},
            {color: '#d5fd00', max: 5.5, min: 3.4, equalMin: true, equalMax: false},
            {color: '#fffe00', max: 8, min: 5.5, equalMin: true, equalMax: false},
            {color: '#ffcf00', max: 10.8, min: 8, equalMin: true, equalMax: false},
            {color: '#ff8d00', max: 13.9, min: 10.8, equalMin: true, equalMax: false},
            {color: '#ff4e00', max: 17.2, min: 13.9, equalMin: true, equalMax: false},
            {color: '#ff0000', max: 20.8, min: 17.2, equalMin: true, equalMax: false},
            {color: '#c14d00', max: 24.5, min: 20.8, equalMin: true, equalMax: false},
            {color: '#7a0400', max: 28.5, min: 24.5, equalMin: true, equalMax: false},
            {color: '#5b1c00', max: NaN, min: 28.5, equalMin: true, equalMax: false}]
    },
    "weather": {
        "common": [
            {
                "color": "#a19987",
                value: 31,
                "max": 53,
                "min": 31,
                "equalMin": true,
                "equalMax": false,
                "desc": "强沙尘暴(31)"
            },
            {
                "color": "#eeeeee",
                value: 30,
                "max": 31,
                "min": 30,
                "equalMin": true,
                "equalMax": false,
                "desc": "扬沙或浮尘(30)"
            },
            {
                "color": "#eeeeee",
                value: 20,
                "max": 21,
                "min": 20,
                "equalMin": true,
                "equalMax": false,
                "desc": "沙尘暴(20)"
            },
            {
                "color": "#88aaff",
                value: 5,
                "max": 6,
                "min": 5,
                "equalMin": true,
                "equalMax": false,
                "desc": "雷阵雨并伴有冰雹(5)"
            },
            {"color": "#ffddbb", value: 4, "max": 5, "min": 4, "equalMin": true, "equalMax": false, "desc": "雷阵雨(4)"},
            {
                "color": "#ff8800",
                value: 19,
                "max": 20,
                "min": 19,
                "equalMin": true,
                "equalMax": false,
                "desc": "冻雨(19)"
            },
            {
                "color": "#444444",
                value: 17,
                "max": 18,
                "min": 17,
                "equalMin": true,
                "equalMax": false,
                "desc": "暴雪(17)"
            },
            {
                "color": "#777777",
                value: 16,
                "max": 17,
                "min": 16,
                "equalMin": true,
                "equalMax": false,
                "desc": "大雪(16)"
            },
            {
                "color": "#aaaaaa",
                value: 15,
                "max": 16,
                "min": 15,
                "equalMin": true,
                "equalMax": false,
                "desc": "中雪(15)"
            },
            {
                "color": "#cccccc",
                value: 14,
                "max": 15,
                "min": 14,
                "equalMin": true,
                "equalMax": false,
                "desc": "小雪(14)"
            },
            {"color": "#ffbbee", value: 6, "max": 7, "min": 6, "equalMin": true, "equalMax": false, "desc": "雨夹雪(6)"},
            {
                "color": "#880044",
                value: 12,
                "max": 13,
                "min": 12,
                "equalMin": true,
                "equalMax": false,
                "desc": "特大暴雨(12)"
            },
            {
                "color": "#ff00ff",
                value: 11,
                "max": 12,
                "min": 11,
                "equalMin": true,
                "equalMax": false,
                "desc": "大暴雨(11)"
            },
            {
                "color": "#0000ff",
                value: 10,
                "max": 11,
                "min": 10,
                "equalMin": true,
                "equalMax": false,
                "desc": "暴雨(10)"
            },
            {"color": "#66bbff", value: 9, "max": 10, "min": 9, "equalMin": true, "equalMax": false, "desc": "大雨(9)"},
            {"color": "#33bb33", value: 8, "max": 9, "min": 8, "equalMin": true, "equalMax": false, "desc": "中雨(8)"},
            {"color": "#aaff88", value: 7, "max": 8, "min": 7, "equalMin": true, "equalMax": false, "desc": "小雨(7)"},
            {
                "color": "#aa9988",
                value: 53,
                "max": NaN,
                "min": 53,
                "equalMin": true,
                "equalMax": false,
                "desc": "霾(53)"
            },
            {"color": "#aa7711", value: 18, "max": 19, "min": 18, "equalMin": true, "equalMax": false, "desc": "雾(18)"},
            {"color": "#eeeeee", value: 2, "max": 3, "min": 2, "equalMin": true, "equalMax": false, "desc": "阴(2)"},
            {"color": "#eeeeee", value: 1, "max": 2, "min": 1, "equalMin": true, "equalMax": false, "desc": "多云(1)"},
            {"color": "#eeeeee", value: 0, "max": 1, "min": 0, "equalMin": true, "equalMax": false, "desc": "晴(0)"}]
    },
    "pph": {
        "common": [
            {
                "color": "#eeeeee",
                value: -1,
                "max": 1,
                "min": -1,
                "equalMin": true,
                "equalMax": false,
                "desc": "无降水(-1)"
            },
            {"color": "#a6f28f", value: 1, "max": 2, "min": 1, "equalMin": true, "equalMax": false, "desc": "雨(1)"},
            {"color": "#ffbeef", value: 2, "max": 3, "min": 2, "equalMin": true, "equalMax": false, "desc": "混合(2)"},
            {"color": "#cecece", value: 3, "max": 4, "min": 3, "equalMin": true, "equalMax": false, "desc": "雪(3)"},
            {"color": "#ff8000", value: 4, "max": NaN, "min": 4, "equalMin": true, "equalMax": false, "desc": "冻雨(4)"}]
    },
    "vis": {
        "common": [{"color": "#722c00", "max": 0.1, "min": NaN, "equalMin": true, "equalMax": false},
            {"color": "#9f00ff", "max": 0.2, "min": 0.1, "equalMin": true, "equalMax": false},
            {"color": "#ff0203", "max": 0.5, "min": 0.2, "equalMin": true, "equalMax": false},
            {"color": "#ff5600", "max": 1, "min": 0.5, "equalMin": true, "equalMax": false},
            {"color": "#ffd300", "max": 2, "min": 1, "equalMin": true, "equalMax": false},
            {"color": "#efeb35", "max": 3, "min": 2, "equalMin": true, "equalMax": false},
            {"color": "#bdfb30", "max": 5, "min": 3, "equalMin": true, "equalMax": false},
            {"color": "#78fd37", "max": 10, "min": 5, "equalMin": true, "equalMax": false},
            {"color": "#34fbb1", "max": 15, "min": 10, "equalMin": true, "equalMax": false},
            {"color": "#6acbe7", "max": 20, "min": 15, "equalMin": true, "equalMax": false},
            {"color": "#9de9f7", "max": 30, "min": 20, "equalMin": true, "equalMax": false},
            {"color": "#ffffff", "max": NaN, "min": 30, "equalMin": true, "equalMax": false}]
    },
    "pressure": {
        "common": [{color: '#0020ff', max: 500, min: NaN, equalMin: true, equalMax: false},
            {color: '#00bfff', max: 600, min: 500, equalMin: true, equalMax: false},
            {color: '#00ffa0', max: 700, min: 600, equalMin: true, equalMax: false},
            {color: '#00ff01', max: 800, min: 700, equalMin: true, equalMax: false},
            {color: '#9eff00', max: 900, min: 800, equalMin: true, equalMax: false},
            {color: '#ffc100', max: 1000, min: 900, equalMin: true, equalMax: false},
            {color: '#ff2400', max: NaN, min: 1000, equalMin: true, equalMax: false}
        ]
    },
    "tcc": {
        "common": [
            {"color": "#0055ff", "max": 0, "min": NaN, "equalMin": true, "equalMax": false},
            {"color": "#00aeff", "max": 10, "min": 0, "equalMin": true, "equalMax": false},
            {"color": "#00a2ff", "max": 20, "min": 10, "equalMin": true, "equalMax": false},
            {"color": "#00ffad", "max": 30, "min": 20, "equalMin": true, "equalMax": false},
            {"color": "#00ff5a", "max": 40, "min": 30, "equalMin": true, "equalMax": false},
            {"color": "#00ff00", "max": 50, "min": 40, "equalMin": true, "equalMax": false},
            {"color": "#5aff00", "max": 60, "min": 50, "equalMin": true, "equalMax": false},
            {"color": "#b5ff00", "max": 70, "min": 60, "equalMin": true, "equalMax": false},
            {"color": "#ffff00", "max": 80, "min": 70, "equalMin": true, "equalMax": false},
            {"color": "#ffaa00", "max": 90, "min": 80, "equalMin": true, "equalMax": false},
            {"color": "#ff5500", "max": NaN, "min": 90, "equalMin": true, "equalMax": false}
        ]
    },
    "rh2m": {
        "common": [
            {"color": "#0055ff", "max": 0, "min": NaN, "equalMin": true, "equalMax": false},
            {"color": "#00aeff", "max": 10, "min": 0, "equalMin": true, "equalMax": false},
            {"color": "#00a2ff", "max": 20, "min": 10, "equalMin": true, "equalMax": false},
            {"color": "#00ffad", "max": 30, "min": 20, "equalMin": true, "equalMax": false},
            {"color": "#00ff5a", "max": 40, "min": 30, "equalMin": true, "equalMax": false},
            {"color": "#00ff00", "max": 50, "min": 40, "equalMin": true, "equalMax": false},
            {"color": "#5aff00", "max": 60, "min": 50, "equalMin": true, "equalMax": false},
            {"color": "#b5ff00", "max": 70, "min": 60, "equalMin": true, "equalMax": false},
            {"color": "#ffff00", "max": 80, "min": 70, "equalMin": true, "equalMax": false},
            {"color": "#ffaa00", "max": 90, "min": 80, "equalMin": true, "equalMax": false},
            {"color": "#ff5500", "max": NaN, "min": 90, "equalMin": true, "equalMax": false}
        ]
    },
    "fog": {
        "common": [
            {"color": "#eeeeee", value: -1, "max": 1, "min": -1, "equalMin": true, "equalMax": false, "desc": "无(-1)"},
            {"color": "#c2ffe5", value: 1, "max": 2, "min": 1, "equalMin": true, "equalMax": false, "desc": "轻雾(1)"},
            {"color": "#65ffff", value: 2, "max": 3, "min": 2, "equalMin": true, "equalMax": false, "desc": "大雾(2)"},
            {"color": "#00cccc", value: 3, "max": 4, "min": 3, "equalMin": true, "equalMax": false, "desc": "浓雾(3)"},
            {"color": "#009999", value: 4, "max": 5, "min": 4, "equalMin": true, "equalMax": false, "desc": "强浓雾(4)"},
            {
                "color": "#00544d",
                value: 5,
                "max": 9999,
                "min": 5,
                "equalMin": true,
                "equalMax": false,
                "desc": "特强浓雾(5)"
            }
        ]
    },
    "hz": {
        "common": [
            {"color": "#eeeeee", value: -1, "max": 1, "min": -1, "equalMin": true, "equalMax": false, "desc": "无(-1)"},
            {"color": "#dbca03", value: 1, "max": 2, "min": 1, "equalMin": true, "equalMax": false, "desc": "轻度霾(1)"},
            {"color": "#a87000", value: 2, "max": 3, "min": 2, "equalMin": true, "equalMax": false, "desc": "中度霾(2)"},
            {"color": "#7e0023", value: 3, "max": 4, "min": 3, "equalMin": true, "equalMax": false, "desc": "重度霾(3)"},
            {"color": "#320019", value: 4, "max": 9999, "min": 4, "equalMin": true, "equalMax": false, "desc": "严重霾(4)"}
        ]
    },
    "sand": {
        "common": [
            {"color": "#eeeeee", value: -1, "max": 1, "min": -1, "equalMin": true, "equalMax": false, "desc": "无(-1)"},
            {"color": "#ffd280", value: 1, "max": 2, "min": 1, "equalMin": true, "equalMax": false, "desc": "扬沙或浮尘(1)"},
            {"color": "#ff8c00", value: 2, "max": 3, "min": 2, "equalMin": true, "equalMax": false, "desc": "沙尘暴(2)"},
            {
                "color": "#a13300",
                value: 3,
                "max": 9999,
                "min": 3,
                "equalMin": true,
                "equalMax": false,
                "desc": "强沙尘暴(3)"
            }
        ]
    },
    "rat": {
        "common": [
            {"color": "#eeeeee", value: -1, "max": 1, "min": -1, "equalMin": true, "equalMax": false, "desc": "无(-1)"},
            {
                "color": "#00ff00",
                value: 63,
                "max": 9999,
                "min": 63,
                "equalMin": true,
                "equalMax": false,
                "desc": "强降水(63)"
            }
        ]
    },
    "ssm": {
        "common": [
            {"color": "#eeeeee", value: -1, "max": 1, "min": -1, "equalMin": true, "equalMax": false, "desc": "无(-1)"},
            {"color": "#ffd0a6", value: 4, "max": 9999, "min": 4, "equalMin": true, "equalMax": false, "desc": "雷暴(4)"}
        ]
    },
    "hail": {
        "common": [
            {"color": "#eeeeee", value: -1, "max": 1, "min": -1, "equalMin": true, "equalMax": false, "desc": "无(-1)"},
            {"color": "#6495ed", value: 5, "max": 9999, "min": 5, "equalMin": true, "equalMax": false, "desc": "冰雹(5)"}
        ]
    },
    "smg": {
        "common": [
            {"color": "#eeeeee", value: -1, "max": 1, "min": -1, "equalMin": true, "equalMax": false, "desc": "无(-1)"},
            {
                "color": "#ee8fb1",
                value: 61,
                "max": 9999,
                "min": 61,
                "equalMin": true,
                "equalMax": false,
                "desc": "雷暴大风(61)"
            }
        ]
    },
    "cape": {
        "common": [
            {"color": "#ffffff", "max": 100, "min": NaN, "equalMin": true, "equalMax": false},
            {"color": "#ffffd2", "max": 200, "min": 100, "equalMin": true, "equalMax": false},
            {"color": "#ffaa00", "max": 500, "min": 200, "equalMin": true, "equalMax": false},
            {"color": "#ff6e00", "max": 1000, "min": 500, "equalMin": true, "equalMax": false},
            {"color": "#ff0000", "max": 1500, "min": 1000, "equalMin": true, "equalMax": false},
            {"color": "#c80000", "max": 2000, "min": 1500, "equalMin": true, "equalMax": false},
            {"color": "#a02323", "max": 2500, "min": 2000, "equalMin": true, "equalMax": false},
            {"color": "#ff69b4", "max": 3000, "min": 2500, "equalMin": true, "equalMax": false}
        ]
    },
    "deg0l": {
        "common": [
            {"color": "#737573", "max": 100, "min": NaN, "equalMin": true, "equalMax": false},
            {"color": "#00e3ff", "max": 200, "min": 100, "equalMin": true, "equalMax": false},
            {"color": "#00b2ff", "max": 500, "min": 200, "equalMin": true, "equalMax": false},
            {"color": "#0092ce", "max": 1000, "min": 500, "equalMin": true, "equalMax": false},
            {"color": "#310094", "max": 1500, "min": 1000, "equalMin": true, "equalMax": false},
            {"color": "#00fb94", "max": 2000, "min": 1500, "equalMin": true, "equalMax": false},
            {"color": "#00ba00", "max": 2500, "min": 2000, "equalMin": true, "equalMax": false},
            {"color": "#00ef00", "max": 3000, "min": 2500, "equalMin": true, "equalMax": false},
            {"color": "#ffbe00", "max": 3500, "min": 3000, "equalMin": true, "equalMax": false},
            {"color": "#ffff00", "max": 4000, "min": 3500, "equalMin": true, "equalMax": false},
            {"color": "#ad0000", "max": 4500, "min": 4000, "equalMin": true, "equalMax": false},
            {"color": "#ff0000", "max": 5000, "min": 4500, "equalMin": true, "equalMax": false},
            {"color": "#ffffff", "max": NaN, "min": 5000, "equalMin": true, "equalMax": false}
        ]
    },
    "rati": {
        "common": [
            {"color": "#f5fdfe", "max": 50, "min": 0, "equalMin": true, "equalMax": false},
            {"color": "#c80e2", "max": 55, "min": 50, "equalMin": true, "equalMax": false},
            {"color": "#1d5724", "max": 60, "min": 55, "equalMin": true, "equalMax": false},
            {"color": "#f1ec17", "max": 65, "min": 60, "equalMin": true, "equalMax": false},
            {"color": "#ed9f26", "max": 75, "min": 65, "equalMin": true, "equalMax": false},
            {"color": "#dc240d", "max": 80, "min": 75, "equalMin": true, "equalMax": false},
            {"color": "#bc1874", "max": 85, "min": 80, "equalMin": true, "equalMax": false},
            {"color": "#4b120b", "max": 100, "min": 85, "equalMin": true, "equalMax": false}
        ]
    },
    "ratirain": {
        "common": [
            {"color": "#ffffff", "max": 20, "min": 0, "equalMin": true, "equalMax": false},
            {"color": "#fff5a5", "max": 40, "min": 20, "equalMin": true, "equalMax": false},
            {"color": "#ffcb58", "max": 60, "min": 40, "equalMin": true, "equalMax": false},
            {"color": "#ff8f1c", "max": 80, "min": 60, "equalMin": true, "equalMax": false},
            {"color": "#ff5200", "max": 90, "min": 80, "equalMin": true, "equalMax": false},
            {"color": "#ea1800", "max": 100, "min": 90, "equalMin": true, "equalMax": false}
        ]
    },
    "eairp": {
        "common": [
            {color: '#ffffff', value: -1, max: 61, min: -1, equalMin: true, equalMax: false, desc: '无(-1)'},
            {color: '#00ff00', value: 61, max: 62, min: 61, equalMin: true, equalMax: false, desc: '一级(61)'},
            {color: '#96e600', value: 62, max: 63, min: 62, equalMin: true, equalMax: false, desc: '二级(62)'},
            {color: '#ffff00', value: 63, max: 64, min: 63, equalMin: true, equalMax: false, desc: '三级(63)'},
            {color: '#ff6400', value: 64, max: 65, min: 64, equalMin: true, equalMax: false, desc: '四级(64)'},
            {color: '#ff0000', value: 65, max: 66, min: 65, equalMin: true, equalMax: false, desc: '五级(65)'},
            {color: '#7e0023', value: 66, max: 157, min: 66, equalMin: true, equalMax: false, desc: '六级(66)'}]
    },

    "aqi": {
        "common": [
            {color: '#00e500', max: 50, min: 0, equalMin: true, equalMax: true, desc: '一级(0)'},
            {color: '#ffff00', max: 100, min: 50, equalMin: false, equalMax: true, desc: '二级(50)'},
            {color: '#ff7e00', max: 150, min: 100, equalMin: false, equalMax: true, desc: '三级(100)'},
            {color: '#ff0000', max: 200, min: 150, equalMin: false, equalMax: true, desc: '四级(150)'},
            {color: '#99004c', max: 300, min: 200, equalMin: false, equalMax: true, desc: '五级(200)'},
            {color: '#7e0022', max: NaN, min: 300, equalMin: false, equalMax: false, desc: '六级(300)'}]
    },
    "faqi": {
        "common": [
            {"color": "#3db93f", value: 0, "max": 1, "min": 0, "equalMin": true, "equalMax": false, "desc": "无(0)"},
            {"color": "#fffd05", value: 1, "max": 1, "min": 1, "equalMin": true, "equalMax": false, "desc": "pm2.5(1)"},
            {"color": "#63b8f9", value: 2, "max": 1, "min": 2, "equalMin": true, "equalMax": false, "desc": "pm10(2)"},
            {"color": "#0000fe", value: 3, "max": 1, "min": 3, "equalMin": true, "equalMax": false, "desc": "so2(3)"},
            {"color": "#f305ee", value: 4, "max": 1, "min": 4, "equalMin": true, "equalMax": false, "desc": "no2(4)"},
            {"color": "#ff0000", value: 5, "max": 1, "min": 5, "equalMin": true, "equalMax": false, "desc": "co(5)"},
            {"color": "#810040", value: 6, "max": 1, "min": 6, "equalMin": true, "equalMax": false, "desc": "o3(6)"}
        ]
    },
    o3: {
        "common": [
            {"color": '#02e209', max: 20, min: NaN, equalMin: false, equalMax: true},
            {"color": '#48fc16', max: 60, min: 20, equalMin: false, equalMax: true},
            {"color": '#70fd17', max: 80, min: 60, equalMin: false, equalMax: true},
            {"color": '#c6fe26', max: 160, min: 80, equalMin: false, equalMax: true},
            {"color": '#f6f9b9', max: 180, min: 160, equalMin: false, equalMax: true},
            {"color": '#fefd85', max: 200, min: 180, equalMin: false, equalMax: true},
            {"color": '#eab980', max: 250, min: 200, equalMin: false, equalMax: true},
            {"color": '#ff8a14', max: 300, min: 250, equalMin: false, equalMax: true},
            {"color": '#e0372b', max: 350, min: 300, equalMin: false, equalMax: true},
            {"color": '#eb0300', max: 400, min: 350, equalMin: false, equalMax: true},
            {"color": '#d70069', max: 600, min: 400, equalMin: false, equalMax: true},
            {"color": '#91014c', max: 800, min: 600, equalMin: false, equalMax: true},
            {"color": '#730927', max: 900, min: 800, equalMin: false, equalMax: true},
            {"color": '#5c051c', max: NaN, min: 900, equalMin: false, equalMax: true}]
    }

};