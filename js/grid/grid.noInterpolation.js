var NoInterpolation = function (map, GridData) {
    this._map = map;
    this._GridData = GridData;
    this._offsetX = 0;  // 整体横向偏移
    this._offsetY = 0;  // 整体纵向偏移
    this._fontColor = "blue";
};

NoInterpolation.prototype = {

    onDrawLayer: function (info) {

        var data = {
            lats: this._GridData.lats,
            lons: this._GridData.lons,
            verticalNums: this._GridData.GridInfo.VerticalNums,
            horizontalNums: this._GridData.GridInfo.HorizontalNums,
            gridData: this._GridData.data,
            longitudeSpace: this._GridData.GridInfo.LongitudeSpace,
            latitudeSpace: this._GridData.GridInfo.LatitudeSpace
        };

        var ctx = info.canvas.getContext('2d');
        ctx.font = "12px arial";
        ctx.fillStyle = this._fontColor;
        ctx.clearRect(0, 0, info.canvas.width, info.canvas.height);

        for (var i = 0; i < data.verticalNums; i++) {
            var lat = data.lats[i];
            for (var j = 0; j < data.horizontalNums; j++) {
                var lon = data.lons[j];
                if (info.bounds.contains([lat, lon])) {
                    var px = map.latLngToContainerPoint({lat: lat, lng: lon});
                    var x = px.x, y = px.y;
                    var text = data.gridData[i][j];
                    var textWidth = ctx.measureText(text).width;
                    ctx.fillText(text, x - textWidth / 2 + this._offsetX, y + textWidth / 4 + this._offsetY);
                }
            }
        }

    }
};