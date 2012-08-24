/**
* Defines new instance methods for the esri.layers.TiledMapServiceLayer class.
*/
/// <reference path="http://serverapi.arcgisonline.com/jsapi/arcgis/?v=2.2compact"/>
(function () {
	function init() {
		if (typeof (esri.layers.TiledMapServiceLayer.prototype.GetTileExtent) === "undefined") {
			dojo.extend(esri.layers.TiledMapServiceLayer, {
				GetTileExtent: function (level, row, column) {
					/// <summary>Gets the extent of a layer tile.</summary>
					/// <param name="level" type="Number">An integer representing a level of detail (LOD).</param>
					/// <param name="row" type="Number">An integer representing a tile row</param>
					/// <param name="column" type="Number">An integer representing a tile column.</param>
					/// <returns type="esri.geometry.Extent" />
					var level = this.tileInfo.lods[level];

					var tileWidth = this.tileInfo.width * level.resolution;
					var tileHeight = this.tileInfo.height * level.resolution;

					var xmin = column * tileWidth + this.tileInfo.origin.x
					var ymax = (row * tileHeight - this.tileInfo.origin.y) / -1;
					var xmax = xmin + tileWidth;
					var ymin = ymax - tileWidth;

					var returnObj = { xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, spatialReference: this.spatialReference };
					return new esri.geometry.Extent(returnObj);
				}
			});
		} else {
			if (console) {
				console.warn("A method called GetTileExtent is already defined in esri.layers.TiledMapServiceLayer");
			}
		}

		if (typeof (esri.layers.TiledMapServiceLayer.prototype.GetTileWidthInMapUnits) === "undefined") {
			dojo.extend(esri.layers.TiledMapServiceLayer, { GetTileWidthInMapUnits: function (level) {
				/// <summary>Returns the tile width in map units for a given level of detail.</summary>
				/// <returns type="Number" />
				return this.tileInfo.width * this.tileInfo.lods[level].resolution;
			}
			});
		} else {
			if (console) {
				console.warn("A method called GetTileWidthInMapUnits is already defined in esri.layers.TiledMapServiceLayer");
			}
		}

		if (typeof (esri.layers.TiledMapServiceLayer.prototype.GetTileHeightInMapUnits) === "undefined") {
			dojo.extend(esri.layers.TiledMapServiceLayer, {
				GetTileHeightInMapUnits: function (level) {
					/// <summary>Returns the tile width in map units for a given level of detail.</summary>
					/// <returns type="Number" />
					return this.tileInfo.height * this.tileInfo.lods[level].resolution;
				}
			});
		} else {
			if (console) {
				console.warn("A method called GetTileHeightInMapUnits is already defined in esri.layers.TiledMapServiceLayer");
			}
		}

		if (typeof (esri.layers.TiledMapServiceLayer.prototype.GetTileContainingPoint) === "undefined") {
			dojo.extend(esri.layers.TiledMapServiceLayer, {
				GetTileContainingPoint: function (level, point) {
					/// <summary>Gets the tile that contains the given point.  Returns an object with Number properties "row" and "column".</summary>
					/// <param name="level" type="Number">An integer representing a level of detail (LOD).</param>
					/// <param name="point" type="Object">An object containing an Number properties "x" and "y".</param>
					/// <returns type="Object" />
					var output = {};
					output.column = Math.floor((point.x - this.tileInfo.origin.x) / (this.GetTileWidthInMapUnits(level)));
					output.row = Math.floor((this.tileInfo.origin.y - point.y) / (this.GetTileHeightInMapUnits(level)));
					return output;
				}
			});
		} else {
			if (console) {
				console.warn("A method called GetTileContainingPoint is already defined in esri.layers.TiledMapServiceLayer");
			}
		}

		if (typeof (esri.layers.TiledMapServiceLayer.prototype.GetFirstTile) === "undefined") {
			dojo.extend(esri.layers.TiledMapServiceLayer, {
				GetFirstTile: function (level) {
					/// <summary>Gets the first tile for the full extent of this layer.</summary>
					/// <param name="level" type="Number">The level of detail for the tile.</param>
					return this.GetTileContainingPoint(level, { x: this.fullExtent.xmin, y: this.fullExtent.ymax });
				}
			});
		} else {
			if (console) {
				console.warn("A method called GetFirstTile is already defined in esri.layers.TiledMapServiceLayer");
			}
		}

		if (typeof (esri.layers.TiledMapServiceLayer.prototype.GetLastTile) === "undefined") {
			dojo.extend(esri.layers.TiledMapServiceLayer, {
				GetLastTile: function (level) {
					/// <summary>Gets the last tile for the full extent of this layer.</summary>
					/// <param name="level" type="Number">The level of detail for the tile.</param>
					return this.GetTileContainingPoint(level, { x: this.fullExtent.xmax, y: this.fullExtent.ymin });
				}
			});
		} else {
			if (console) {
				console.warn("A method called GetLastTile is already defined in esri.layers.TiledMapServiceLayer");
			}
		}
	}

	dojo.addOnLoad(init);
})();