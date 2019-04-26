/**
 * @author wrh
 * @date 2019-04-26
 * @name polyutil
 * @Description:
 */

var PolyUtil = {

    /*判断点和多边形位置关系*/
    isPointInPolygon: function (px, py, points) {
        if (!points || !points.length || points.length < 3) return false;
        var self = this;
        var isInside = false;
        var ESP = 1e-9;
        var count = 0;
        var linePoint1x;
        var linePoint1y;
        var linePoint2x = 180;//2.0037508342789E7;//180;//2.0037508342789E7;
        var linePoint2y;

        linePoint1x = px;
        linePoint1y = py;
        linePoint2y = py;

        for (var i = 0; i < points.length - 1; i++) {
            var cx1 = points[i].lng;
            var cy1 = points[i].lat;
            var cx2 = points[i + 1].lng;
            var cy2 = points[i + 1].lat;
            // var cx1 = points[i].x;
            // var cy1 = points[i].y;
            // var cx2 = points[i + 1].x;
            // var cy2 = points[i + 1].y;
            if (self.isPointOnLine(px, py, cx1, cy1, cx2, cy2)) {
                return true;
            }
            if (Math.abs(cy2 - cy1) <= ESP) {
                continue;
            }

            if (self.isPointOnLine(cx1, cy1, linePoint1x, linePoint1y, linePoint2x, linePoint2y)) {
                if (cy1 > cy2) count++;
            }
            else if (self.isPointOnLine(cx2, cy2, linePoint1x, linePoint1y, linePoint2x, linePoint2y)) {
                if (cy2 > cy1) count++;
            }
            else if (self.isIntersect(cx1, cy1, cx2, cy2, linePoint1x, linePoint1y, linePoint2x, linePoint2y)) {
                count++;
            }
        }
        if (count % 2 == 1) {
            isInside = true;
        }
        return isInside;
    },

    multiply: function (px0, py0, px1, py1, px2, py2) {
        return ((px1 - px0) * (py2 - py0) - (px2 - px0) * (py1 - py0));
    },

    isIntersect: function (px1, py1, px2, py2, px3, py3, px4, py4) {
        var flag = false;
        var d = (px2 - px1) * (py4 - py3) - (py2 - py1) * (px4 - px3);
        if (d != 0) {
            var r = ((py1 - py3) * (px4 - px3) - (px1 - px3) * (py4 - py3)) / d;
            var s = ((py1 - py3) * (px2 - px1) - (px1 - px3) * (py2 - py1)) / d;
            if ((r >= 0) && (r <= 1) && (s >= 0) && (s <= 1)) {
                flag = true;
            }
        }
        return flag;
    },

    isPointOnLine: function (px0, py0, px1, py1, px2, py2) {
        var self = this;
        var flag = false;
        var ESP = 1e-9;
        if ((Math.abs(self.multiply(px0, py0, px1, py1, px2, py2)) < ESP) &&
            ((px0 - px1) * (px0 - px2) <= 0) && ((py0 - py1) * (py0 - py2) <= 0)) {
            flag = true;
        }
        return flag;
    },

    /*判断点和格点的位置关系*/
    isPointInGrid: function (px, py, points) {
        var flag = false;
        var lonmax = latmax = 0;
        var lonmin = latmin = 1000;
        $(points).each(function (i, v) {
            lonmax = v.x > lonmax ? v.x : lonmax;
            latmax = v.y > latmax ? v.y : latmax;
            lonmin = v.x < lonmin ? v.x : lonmin;
            latmin = v.y < latmin ? v.y : latmin;
        });
        if (px > lonmin && px < lonmax && py > latmin && py < latmax)
            flag = true;
        return flag;
    },


    /*判断多边形和格点的位置关系*/
    isGridInPolygon: function (grid, points) {
        var self = this;
        var flag = false;
        var gridPoints = [];
        gridPoints.push([grid.lonmax, grid.latmin]);
        gridPoints.push([grid.lonmax, grid.latmax]);
        gridPoints.push([grid.lonmin, grid.latmin]);
        gridPoints.push([grid.lonmin, grid.latmax]);
        $(gridPoints).each(function (i, v) {
            if (self.isPointInPolygon(v[0], v[1], points)) {
                flag = true;
                return false;
            }
        });
        return flag;
    },

    /*判断点和多边形位置关系*/
    isPointInPolygon2: function (px, py, points) {
        if (!points || !points.length || points.length < 3) return false;
        var self = this;
        var isInside = false;
        var ESP = 1e-9;
        var count = 0;
        var linePoint1x;
        var linePoint1y;
        var linePoint2x = 180;//2.0037508342789E7;//180;//2.0037508342789E7;
        var linePoint2y;

        linePoint1x = px;
        linePoint1y = py;
        linePoint2y = py;

        for (var i = 0; i < points.length - 1; i++) {
            var cx1 = points[i][0];
            var cy1 = points[i][1];
            var cx2 = points[i + 1][0];
            var cy2 = points[i + 1][1];
            // var cx1 = points[i].x;
            // var cy1 = points[i].y;
            // var cx2 = points[i + 1].x;
            // var cy2 = points[i + 1].y;
            if (self.isPointOnLine(px, py, cx1, cy1, cx2, cy2)) {
                return true;
            }
            if (Math.abs(cy2 - cy1) <= ESP) {
                continue;
            }

            if (self.isPointOnLine(cx1, cy1, linePoint1x, linePoint1y, linePoint2x, linePoint2y)) {
                if (cy1 > cy2) count++;
            }
            else if (self.isPointOnLine(cx2, cy2, linePoint1x, linePoint1y, linePoint2x, linePoint2y)) {
                if (cy2 > cy1) count++;
            }
            else if (self.isIntersect(cx1, cy1, cx2, cy2, linePoint1x, linePoint1y, linePoint2x, linePoint2y)) {
                count++;
            }
        }
        if (count % 2 == 1) {
            isInside = true;
        }
        return isInside;
    },
};