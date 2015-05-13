(function(d3, fc) {
    'use strict';

    fc.series.area = function() {

        var decorate = fc.utilities.fn.noop,
            xScale = d3.time.scale(),
            yScale = d3.scale.linear(),
            y0Value = d3.functor(0),
            y1Value = function(d) { return d.close; },
            xValue = function(d) { return d.date; };

        // convenience functions that return the x & y screen coords for a given point
        var x = function(d) { return xScale(xValue(d)); };
        var y0 = function(d) { return yScale(y0Value(d)); };
        var y1 = function(d) { return yScale(y1Value(d)); };

        var areaData = d3.svg.area()
            .defined(function(d) {
                return !isNaN(y0(d)) && !isNaN(y1(d));
            })
            .x(x)
            .y0(y0)
            .y1(y1);

        var area = function(selection) {

            selection.each(function(data) {

                var path = d3.select(this)
                    .selectAll('path.area')
                    .data([data]);

                path.enter()
                    .append('path')
                    .attr('class', 'area');

                path.attr('d', areaData);

                decorate(path);
            });
        };

        area.decorate = function(x) {
            if (!arguments.length) {
                return decorate;
            }
            decorate = x;
            return area;
        };
        area.xScale = function(x) {
            if (!arguments.length) {
                return xScale;
            }
            xScale = x;
            return area;
        };
        area.yScale = function(x) {
            if (!arguments.length) {
                return yScale;
            }
            yScale = x;
            return area;
        };
        area.xValue = function(x) {
            if (!arguments.length) {
                return xValue;
            }
            xValue = x;
            return area;
        };
        area.y0Value = function(x) {
            if (!arguments.length) {
                return y0Value;
            }
            y0Value = d3.functor(x);
            return area;
        };
        area.yValue = area.y1Value = function(x) {
            if (!arguments.length) {
                return y1Value;
            }
            y1Value = x;
            return area;
        };

        return d3.rebind(area, areaData, 'interpolate', 'tension');
    };
}(d3, fc));
