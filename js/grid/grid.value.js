var GridValueCanvas = function (map, GridData) {
    this._scale_lon = 50;
    this._scale_lat = 30;
    this._map = map;
    this._GridData = GridData;
};

GridValueCanvas.prototype = {

    onDrawLayer: function (info) {

        var containerWidth = Number($(this._map._container).css('width').split('px')[0]);          //  地图容器的宽度
        var containerHeight = Number($(this._map._container).css('height').split('px')[0]);        //  地图容器的高度

        var leftTopLatlon = this._map.getBounds().getNorthWest(),
            rightBottomLatlon = this._map.getBounds().getSouthEast();

        var lonStart = leftTopLatlon.lng,
            lonEnd = rightBottomLatlon.lng,
            latStart = leftTopLatlon.lat,
            latEnd = rightBottomLatlon.lat;

        var lonRes = containerWidth / (lonEnd - lonStart),
            latRes = containerHeight / (latEnd - latStart);

        var lonSpace = Math.round(this._scale_lon / lonRes * 100) / 100;
        var latSpace = Math.round(this._scale_lat / latRes * 100) / 100;

        if (info.layer.oldZoom !== map.getZoom() || info.layer.data === undefined) {
            info.layer.data = this._GridData.dilutingData(lonSpace, latSpace);
            info.layer.oldZoom = map.getZoom();
        }
        var data = info.layer.data;

        var _canvasPx1 = map.latLngToContainerPoint({lat: data.latStart, lng: data.lonStart});
        var _canvasPx2 = map.latLngToContainerPoint({lat: data.latEnd, lng: data.lonEnd});
        var xSpace = Math.abs((_canvasPx1.x - _canvasPx2.x) / (data.horizontalNums - 1));
        var ySpace = Math.abs((_canvasPx1.y - _canvasPx2.y) / (data.verticalNums - 1));

        var ctx = info.canvas.getContext('2d');
        ctx.font = "12px arial";
        ctx.clearRect(0, 0, info.canvas.width, info.canvas.height);

        for (var i = 0; i < data.verticalNums; i++) {
            var lat = data.lats[i];
            for (var j = 0; j < data.horizontalNums; j++) {
                var lon = data.lons[j];
                if (info.bounds.contains([lat, lon])) {
                    var text = data.gridData[i][j];
                    if (text == '-0') {
                        text = '0';
                    }
                    var textWidth = ctx.measureText(text).width;

                    ctx.fillText(text, _canvasPx1.x + xSpace * j - textWidth / 2, _canvasPx1.y + ySpace * i + textWidth / 4);
                }
            }
        }

    }

};