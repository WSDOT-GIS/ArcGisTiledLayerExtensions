/// <reference path="http://serverapi.arcgisonline.com/jsapi/arcgis/2.2compact/js/esri/nls/jsapi_en-us.xd.js"/>
/// <reference path="http://serverapi.arcgisonline.com/jsapi/arcgis/2.2compact/js/dojo/dojox/gfx/svg.xd.js"/>
/// <reference path="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.5-vsdoc.js "/>
/// <reference path="http://ajax.aspnetcdn.com/ajax/jquery.ui/1.8.11/jquery-ui.js"/>
/// <reference path="TiledLayerExtensions.js"/>
dojo.require("esri.layers.agstiled");

var layer;

dojo.ready(function () {
    if (!dojo.isFF || dojo.isFF < 4) {
        $(".mathML").remove();
    }
    else {
        $(".notMathML").remove();
    }
});

$(document).ready(function () {
    $("#resultsSection").hide();
    $("#tileExtent").hide();
    $("button").button();

    $("#selectMapServiceButton").bind("click", function (event) {
        var url = $("#mapServiceSelect").val();
        layer = new esri.layers.ArcGISTiledMapServiceLayer(url, { visible: false });

        //delete url;
        dojo.connect(layer, "onLoad", function (layer) {
            var tileInfo = layer.tileInfo;
            $("#width").text(tileInfo.width);
            $("#height").text(tileInfo.height);
            $("#dpi").text(tileInfo.dpi);
            $("#tilingOrigin").text(tileInfo.origin.x + "," + tileInfo.origin.y);
            $("#units").text(layer.units.replace(/^esri/, ""));
            $("#fullExtent .xmin").text(layer.fullExtent.xmin);
            $("#fullExtent .ymin").text(layer.fullExtent.ymin);
            $("#fullExtent .xmax").text(layer.fullExtent.xmax);
            $("#fullExtent .ymax").text(layer.fullExtent.ymax);

            $.each(layer.tileInfo.lods, function (indexInArray, valueOfElement) { $("#lodSelect").append($("<option>").val(valueOfElement.level).text(valueOfElement.level)); });

            // Clear existing html.
            var tableBody = $("#lodTable > tbody");
            // var tableBody = $(":not(:last)", $("#lodTable > tbody > tr"));
            $("tr", tableBody).remove();

            function createRow() {
                return $("<tr>")
                .append("<td class='level'>")
                .append("<td class='resolution'>")
                .append("<td class='scale'>")
                .append("<td class='tileWidth'>")
                .append("<td class='tileHeight'>")
                .append("<td class='firstRow'>")
                .append("<td class='firstCol'>")
                .append("<td class='lastRow'>")
                .append("<td class='lastCol'>")
                .append("<td class='totalTiles'>");
            }

            var origin = tileInfo.origin;

            var fullExtent = layer.fullExtent;
            var firstTileCol, firstTileRow, lastTileCol, lastTileRow;

            var totalTiles = 0;

            var row;
            // Create a row of data for each LOD.
            $.each(tileInfo.lods, function (indexInArray, lod) {
                row = createRow();
                $(".level", row).text(lod.level);
                $(".resolution", row).text(lod.resolution);
                $(".scale", row).text(lod.scale);

                var tileWidth = layer.GetTileWidthInMapUnits(lod.level);
                var tileHeight = layer.GetTileHeightInMapUnits(lod.level);

                $(".tileWidth", row).text(tileWidth);
                $(".tileHeight", row).text(tileHeight);

                var tileObj = layer.GetFirstTile(lod.level);
                firstTileCol = tileObj.column;
                firstTileRow = tileObj.row;

                $(".firstRow", row).text(firstTileRow);
                $(".firstCol", row).text(firstTileCol);


                tileObj = layer.GetLastTile(lod.level);
                lastTileCol = tileObj.column;
                lastTileRow = tileObj.row;

                delete tileObj;

                $(".lastRow", row).text(lastTileRow);
                $(".lastCol", row).text(lastTileCol);

                var rowCount = lastTileRow === firstTileRow ? 1 : lastTileRow - firstTileRow + 1;
                var colCount = lastTileCol === firstTileCol ? 1 : lastTileCol - firstTileCol + 1;

                var lodTotalTiles = rowCount * colCount;

                totalTiles += lodTotalTiles;

                $(".totalTiles", row).text(lodTotalTiles);

                //tableBody.append("<tr><td class='level'>" + lod.level + "</td><td class='resolution'>" + lod.resolution + "</td><td class='scale'>" + lod.scale + "</td><td class='firstRow'></td></tr>");
                tableBody.append(row);
                if (indexInArray % 2 == 0) {
                    row.addClass("even");
                }
            });

            row = $("<tr>").append("<td colSpan='9'>Total Tiles</td>").append($("<td>").text(totalTiles));
            tableBody.append(row);

            $(".units").text(layer.units.replace(/^esri/, ''));

            $("#resultsSection").show(500);
            $("#tileExtent").show(500);
        });
    });

    $("#findExtentButton").bind("click", function (event) {
        var lod = Number($("#lodSelect").val());
        var row = Number($("#rowInput").val());
        var col = Number($("#colInput").val());

        $("#result").val(JSON.stringify(layer.GetTileExtent(lod, row, col).toJson()));
    });
});