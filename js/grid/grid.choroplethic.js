var Choroplethic = function (map, GridData, colorArray, colorValArray) {
    this.mediaZoom = 1;
    this._map = map;
    this._GridData = GridData;
    this._colorValArray = colorValArray;
    this._colorArray = colorArray;
};

Choroplethic.prototype = {

    onDrawLayer: function (info) {
        this.drawingOnCanvas(info);
    },

    drawingOnCanvas: function (params) {

        var data = {
            lats: this._GridData.lats,
            lons: this._GridData.lons,
            verticalNums: this._GridData.GridInfo.VerticalNums,
            horizontalNums: this._GridData.GridInfo.HorizontalNums,
            gridData: this._GridData.data,
            longitudeSpace: this._GridData.GridInfo.LongitudeSpace,
            latitudeSpace: this._GridData.GridInfo.LatitudeSpace
        };

        var ctx = params.canvas.getContext('2d');
        ctx.clearRect(0, 0, params.canvas.width, params.canvas.height);

        var mapZoom = map.getZoom();

        if (mapZoom >= this.mediaZoom) {
            /*情况1：当页面浏览器不卡的时候，默认用原始经度初始化*/
            for (var i = 0; i < data.verticalNums; i++) {
                var lat = data.lats[i];
                var lat1 = lat + data.latitudeSpace;
                for (var j = 0; j < data.horizontalNums; j++) {
                    var lon = data.lons[j];
                    var lon1 = lon + data.longitudeSpace;
                    if (params.bounds.contains([lat, lon])) {
                        var px = map.latLngToContainerPoint({lat: lat, lng: lon});
                        var px1 = map.latLngToContainerPoint({lat: lat1, lng: lon1});
                        var color = this.fillColor(data.gridData[i][j]);
                        this.drawUnit(ctx, px.x, px.y, px1.x - px.x, px1.y - px.y, color);
                    }
                }
            }
        } else {
            /*情况2：当页面浏览器卡的时候，将原始分辨率降低 1 倍，找四个格子中的最大值，*/
            for (var i = 0; i < data.verticalNums - 1; i = i + 2) {
                var lat = data.lats[i];
                var lat1 = data.lats[i + 2];
                for (var j = 0; j < data.horizontalNums - 1; j = j + 2) {
                    var lon = data.lons[j];
                    var lon1 = data.lons[j + 2];

                    var value = 0;
                    for (var m = 0; m < 2; m++) {
                        for (var n = 0; n < 2; n++) {
                            if (Math.abs(data.gridData[i + m][j + n]) > Math.abs(value)) {
                                value = data.gridData[i + m][j + n]
                            }
                        }
                    }

                    if (params.bounds.contains([lat, lon])) {
                        var px = map.latLngToContainerPoint({lat: lat, lng: lon});
                        var px1 = map.latLngToContainerPoint({lat: lat1, lng: lon1});
                        var color = this.fillColor(value);
                        this.drawUnit(ctx, px.x, px.y, px1.x - px.x, px1.y - px.y, color);
                    }
                }
            }
        }
    },

    fillColor: function (val) {
        var color = null,
            colorValArray = this._colorValArray,
            colorArray = this._colorArray;

        /*当颜色值和色卡值相同时，不填色；（针对降雨的情况）*/
        if (colorArray.length === colorValArray.length) {
            colorArray.unshift("rgba(0,0,0,0)")
        }

        for (var i = 0; i < colorValArray.length; i++) {
            if (val < colorValArray[i]) {
                color = colorArray[i];
                break;
            }
        }

        if (color === null && val >= colorValArray[colorValArray.length - 1]) {
            color = colorArray[colorArray.length - 1];
        }
        return color;
    },

    drawUnit: function (ctx, x, y, h, w, color) {
        ctx.beginPath();
        ctx.rect(x - w / 2, y - h / 2, w + 2, 1.2 * h + 2); // 宽高各 +2 是为了影藏掉矩形边框
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }

};