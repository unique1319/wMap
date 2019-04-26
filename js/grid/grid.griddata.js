var GridData = function (gridArray) {

    this.GridInfo = {
        /*格点场起始经度*/
        LongitudeStart: 107.5,
        /*格点场截止经度*/
        LongitudeEnd: 117.5,
        /*格点场起始纬度*/
        LatitudeStart: 37.0,
        /*格点场截止纬度*/
        LatitudeEnd: 24.5,
        /*经向分辨率*/
        LongitudeSpace: 0.05,
        /*纬向分辨率*/
        LatitudeSpace: -0.05,
        /*水平方向格点数*/
        HorizontalNums: 201,
        /*垂直方向格点数*/
        VerticalNums: 251
    };

    this.lats = [];
    this.lons = [];

    for (var i = 0; i < this.GridInfo.VerticalNums; i++) {
        this.lats[i] = this.GridInfo.LatitudeStart + i * this.GridInfo.LatitudeSpace;
    }

    for (var j = 0; j < this.GridInfo.HorizontalNums; j++) {
        this.lons[j] = this.GridInfo.LongitudeStart + j * this.GridInfo.LongitudeSpace;
    }

    this.data = gridArray;
    this.invalidValue = -999;

};

GridData.prototype = {

    dilutingData: function (new_grid_lonSpace, new_grid_latSpace) {

        var gridData = this.data;

        var lats = this.lats,
            lons = this.lons,
            latStart = this.GridInfo.LatitudeStart,
            latEnd = this.GridInfo.LatitudeEnd,
            lonStart = this.GridInfo.LongitudeStart,
            lonEnd = this.GridInfo.LongitudeEnd,
            latSpace = this.GridInfo.LatitudeSpace,
            lonSpace = this.GridInfo.LongitudeSpace;

        if ((lonSpace - new_grid_lonSpace  ) > 0 && (latSpace - new_grid_latSpace  ) < 0) {
            return {
                lats: this.lats,
                lons: this.lons,
                latStart: latStart,
                latEnd: latEnd,
                lonStart: lonStart,
                lonEnd: lonEnd,
                verticalNums: this.GridInfo.VerticalNums,
                horizontalNums: this.GridInfo.HorizontalNums,
                gridData: this.data
            };
        }

        /*1.构建抽稀后数组容器*/
        var new_grid_horizontalNums = Math.floor((lonEnd - lonStart) / new_grid_lonSpace) + 1,
            new_grid_verticalNums = Math.floor((latEnd - latStart) / new_grid_latSpace) + 1;

        var new_grid = {};
        new_grid.lats = [new_grid_verticalNums];
        new_grid.lons = [new_grid_horizontalNums];
        new_grid.latStart = latStart;
        new_grid.latEnd = latEnd;
        new_grid.lonStart = lonStart;
        new_grid.lonEnd = lonEnd;
        new_grid.verticalNums = new_grid_verticalNums;
        new_grid.horizontalNums = new_grid_horizontalNums;
        new_grid.gridData = [new_grid_verticalNums];

        /*2.空间插值*/
        for (var i = 0; i < new_grid_verticalNums; i++) {
            var _latValue = latStart + i * new_grid_latSpace;
            new_grid.lats[i] = _latValue;
            new_grid.gridData[i] = [new_grid_horizontalNums];
            for (var j = 0; j < new_grid_horizontalNums; j++) {
                var _lonValue = lonStart + j * new_grid_lonSpace;
                new_grid.lons[j] = _lonValue;

                /*2-1.确定 该点 左上角 格点索引，值，以及经纬度 */
                var latPositionIndex1 = Math.floor((_latValue - latStart) / latSpace);
                var lonPositionIndex1 = Math.floor((_lonValue - lonStart) / lonSpace);
                /*处理在缩放过程中，因积算误差导致数组越界情况，将最后的值往前移动一位*/
                // if (latPositionIndex1 + 1 >= lats.length) latPositionIndex1 = lats.length - 2;
                // if (lonPositionIndex1 + 1 >= lons.length) lonPositionIndex1 = lons.length - 2;
                var lat1 = lats[latPositionIndex1];
                var lon1 = lons[lonPositionIndex1];
                var val1 = gridData[latPositionIndex1][lonPositionIndex1];
                /*2-2.确定 该点 右上角 格点索引，值，以及经纬度 */
                var latPositionIndex2 = latPositionIndex1;
                var lonPositionIndex2 = lonPositionIndex1 + 1;
                var lat2 = lats[latPositionIndex2];
                var lon2 = lons[lonPositionIndex2];
                var val2 = gridData[latPositionIndex2][lonPositionIndex2];
                /*2-3.确定 该点 左下角 格点索引，值，以及经纬度 */
                var latPositionIndex3 = latPositionIndex1 + 1;
                var lonPositionIndex3 = lonPositionIndex1;
                var lat3 = lats[latPositionIndex3];
                var lon3 = lons[lonPositionIndex3];
                var val3 = gridData[latPositionIndex3][lonPositionIndex3];
                /*2-4.确定 该点 右下角 格点索引，值，以及经纬度 */
                var latPositionIndex4 = latPositionIndex1 + 1;
                var lonPositionIndex4 = lonPositionIndex1 + 1;
                var lat4 = lats[latPositionIndex4];
                var lon4 = lons[lonPositionIndex4];
                var val4 = gridData[latPositionIndex4][lonPositionIndex4];

                /* 2-5.计算 横纵向距离比*/
                var k_horizontal_left = (_lonValue - lon1) / (lon2 - lon1);
                var k_horizontal_right = 1 - k_horizontal_left;
                var k_vertical_top = (_latValue - lat1) / (lat3 - lat1);
                var k_vertical_bot = 1 - k_vertical_top;

                new_grid.gridData[i][j] = this.interpolation(val1, val2, val3, val4,
                    k_horizontal_left, k_horizontal_right, k_vertical_top, k_vertical_bot);
            }
        }

        return new_grid;
    },

    interpolation: function (val1, val2, val3, val4,
                             k_horizontal_left, k_horizontal_right, k_vertical_top, k_vertical_bot) {
        var self = this;
        /*横向插值*/
        // var V1 = val1 * k_horizontal_right + val2 * k_horizontal_left;
        // var V2 = val3 * k_horizontal_right + val4 * k_horizontal_left;
        var V1 = self._calcInterpolation(val1, val2, k_horizontal_right, k_horizontal_left);
        var V2 = self._calcInterpolation(val3, val4, k_horizontal_right, k_horizontal_left);

        /*纵向插值*/
        // var V = V1 * k_vertical_bot + V2 * k_vertical_top;
        var V = self._calcInterpolation(V1, V2, k_vertical_bot, k_vertical_top);

        var result = Number(V).toFixed(1);

        return (result === '0.0') ? 0 : result;
    },

    _calcInterpolation: function (v1, v2, k1, k2) {
        var invalidValue = this.invalidValue;
        if (v1 === invalidValue && v2 === invalidValue) {
            return v1;
        } else if (v1 === invalidValue && v2 !== invalidValue) {
            v1 = v2;
        } else if (v1 !== invalidValue && v2 === invalidValue) {
            v2 = v1;
        }
        return v1 * k1 + v2 * k2;
    }

};