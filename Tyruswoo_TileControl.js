//=============================================================================
// Tile Control
// by Tyruswoo and McKathlin
//
// Be sure to save as:
// Tyruswoo_TileControl.js
//=============================================================================

/*
 * MIT License
 *
 * Copyright (c) 2023 Kathy Bunn and Scott Tyrus Washburn
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var Imported = Imported || {};
Imported.Tyruswoo_TileControl = true;

var Tyruswoo = Tyruswoo || {};
Tyruswoo.TileControl = Tyruswoo.TileControl || {};

/*:
 * @plugindesc MV v4.0.1  Change tiles dynamically during gameplay!
 * @author Tyruswoo and McKathlin
 *
 * @param Tile Info on Move
 * @desc Display TileInfo for the tile beneath the player, for each movement? true or false
 * @default false
 *
 * @param Tile Info on Button
 * @desc Display TileInfo for the tile beneath the player, when OK button pressed? true or false
 * @default true
 *
 * @param Button Common Event
 * @desc The ID of the common event that will run when the player presses the OK button.  default = 0 for no common event.
 * @default 0
 *
 * @param Tile Animation Speed
 * @desc The number of frames elapsed for every animation update of the tilemap.  default = 30
 * @default 30
 *
 * @help
 * Tile Control for RPG Maker MV
 * By Tyruswoo and McKathlin
 * ===========================================================================
 * Tyruswoo.com
 *   Join for more RPG Maker MV content and tutorials!
 * ===========================================================================
 * Plugin Commands:
 *
 * Tile Info       Displays the location and ID of the tiles on which
 *                 the player currently stands.
 *
 * Tile Refresh    Forces the tilemap to refresh, which allows correctly
 *                 displaying the graphics of the map's tiles. (Note: Tilemap
 *                 refresh is automatic whenever a tile is changed.)
 *
 * Tile Set x y z tileId     Set a tile at coordinates x y and layer z
 *                           to the selected tileId.  z = 0 for lowest layer.
 *
 * Tile Set PlayerLoc z tileId      Set a tile at the player's coordinates
 *                                  and layer z to the selected tileId.
 *
 * Tile Set PlayerFront z tileId    Set the tile towards which player is
 *                                  facing at layer z to selected tileId.
 *
 * Tile Set EventLoc eventID z tileId      At the location of the event with
 *                                         eventID, set layer z to tileId.
 *
 * Tile SetRegion regionId tileId z        At all tiles with regionId, set the
 *                                         tile to tileId. z level is optional,
 *                                         and if not used, defaults to 0.
 *
 * Tile SetArea x1 y1 x2 y2 tileId z       At all tiles in the area defined by
 *                                         coordinates x1,y1 to x2,y2, set the
 *                                         tile to tileId. z level is optional,
 *                                         and if not used, defaults to 0.
 *
 * Tile SetAreaRegion x1 y1 x2 y2 regionId tileId z
 * Tile SetRegionArea regionId x1 y1 x2 y2 tileId z
 *
 *                 The above commands have identical effects of combining the
 *                 area and region filters together to only change the tileId
 *                 of tiles that meet both area and region conditions. The z
 *                 level is optional, and if not used, defaults to 0.
 *
 * Tile Swap startTileId tileId z zEnd     At all tiles with tileId startTileId,
 *                                         set the tile to tileId. Affects z
 *                                         layer z, which may be excluded to
 *                                         default to z layer 0. zEnd is the
 *                                         layer used for setting the new tile,
 *                                         and is an optional argument that is
 *                                         by default the same as z.
 *
 * Tile SwapRegion regionId startTileId tileId z zEnd
 *
 *                 At all tiles with regionId and startTileId, set the tile
 *                 to tileId. z level is optional, and if not used, defaults
 *                 to 0. zEnd is the layer used for setting the new tile, and
 *                 is an optional argument that is by default the same as z.
 *
 * Tile SwapArea x1 y1 x2 y2 startTileId tileId z zEnd
 *
 *                 At all tiles in the area defined by coordinates x1,y1 to
 *                 x2,y2, if the tile matches startTileId, then set the tile to
 *                 tileId. z level is optional, and if not used, defaults to 0.
 *                 zEnd is the layer used for setting the new tile, and is an
 *                 optional argument that is by default the same as z.
 *
 * Tile SwapAreaRegion x1 y1 x2 y2 regionId startTileId tileId z zEnd
 * Tile SwapRegionArea regionId x1 y1 x2 y2 startTileId tileId z zEnd
 *
 *                 The above commands have identical effects of combining the
 *                 area, region, and tile filters together to only change the
 *                 tileId of tiles that meet all area, region, and tile swap
 *                 conditions. The z level is optional, and if not used,
 *                 defaults to 0. zEnd is the layer used for setting the new
 *                 tile, and is an optional argument that is by default the
 *                 same as z.
 *
 * Tile Fill x y tileId
 * Tile Fill x y tileId startTileId distance z
 *
 *                 This command originates at coordinates x,y and sets tiles to
 *                 tileId. If no startTileId is provided, then the tile found at
 *                 x,y will be used to determine the startTileId. Using this
 *                 command, it is possible to fill tiles, similar to a fill tool.
 *
 *                 startTileId, distance, and z are optional arguments. The distance
 *                 argument determines how many far the fill command will go. Note
 *                 that the distance depends on tiles being adjacent. The z argument
 *                 can be used to determine which z level is used for checking and
 *                 setting new tiles.
 *
 * Tile FillInnerBorder x y tileId
 * Tile FillInnerBorder x y tileId startTileId z
 *
 *                 Finds the tiles that would be filled, but then only fills the
 *                 outermost of these tiles.
 *
 * Tile FillOuterBorder x y tileId
 * Tile FillOuterBorder x y tileId startTileId z
 *
 *                 Finds the tiles that would be filled, but then instead fills one
 *                 tile beyond the border.
 *
 * Tile FillInnerBorderRegion x y tileId
 * Tile FillInnerBorderRegion x y tileId region startTileId z
 *
 *                 Same as FillInnerBorder, but instead applies only to border tiles
 *                 that have the specified region. (If the optional region argument
 *                 is excluded, then region will be assumed to match the region at
 *                 location (x,y) on the current map.)
 *
 * Tile FillOuterBorderRegion x y tileId
 * Tile FillOuterBorderRegion x y tileId region startTileId z
 *
 *                 Same as FillOuterBorder, but instead modifies only the outer border
 *                 tiles that match the specified region. (If the optional region
 *                 argument is excluded, then region will be assumed to match the
 *                 region at location (x,y) on the current map.)
 *
 *                 Tip: FillOuterBorderRegion is especially useful for making flowing
 *                 water or lava, or drying up of water or lava.
 *
 * Note that if the optional argument startTileId is excluded from FillInnerBorder,
 * FillOuterBorder, FillInnerBorderRegion, or FillOuterBorderRegion, the behavior of
 * the plugin command may be different. For example, FillOuterBorder will attempt to
 * fill the outer border of the specified startTileId, using tileId to fill. If
 * startTileId is not included, it will be assumed to be the same as tileId. So, if
 * tileId is not the same as the tile at the indicated location, the origin tile in
 * question will be modified to tileId, without affecting any other tiles.
 * ===========================================================================
 * A tile's tileId may be identified by opening the console window (using
 * F12), then by having the party leader stand on the tile of interest, then
 * holding the Control (Ctrl) key and pressing Enter (Return). (Note that for
 * this to work, the "Tile Info on Button" option must be true in the Plugin
 * Manager.)
 *
 * For example, using the default Overworld tileset, a whirlpool can be placed
 * using the following plugin command:
 *
 *     Tile Set PlayerLoc 0 2576
 *
 * There is also an easier way to specify the tileId. Rather than using the
 * tileId itself, a code can be used. The code should begin with the letter of
 * the tile panel to be used (A, B, C, D, or E). This is followed by the code
 * number of the desired tile, where the numbers begin at 0 in the upper-left
 * corner of the tile pane, then proceed to increment by 1 from left to right,
 * then top to bottom. The pattern of the numbers for each pane A, B, C, D,
 * and E, matches exactly the numbers shown in the R (region) pane, so the
 * region pane can be used to determine the code number of any desired tile.
 *
 * For example, using the default Overworld tileset, a whirlpool can be placed
 * using this plugin command:
 *
 *     Tile Set PlayerLoc 0 A11
 *
 * Notice in the above, that the whirlpool tile is in the A panel, and it is
 * tile 11 in the panel.
 *
 * Another easy way to specify the tileId is using tilemap coordinates; in
 * other words, the (x,y) position of the desired tile within the tile's
 * selection panel.
 *
 * For example, using the default Overworld tileset, a whirlpool can be placed
 * using this plugin command:
 *
 *     Tile Set PlayerLoc 0 A3,1
 *
 * Tile ID Codes:
 *    There are two types of tile ID codes. You can use either of these codes
 *    instead of the tileId.
 *
 *    Tx,y      Where T is the tab, x is the x position in the tab's tileset,
 *              and y is the y position in the tab's tileset. Also known as
 *              "Letter X comma Y" or "Tab X comma Y".
 *               - This tile code is determined by the Tab (A, B, C, D, or E)
 *                 and the (x,y) position of the desired tile within the
 *                 tilset.
 *               - For example, in tab A, the top left tile is A0,0 (which in
 *                 the Overworld tileset is ocean).
 *               - For example, in the default Overworld tileset, use tile code
 *                 A3,1 for a whirlpool.
 *               - For example, in the default Overworld tileset, use tile code
 *                 B2,1 for a pyramid.
 *               - You can use tile code B0,0 to erase any tile.
 *              
 *              The Tx,y tile ID code assumes that you have a full tileset in
 *              Tab A. This includes A1, A2, A3, A4, and A5. If a plugin
 *              command calls for a Tile ID belonging to an absent tile sheet,
 *              the console will log a warning, and the tile will not be placed.
 *              If you do not have a full tileset in Tab A, refer to the table
 *              below for the first Y value of each A tilesheet:
 *              
 *              Tilesheet | First Y value (top of its sheet)
 *              ----------+----------------------------------
 *                     A1 |  0
 *                     A2 |  2
 *                     A3 |  6
 *                     A4 | 10
 *                     A5 | 16
 *
 *              Tabs B, C, D, and E (if present) have a single tilesheet each,
 *              so finding their x,y coordinates is straightforward.
 *
 *    Tn        Where T is the tab, and n is the number of the tile when
 *              counting tiles from left to right, starting with zero. Also
 *              known as "Letter Number" or "Tab Number".
 *               - Tip: This numbering scheme is the same as how regions are
 *                 numbered and displayed in the regions (R) tab, so you can
 *                 use the regions tab to help with counting tiles.
 *               - For example, in tab A, the first tile is A0 (which in the
 *                 Overworld tileset is ocean).
 *               - For example, in the default Overworld tileset, use tile code
 *                 A11 for a whirlpool.
 *               - For example, in the default Overworld tileset, use tile code
 *                 B10 for a pyramid.
 *               - You can use tile code B0 to erase any tile.
 *
 *              The Tn tile ID code assumes that you have a full
 *              tileset in Tab A. This includes A1, A2, A3, A4, and A5. If you
 *              do not have a full tileset in Tab A, refer to the tile code
 *              cheat sheet below:
 * 
 *              1st code of A1:   0
 *              1st code of A2:  16
 *              1st code of A3:  48
 *              1st code of A4:  80
 *              1st code of A5: 128
 * ===========================================================================
 * By default, above the selected z layer, all z layers are erased when the
 * tile is set. This is similar to how RPG Maker MV works in the map editor.
 * If you want to set a single z layer without modifying any upper z layers,
 * use "Tile SetLayer" instead of "Tile Set".
 *
 * By default, autotiles are detected, so if Tile Set is used to set an
 * autotile, then nearby autotiles will be detected, and they will be linked
 * together. If you want to prevent autotiling, and just set the tile exactly,
 * then use "Tile SetExact" instead of "Tile Set". This is similar to using a
 * Ctrl+RightClick to copy a tile exactly in the map editor.
 *
 * It is possible to combine "Tile SetLayer" and "Tile SetExact". So, you can
 * use "Tile SetLayerExact" (or synonymously, "Tile SetExactLayer"). Using
 * "Tile SetLayerExact" will result in the z layer of the tile being modified,
 * without changing the above z layers of the tile, and without affecting
 * any nearby autotiling.
 * ===========================================================================
 * Visit Tyruswoo.com to ask for help, donate, or browse more of our plugins.
 * ===========================================================================
 * v2.1: May 7, 2020
 *       It is now possible to use the following commands:
 *
 *           Tile SetRegion regionId tileId z
 *           Tile SetArea x1 y1 x2 y2 tileId z
 *           Tile SetAreaRegion x1 y1 x2 y2 regionId tileId z
 *           Tile SetRegionArea regionId x1 y1 x2 y2 tileId z
 *           Tile Swap startTileId tileId z zEnd
 *           Tile SwapRegion regionId startTileId tileId z zEnd
 *           Tile SwapArea x1 y1 x2 y2 startTileId tileId z zEnd
 *           Tile SwapAreaRegion x1 y1 x2 y2 regionId startTileId tileId z zEnd
 *           Tile SwapRegionArea regionId x1 y1 x2 y2 startTileId tileId z zEnd
 *
 *       Note: Set TileAreaRegion and Set TileRegionArea have the same
 *       result, but just switch the order of input of the regionId and
 *       area coordinates within the plugin command.
 *
 *       Also note that in the above plugin commands, z and zEnd are optional
 *       arguments. By default, z is 0. By default, zEnd is the same as z.
 *
 *       Tips:
 *
 *       The Swap command is useful if you want to change all startTileId
 *       to tileId on the current map.
 *
 *       The SwapArea command is useful if you want to change all startTileId
 *       to tileId within only a certain area of the map.
 *
 *       The SwapRegion command is useful if you want to change all startTileId
 *       to tileId within only a certain region of the map.
 *
 *       The SwapAreaRegion (or SwapRegionArea) command is useful if you want to
 *       change all startTileId to tileId within only a certain area of the map
 *       and certain region of the map. Therefore, three conditions must be met:
 *       startTileId, area, and region. This can be use for fine-tuned control
 *       of making lots of tile changes with only needing a few commands.
 * ===========================================================================
 * v3.0: May 21, 2020
 *       Adds the fill command!
 *
 *           Tile Fill x y tileId
 *           Tile Fill x y tileId startTileId distance z
 *
 *       This command will begin at coordinates x,y and will set tiles to
 *       tileId. If no startTileId is provided, then the tile found at x,y
 *       will be used to determine the startTileId. Using this command, it
 *       is possible to fill tiles, similar to a fill tool.
 *
 *       startTileId, distance, and z are optional arguments. The distance
 *       argument determines how many far the fill command will go. Note that
 *       the distance depends on tiles being adjacent. The z argument can be
 *       used to determine which z level is used for checking and setting
 *       new tiles.
 * ===========================================================================
 * v3.1: July 12, 2020
 *       Relative Coordinates:
 *
 *       Added relative coordinate options! Now, instead of defining the
 *       exact x and y coordinates, you can use x, x+Int, x-Int, y, y+Int, or
 *       y-Int, where x and y represent the current coordinates of the event
 *       running the plugin command; and where "Int" is any integer value.
 *       You can use this to more easily specify where tile changes are to be
 *       made, without needing to determine the exact coordinate values!
 *
 *       For example, the following sets tile A3,1 at a location two tiles to
 *       the right, and one tile down, from the event running the plugin command:
 *
 *           Tile Set x+2 y+1 0 A3,1
 *
 *       As another example, the following sets tile A3,1 at a location two tiles
 *       to the left, and one tile up, from the event running the plugin command:
 *
 *           Tile Set x-2 y-1 0 A3,1
 *
 *       Relative coordinates also work with all other plugin commands, including
 *       Set Area, Swap Area, and all types of Fill commands, including the
 *       new Fill commands (see below).
 *
 *       Fill Border Commands:
 *
 *       Added more specialized fill commands! These fill commands make
 *       it easier to use a single plugin command multiple times in many
 *       situations, rather than needing to define exactly the location
 *       to be changed.
 *
 *       Use the following to find the tiles that would be filled, but then
 *       only fill the outermost of these tiles.
 *
 *           Tile FillInnerBorder x y tileId
 *           Tile FillInnerBorder x y tileId startTileId z
 *
 *       Use the following to find the tiles that would be filled, but then
 *       instead fill one tile beyond the border.
 *
 *           Tile FillOuterBorder x y tileId
 *           Tile FillOuterBorder x y tileId startTileId z
 *
 *       Same as FillInnerBorder, but instead applies only to border tiles
 *       that have the specified region. (If the optional region argument
 *       is excluded, then region will be assumed to match the region at
 *       location (x,y) on the current map.)
 *
 *           Tile FillInnerBorderRegion x y tileId
 *           Tile FillInnerBorderRegion x y tileId region startTileId z
 *
 *       Same as FillOuterBorder, but instead modifies only the outer border
 *       tiles that match the specified region. (If the optional region argument
 *       is excluded, then region will be assumed to match the region at
 *       location (x,y) on the current map.)
 *
 *           Tile FillOuterBorderRegion x y tileId
 *           Tile FillOuterBorderRegion x y tileId region startTileId z
 *
 *       Tip: FillOuterBorderRegion is especially useful for making flowing
 *       water or lava, or drying up of water or lava.
 *
 *       Note that if the optional argument startTileId is excluded from any
 *       of the above, the behavior of the plugin command may be different.
 *       For example, FillOuterBorder will attempt to fill the outer border
 *       of the specified startTileId, using tileId to fill. If startTileId
 *       is not included, it will be assumed to be the same as tileId.
 *       So, if tileId is not the same as the tile at the indicated location,
 *       the origin tile in question will be modified to tileId, without
 *       affecting any other tiles.
 * ===========================================================================
 * v4.0: Nov. 8, 2021:
 *     * Fixed bug that was keeping A5 tiles from being placed properly when
 *       written in the form Ax,y
 *     * Fixed crash on plugin command calling for a Tile ID from an absent
 *       tile sheet. Now a warning is logged instead.
 *     * Fixed bug that kept the map from loading properly in some projects.
 *       Thanks to Cris Litvin for reporting this issue and helping us debug!
 * ===========================================================================
 * v4.0.1: September 4, 2023:
 *       * This plugin is now free and open source under the MIT license.
 * ============================================================================
 * MIT License
 *
 * Copyright (c) 2023 Kathy Bunn and Scott Tyrus Washburn
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the “Software”), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 * ============================================================================
 * Remember, only you can build your dreams! Enjoy! :)
 * ~Tyruswoo
 */
 
Tyruswoo.Parameters = PluginManager.parameters('Tyruswoo_TileControl');
Tyruswoo.Param = Tyruswoo.Param || {};

Tyruswoo.Param.TileInfoOnButton = String(Tyruswoo.Parameters['Tile Info on Button']);
Tyruswoo.Param.TileInfoOnMove = String(Tyruswoo.Parameters['Tile Info on Move']);
Tyruswoo.Param.TileAnimationSpeed = String(Tyruswoo.Parameters['Tile Animation Speed']);
Tyruswoo.Param.OkButtonCommonEvent = String(Tyruswoo.Parameters['Button Common Event']);

const TILE_SELECTOR_ROW_SIZE = 8;
const TILES_PER_A_SHEET = [0, 16, 32, 32, 48, 128 ];
const FIRST_A_CODE_NUMBER = [0, 0, 16, 48, 80, 128 ];
const TILE_SHEET_INDEXES_BY_NAME = {
	A1: 0, A2: 1, A3: 2, A4: 3, A5: 4, B: 5, C: 6, D: 7, E: 8
};

//=============================================================================
// Static Tileset Calculations
//=============================================================================

Tyruswoo.TileControl.tileIdExists = function(tilesetId, tileId) {
	const tileSheetName = this.getTileSheetNameOfTileId(tileId);
	return this.tileSheetExists(tilesetId, tileSheetName);
};

Tyruswoo.TileControl.getSheetNumberOfCode = function(codeNumber) {
	for (var i = 1; i < 5; i++) {
		if (codeNumber < FIRST_A_CODE_NUMBER[i+1]) {
			return i;
		}
	}
	// It's on or after the first A5 tile.
	return 5;
};

Tyruswoo.TileControl.tileSheetExists = function(tilesetId, tileSheetName) {
	const sheetIndex = TILE_SHEET_INDEXES_BY_NAME[tileSheetName];
	if (undefined === sheetIndex) {
		return false;
	}
	const tileset = $dataTilesets[tilesetId];
	const sheetName = tileset.tilesetNames[sheetIndex];
	return !!sheetName && sheetName.length > 0;
};

Tyruswoo.TileControl.getTileSheetNameOfTileId = function(tileId) {
	if (tileId < Tilemap.TILE_ID_B) {
		console.warn("Unexpected negative tile ID: " + tileId);
		return "?";
	} else if (tileId < Tilemap.TILE_ID_C) {
		return "B";
	} else if (tileId < Tilemap.TILE_ID_D) {
		return "C";
	} else if (tileId < Tilemap.TILE_ID_E) {
		return "D";
	} else if (tileId < Tilemap.TILE_ID_A5) {
		return "E";
	} else if (Tilemap.isTileA1(tileId)) {
		return "A1";
	} else if (Tilemap.isTileA2(tileId)) {
		return "A2";
	} else if (Tilemap.isTileA3(tileId)) {
		return "A3";
	} else if (Tilemap.isTileA4(tileId)) {
		return "A4";
	} else if (Tilemap.isTileA5(tileId)) {
		return "A5";
	} else {
		console.warn("Unexpected tile ID: " + tileId);
		return "?";
	}
};

//=============================================================================
// Tile data persistence
//=============================================================================

// Alias method
Tyruswoo.TileControl.Scene_Map_onMapLoaded =
	Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
	var mapId = this._transfer ? $gamePlayer.newMapId() : $gameMap.mapId();
	DataManager.restoreTileChanges(mapId);
    Tyruswoo.TileControl.Scene_Map_onMapLoaded.call(this);
};

// New method
DataManager.restoreTileChanges = function(mapId) {
	if (mapId <= 0 || !$gameTileChanges || !$gameTileChanges[mapId]) {
		return;
	}
	//console.log("Restoring tile changes...");
	var mapTileChanges = $gameTileChanges[mapId];
	for (var index in mapTileChanges) {
		$dataMap.data[index] = mapTileChanges[index];
	}
};

// Alias method
Tyruswoo.TileControl.DataManager_createGameObjects =
	DataManager.createGameObjects;
DataManager.createGameObjects = function() {
    Tyruswoo.TileControl.DataManager_createGameObjects.call(this);
    $gameTileChanges = {};
};

// Alias method
Tyruswoo.TileControl.DataManager_makeSaveContents =
	DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    // A save data does not contain $gameTemp, $gameMessage, and $gameTroop.
    var contents = Tyruswoo.TileControl.DataManager_makeSaveContents.call(this);
    contents.tileChanges = $gameTileChanges;
    return contents;
};

// Alias method
Tyruswoo.TileControl.DataManager_extractSaveContents =
	DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    Tyruswoo.TileControl.DataManager_extractSaveContents.call(this, contents);
    $gameTileChanges = contents.tileChanges || {};
};

//=============================================================================
// Game_Interpreter
//=============================================================================
 
// Alias method
Tyruswoo.TileControl.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Tyruswoo.TileControl.Game_Interpreter_pluginCommand.call(this, command, args);
	if(command.toLowerCase() === 'tile') {
		var subCommand = args[0].toLowerCase();
		switch(subCommand) {
			case 'info':
				var x = $gamePlayer.x;
				var y = $gamePlayer.y;
				Tyruswoo.TileControl.logTileInfo(x, y);
				break;
			case 'refresh':
				$gameMap._needsTilemapRefresh = true;
				break;
			case 'set':
			case 'setexact':
			case 'setlayer':
			case 'setlayerexact':
			case 'setexactlayer':
				var clearUpperLayers = true; //By default, we clear any upper z layers.
				if(subCommand == 'setlayer' || subCommand == 'setlayerexact' || subCommand == 'setexactlayer'){ //To keep upper z layers, use "Tile SetLayer".
					clearUpperLayers = false;
				};
				var exact = false; //By default, we allow autotiles to be detected, so that autotiles connect together.
				if(subCommand == 'setexact' || subCommand == 'setlayerexact' || subCommand == 'setexactlayer'){ //To set the tile exactly as written, ignoring autotile properties, use "Tile SetExact".
					exact = true;
				};
				var x, y, z, tileId;
				switch(args[1].toLowerCase()) {
					case 'playerloc':
						x = $gamePlayer.x;
						y = $gamePlayer.y;
						z = args[2];
						tileId = this.readTileCode(args[3]);
						//console.log("Tile Set PlayerLoc z =", z, "to tileId", tileId);
						break;
					case 'playerfront':
						x = $gamePlayer.x;
						y = $gamePlayer.y;
						var d = $gamePlayer.direction();
						x = $gameMap.xWithDirection(x, d);
						y = $gameMap.yWithDirection(y, d);
						z = args[2];
						tileId = this.readTileCode(args[3]);
						//console.log("Tile Set PlayerFront z =", z, "to tileId", tileId);
						break;
					case 'eventloc':
						var e = $gameMap.event(args[2]);
						x = e.x;
						y = e.y;
						z = args[3];
						tileId = this.readTileCode(args[4]);
						//console.log("Tile Set EventLoc at event =", e._eventId, "z =", z, "to tileId", tileId);
						break;
					default:
						x = this.readCoordCode(args[1]);
						y = this.readCoordCode(args[2]);
						z = args[3];
						tileId = this.readTileCode(args[4]);
						//console.log("Tile Set", x, y, z, "to tileId", tileId);
				}
				$gameMap.setTileId(x, y, z, tileId, clearUpperLayers, exact);
				break;
			case 'setregion':
				var regionId = args[1];
				var tileId = this.readTileCode(args[2]);
				var z = 0; //By default, the lowest layer is the location at which the region's tiles are affected.
				if(args[3] != null) {z = args[3]}; //But, if the z layer is set, then may affect higher tiles, while leaving lower tiles intact.
				$gameMap.setTileIdByRegion(regionId, tileId, z);
				//console.log("Tile Set Region", regionId, "at z layer", z, "to tileId", tileId);
				break;
			case 'setarea':
				var x1 = this.readCoordCode(args[1]);
				var y1 = this.readCoordCode(args[2]);
				var x2 = this.readCoordCode(args[3]);
				var y2 = this.readCoordCode(args[4]);
				var tileId = this.readTileCode(args[5]);
				var z = 0;
				if(args[6] != null) {z = args[6]};
				$gameMap.setTileIdByArea(x1, y1, x2, y2, tileId, z);
				//console.log("Tile Set Area within x1", x1, "y1", y1, "and x2", x2, "y2", y2, "at z layer", z, "to tileId", tileId);
				break;
			case 'setarearegion':
				var x1 = this.readCoordCode(args[1]);
				var y1 = this.readCoordCode(args[2]);
				var x2 = this.readCoordCode(args[3]);
				var y2 = this.readCoordCode(args[4]);
				var regionId = args[5];
				var tileId = this.readTileCode(args[6]);
				var z = 0;
				if(args[7] != null) {z = args[7]};
				$gameMap.setTileIdByAreaRegion(x1, y1, x2, y2, regionId, tileId, z);
				break;
			case 'setregionarea':
				var regionId = args[1];
				var x1 = this.readCoordCode(args[2]);
				var y1 = this.readCoordCode(args[3]);
				var x2 = this.readCoordCode(args[4]);
				var y2 = this.readCoordCode(args[5]);
				var tileId = this.readTileCode(args[6]);
				var z = 0;
				if(args[7] != null) {z = args[7]};
				$gameMap.setTileIdByAreaRegion(x1, y1, x2, y2, regionId, tileId, z);
				break;
			case 'swap':
				var startTileId = this.readTileCode(args[1]);
				var tileId = this.readTileCode(args[2]);
				var z = 0;
				if(args[3] != null) {z = args[3]};
				var zEnd = z;
				if(args[4] != null) {zEnd = args[4]};
				$gameMap.swapTileId(startTileId, tileId, z, zEnd);
				break;
			case 'swapregion':
				var regionId = args[1];
				var startTileId = this.readTileCode(args[2]);
				var tileId = this.readTileCode(args[3]);
				var z = 0;
				if(args[4] != null) {z = args[4]};
				var zEnd = z;
				if(args[5] != null) {zEnd = args[5]};
				$gameMap.swapTileIdByRegion(regionId, startTileId, tileId, z, zEnd);
				break;
			case 'swaparea':
				var x1 = this.readCoordCode(args[1]);
				var y1 = this.readCoordCode(args[2]);
				var x2 = this.readCoordCode(args[3]);
				var y2 = this.readCoordCode(args[4]);
				var startTileId = this.readTileCode(args[5]);
				var tileId = this.readTileCode(args[6]);
				var z = 0;
				if(args[7] != null) {z = args[7]};
				var zEnd = z;
				if(args[8] != null) {zEnd = args[8]};
				$gameMap.swapTileIdByArea(x1, y1, x2, y2, startTileId, tileId, z, zEnd);
				break;
			case 'swaparearegion':
				var x1 = this.readCoordCode(args[1]);
				var y1 = this.readCoordCode(args[2]);
				var x2 = this.readCoordCode(args[3]);
				var y2 = this.readCoordCode(args[4]);
				var regionId = args[5];
				var startTileId = this.readTileCode(args[6]);
				var tileId = this.readTileCode(args[7]);
				var z = 0;
				if(args[8] != null) {z = args[8]};
				var zEnd = z;
				if(args[9] != null) {zEnd = args[9]};
				$gameMap.swapTileIdByAreaRegion(x1, y1, x2, y2, regionId, startTileId, tileId, z, zEnd);
				break;
			case 'swapregionarea':
				var regionId = args[1];
				var x1 = this.readCoordCode(args[2]);
				var y1 = this.readCoordCode(args[3]);
				var x2 = this.readCoordCode(args[4]);
				var y2 = this.readCoordCode(args[5]);
				var startTileId = this.readTileCode(args[6]);
				var tileId = this.readTileCode(args[7]);
				var z = 0;
				if(args[8] != null) {z = args[8]};
				var zEnd = z;
				if(args[9] != null) {zEnd = args[9]};
				$gameMap.swapTileIdByAreaRegion(x1, y1, x2, y2, regionId, startTileId, tileId, z, zEnd);
				break;
			case 'fill':
				var x1 = this.readCoordCode(args[1]);
				var y1 = this.readCoordCode(args[2]);
				var tileId = this.readTileCode(args[3]);
				var startTileId = 'null';
				if(args[4] != null) {startTileId = this.readTileCode(args[4])};
				var distance = 10000;
				if(args[5] != null) {distance = args[5];};
				var z = 0;
				if(args[6] != null) {z = args[6];};
				var script = '$gameMap.fillTileId(' + x1.toString() + ', ' + y1.toString() + ', ' + tileId + ', ' + startTileId + ', ' + distance.toString() + ', ' + z.toString() + ');' + '\n';
				eval(script); //Not sure why this works as a script, but not as a direct function call, but this work-around by using a script does work...
				break;
			case 'fillinnerborder':
				var x1 = this.readCoordCode(args[1]);
				var y1 = this.readCoordCode(args[2]);
				var tileId = this.readTileCode(args[3]);
				var startTileId = 'null';
				if(args[4] != null) {startTileId = this.readTileCode(args[4]);};
				var z = 0;
				if(args[5] != null) {z = args[5];};
				if(startTileId == 'null' && $gameMap.autotileType(parseInt(x1), parseInt(y1), z) != $gameMap.autotileTypeById(parseInt(tileId)) && $gameMap.tileId(parseInt(x1), parseInt(y1), z) != parseInt(tileId)) {
					$gameMap.setTileId(parseInt(x1), parseInt(y1), z, parseInt(tileId), true, false);
				} else {
					var script = '$gameMap.fillInnerBorder(' + x1 + ', ' + y1 + ', ' + tileId + ', ' + startTileId + ', ' + z.toString() + ');' + '\n';
					eval(script); //Not sure why this works as a script, but not as a direct function call, but this work-around by using a script does work...
				};
				break;
			case 'fillouterborder':
				var x1 = this.readCoordCode(args[1]);
				var y1 = this.readCoordCode(args[2]);
				var tileId = this.readTileCode(args[3]);
				var startTileId = 'null';
				if(args[4] != null) {startTileId = this.readTileCode(args[4]);};
				var z = 0;
				if(args[5] != null) {z = args[5];};
				if(startTileId == 'null' && $gameMap.autotileType(parseInt(x1), parseInt(y1), z) != $gameMap.autotileTypeById(parseInt(tileId)) && $gameMap.tileId(parseInt(x1), parseInt(y1), z) != parseInt(tileId)) {
					$gameMap.setTileId(parseInt(x1), parseInt(y1), z, parseInt(tileId), true, false);
				} else {
					var script = '$gameMap.fillOuterBorder(' + x1 + ', ' + y1 + ', ' + tileId + ', ' + startTileId + ', ' + z.toString() + ');' + '\n';
					eval(script); //Not sure why this works as a script, but not as a direct function call, but this work-around by using a script does work...
				};
				break;
			case 'fillinnerborderregion':
				var x1 = this.readCoordCode(args[1]);
				var y1 = this.readCoordCode(args[2]);
				var tileId = this.readTileCode(args[3]);
				var region = $gameMap.regionId(x1, y1);
				if(args[4] != null) {region = args[4];};
				var startTileId = 'null';
				if(args[5] != null) {startTileId = this.readTileCode(args[5]);};
				var z = 0;
				if(args[6] != null) {z = args[6];};
				if(startTileId == 'null' && $gameMap.autotileType(parseInt(x1), parseInt(y1), z) != $gameMap.autotileTypeById(parseInt(tileId)) && $gameMap.tileId(parseInt(x1), parseInt(y1), z) != parseInt(tileId)) {
					$gameMap.setTileId(parseInt(x1), parseInt(y1), z, parseInt(tileId), true, false);
				} else {
					var script = '$gameMap.fillInnerBorderRegion(' + x1 + ', ' + y1 + ', ' + tileId + ', ' + region + ', ' + startTileId + ', ' + z.toString() + ');' + '\n';
					eval(script); //Not sure why this works as a script, but not as a direct function call, but this work-around by using a script does work...
				};
				break;
			case 'fillouterborderregion':
				var x1 = this.readCoordCode(args[1]);
				var y1 = this.readCoordCode(args[2]);
				var tileId = this.readTileCode(args[3]);
				var region = $gameMap.regionId(x1, y1);
				if(args[4] != null) {region = args[4];};
				var startTileId = 'null';
				if(args[5] != null) {startTileId = this.readTileCode(args[5]);};
				var z = 0;
				if(args[6] != null) {z = args[6];};
				if(startTileId == 'null' && $gameMap.autotileType(parseInt(x1), parseInt(y1), z) != $gameMap.autotileTypeById(parseInt(tileId)) && $gameMap.tileId(parseInt(x1), parseInt(y1), z) != parseInt(tileId)) {
					$gameMap.setTileId(parseInt(x1), parseInt(y1), z, parseInt(tileId), true, false);
				} else {
					var script = '$gameMap.fillOuterBorderRegion(' + x1 + ', ' + y1 + ', ' + tileId + ', ' + region + ', ' + startTileId + ', ' + z.toString() + ');' + '\n';
					eval(script); //Not sure why this works as a script, but not as a direct function call, but this work-around by using a script does work...					
				};
				break;
		}
	}
};

// New method
// If a relative coordinate code is used, provide the coordinate value based on the position of the current event.
Game_Interpreter.prototype.readCoordCode = function(arg) {
	var value = arg;
	if(typeof arg == "string") {
		var e = $gameMap.event(this._eventId);
		var offset = arg.substr(2) ? parseInt(arg.substr(2)) : 0;
		if(arg.charAt(1) == '-') {offset = -offset;};
		switch(arg.charAt(0)) {
			case 'x':
				value = e.x + offset;
				//console.log("X coord:", value);
				break;
			case 'y':
				value = e.y + offset;
				//console.log("Y coord:", value);
				break;
		}
	}
	return value;
};

// New method
Game_Interpreter.prototype.readTileCode = function(arg) {
	var tileId = 0;
	var codeLetter = arg.toLowerCase().charAt(0);
	var codeNumber = -1;
	var codeX = 0;
	var codeY = 0;
	if(arg.charAt(2) && arg.charAt(2) == ',') {
		codeX = parseInt(arg.charAt(1));
		codeY = parseInt(arg.substr(3));
		codeNumber = (codeY * TILE_SELECTOR_ROW_SIZE) + codeX;
	} else {
		codeNumber = parseInt(arg.substr(1));
	}
	switch(codeLetter) {
		case 'a':
			let sheetNumber = Tyruswoo.TileControl.getSheetNumberOfCode(codeNumber);
			if(sheetNumber < 5) { //A1 through A4
				tileId = Tilemap.TILE_ID_A1 + codeNumber * 48;
			} else { //A5 tiles
				tileId = Tilemap.TILE_ID_A5 + codeNumber - 128;
			};
			break;
		case 'b':
			tileId = Tilemap.TILE_ID_B + codeNumber;
			break;
		case 'c':
			tileId = Tilemap.TILE_ID_C + codeNumber;
			break;
		case 'd':
			tileId = Tilemap.TILE_ID_D + codeNumber;
			break;
		case 'e':
			tileId = Tilemap.TILE_ID_E + codeNumber;
			break;
		default:
			tileId = parseInt(arg);
	};
	return tileId;
};
	
//=============================================================================
// Game_Map
//=============================================================================

// New method
Game_Map.prototype.tileIdCode = function(x, y, z) {
	return this.tileCodeAt(x, y, z);
};

// New method
Game_Map.prototype.readTileCode = function(arg) {
	var tileId = 0;
	var codeLetter = typeof arg == "string" ? arg.toLowerCase().charAt(0) : null;
	var codeNumber = -1;
	var codeX = 0;
	var codeY = 0;
	if(typeof arg == "string") {
		if(arg.charAt(2) && arg.charAt(2) == ',') {
			codeX = parseInt(arg.charAt(1));
			codeY = parseInt(arg.substr(3));
		} else {
			codeNumber = parseInt(arg.substr(1));
		};
	};
	//console.log("Tyruswoo Tile Control codeLetter:", codeLetter);
	//console.log("Tyruswoo Tile Control codeNumber:", codeNumber);
	//console.log("Tyruswoo Tile Control codeX:", codeX);
	//console.log("Tyruswoo Tile Control codeY:", codeY);
	switch(codeLetter) {
		case 'a':
			
			if(codeNumber <= 127) { //A1, A2, A3, and A4 autotiles.
				tileId += Tilemap.TILE_ID_A1;
				tileId += (codeNumber >= 0) ? codeNumber * 48 : (codeY * 8 + codeX) * 48;
			} else { //A5 tiles.
				tileId += Tilemap.TILE_ID_A5;
				tileId += (codeNumber >= 0) ? codeNumber - 128 : (codeY - 16) * 8 + codeX;
			};
			break;
		case 'b':
			tileId += Tilemap.TILE_ID_B;
			tileId += (codeNumber >= 0) ? codeNumber : codeY * 8 + codeX;
			break;
		case 'c':
			tileId += Tilemap.TILE_ID_C;
			tileId += (codeNumber >= 0) ? codeNumber : codeY * 8 + codeX;
			break;
		case 'd':
			tileId += Tilemap.TILE_ID_D;
			tileId += (codeNumber >= 0) ? codeNumber : codeY * 8 + codeX;
			break;
		case 'e':
			tileId += Tilemap.TILE_ID_E;
			tileId += (codeNumber >= 0) ? codeNumber : codeY * 8 + codeX;
			break;
		default:
			tileId = arg;
	};
	//console.log("Tyruswoo Tile Control Interpreted tileId:", tileId);
	return tileId;
};

// New method
// This method is useful for use as a script in a Conditional Branch.
Game_Map.prototype.tileCodeAt = function(x, y, z) {
	var tileId = this.tileId(x, y, z);
	return this.tileCodeFromId(tileId);
};

// New method
// This method takes a tileId as input, and returns the tileCode.
Game_Map.prototype.tileCodeFromId = function(tileId) {
	var tileCode = "";
	var codeX = 0;
	var codeY = 0;
	if(tileId >= Tilemap.TILE_ID_A1) {
		codeY = Math.floor((tileId - Tilemap.TILE_ID_A1) / (48 * 8));
		codeX = Math.floor((tileId - Tilemap.TILE_ID_A1 - codeY * 48 * 8) / 48);
		tileCode = "A" + codeX + "," + codeY;
	} else if(tileId >= Tilemap.TILE_ID_A5) {
		codeY = Math.floor((tileId - Tilemap.TILE_ID_A5) / 8) + 16;
		codeX = tileId - Tilemap.TILE_ID_A5 - (codeY - 16) * 8;
		tileCode = "A" + codeX + "," + codeY;
	} else if(tileId >= Tilemap.TILE_ID_E) {
		codeY = Math.floor((tileId - Tilemap.TILE_ID_E) / 8);
		codeX = tileId - Tilemap.TILE_ID_E - codeY * 8;
		tileCode = "E" + codeX + "," + codeY;
	} else if(tileId >= Tilemap.TILE_ID_D) {
		codeY = Math.floor((tileId - Tilemap.TILE_ID_D) / 8);
		codeX = tileId - Tilemap.TILE_ID_D - codeY * 8;
		tileCode = "D" + codeX + "," + codeY;
	} else if(tileId >= Tilemap.TILE_ID_C) {
		codeY = Math.floor((tileId - Tilemap.TILE_ID_C) / 8);
		codeX = tileId - Tilemap.TILE_ID_C - codeY * 8;
		tileCode = "C" + codeX + "," + codeY;
	} else if(tileId >= Tilemap.TILE_ID_B) {
		codeY = Math.floor((tileId - Tilemap.TILE_ID_B) / 8);
		codeX = tileId - Tilemap.TILE_ID_B - codeY * 8;
		tileCode = "B" + codeX + "," + codeY;
	};
	return tileCode;
};

// Alias method
Tyruswoo.TileControl.Game_Map_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function(mapId) {
	Tyruswoo.TileControl.Game_Map_initialize.call(this, mapId);
    this._needsTilemapRefresh = false;
    this._tileChanges = {};
};

Tyruswoo.TileControl.Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	Tyruswoo.TileControl.Game_Map_setup.call(this, mapId);
	this._tileChanges = this.getTileChangeData(mapId);
}

Game_Map.prototype.getTileChangeData = function(mapId) {
	if (!mapId || mapId <= 0) {
		throw new Error("Invalid Map ID: " + mapId);
	}
	if (!$gameTileChanges[mapId]) {
		$gameTileChanges[mapId] = {};
	}
	return $gameTileChanges[mapId];
}

// New method
Game_Map.prototype.logTileInfo = function(x, y) {
	var tileId = this.tileId(x, y, 0);
	var a = this.autotileType(x, y, 0);
	var tileCode = this.tileCodeAt(x, y, 0);
	console.log("Info: Tile", x, y, 0, "tileId", tileId, "Autotile Type", a, "Code", tileCode);
	for(z = 1; z <= 3; z++) {
		tileId = this.tileId(x, y, z);
		a = this.autotileType(x, y, z);
		tileCode = this.tileCodeAt(x, y, z);
		console.log("      Tile", x, y, z, "tileId", tileId, "Autotile Type", a, "Code", tileCode);
	}
	var r = this.regionId(x, y);
	var t = this.terrainTag(x, y);
	console.log("      Tile Region:", r);
	console.log("      Terrain Tag:", r);
}

// New method
Game_Map.prototype.setTileId = function(x, y, z, tileId, clearUpperLayers, exact) {
	var x = Math.round(x);
	var y = Math.round(y);
	var tileId = this.readTileCode(tileId);
	if (clearUpperLayers) {
		for (var zz = z + 1; zz <= 3; zz++) {
			this.setExactTileId(x, y, zz, 0);
		}
	}
	var a = this.autotileTypeById(tileId);
	if(!exact && a != -1) {
		tileId = this.shapeAutotile(x, y, z, a);
	}
	this.setExactTileId(x, y, z, tileId);
	if(!exact && a != -1) {
		this.autotileNeighbor(x, y - 1, z);
		this.autotileNeighbor(x + 1, y, z);
		this.autotileNeighbor(x, y + 1, z);
		this.autotileNeighbor(x - 1, y, z);
		this.autotileNeighbor(x - 1, y - 1, z);
		this.autotileNeighbor(x - 1, y + 1, z);
		this.autotileNeighbor(x + 1, y - 1, z);
		this.autotileNeighbor(x + 1, y + 1, z);
	}

};

// New method
Game_Map.prototype.autotileTypeById = function(tileId) {
    return tileId >= 2048 ? Math.floor((tileId - 2048) / 48) : -1;
};

// New method
Game_Map.prototype.setExactTileId = function(x, y, z, tileId) {
	if (!Tyruswoo.TileControl.tileIdExists(this._tilesetId, tileId)) {
		const tileSheetName = Tyruswoo.TileControl.getTileSheetNameOfTileId(tileId);
		console.warn("Tile ID %1 is on Sheet %2, which does not exist in Tileset %3.\nTile was not changed.".format(
			tileId, tileSheetName, this._tilesetId));
		return;
	}
	const index = (z * $dataMap.height + y) * $dataMap.width + x;
	$dataMap.data[index] = tileId;
	this._tileChanges[index] = tileId;
	this._needsTilemapRefresh = true; //Every time a tile ID is set, refresh.
}

Game_Map.prototype.autotileNeighbor = function(x, y, z) {
	var a = this.autotileType(x, y, z);
	if (a == -1) {
		return;
	}
	tileId = this.shapeAutotile(x, y, z, a);
	this.setExactTileId(x, y, z, tileId);
};

// New method
Game_Map.prototype.shapeAutotile = function(x, y, z, a) {
	var n = false; //Keep track of whether there is a matching autotile neighboring in the given direction.
	var e = false;
	var s = false;
	var w = false;
	var nw = false;
	var ne = false;
	var se = false;
	var sw = false;
	var a_n = this.autotileType(x, y - 1, z); //Determine the autotile type of neighboring tiles.
	var a_e = this.autotileType(x + 1, y, z);
	var a_s = this.autotileType(x, y + 1, z);
	var a_w = this.autotileType(x - 1, y, z);
	var a_nw = this.autotileType(x - 1, y - 1, z);
	var a_ne = this.autotileType(x + 1, y - 1, z);
	var a_se = this.autotileType(x + 1, y + 1, z);
	var a_sw = this.autotileType(x - 1, y + 1, z);
	if(a_n == a) {n = true;}; //If the neighboring tile's autotile type matches the current tile's autotile type, then remember this.
	if(a_e == a) {e = true;};
	if(a_s == a) {s = true;};
	if(a_w == a) {w = true;};
	if(a_nw == a) {nw = true;};
	if(a_ne == a) {ne = true;};
	if(a_se == a) {se = true;};
	if(a_sw == a) {sw = true;};
	var baseTileId = a * 48 + 2048;
	var tileId = baseTileId;
	if(Tilemap.isWaterfallTile(baseTileId)) { //Waterfall Animation Autotiles
		tileId += this.calculateWaterfallShape(e, w);
	} else if(Tilemap.isTileA3(baseTileId) || Tilemap.isWallSideTile(baseTileId)) { //Buildings Autotiles
		tileId += this.calculateAutotileNESWShape(n, e, s, w);
	} else { //All other autotiles.
		tileId += this.calculateAutotileShape(n, e, s, w, nw, ne, se, sw);
	};
	return tileId;
};

// New method.
// This method accounts for all cardinal and diagonal autotiles.
// Although the if and else statements below may seem strangely arranged, they coordinate with the
// progression of the tileId and the corresponding autotile shapes. There are 48 tileIds for shapes,
// but only 47 of the tileIds are needed to account for all possible shapes. Therefore, shapes range from 0-46.
// n, e, s, w, nw, ne, se, sw: These boolean values indicate whether a matching autotile is located
// in the corresponding direction from the autotile being shaped.
Game_Map.prototype.calculateAutotileShape = function(n, e, s, w, nw, ne, se, sw) {
	var shape = 0;
	if(n && e && s && w) { //Shapes 0-15.
		if(!nw) shape += 1;
		if(!ne) shape += 2;
		if(!se) shape += 4;
		if(!sw) shape += 8;
	} else if(n && e && s && !w){ //Shapes 16-19.
		shape += 16;
		if(!ne) shape += 1;
		if(!se) shape += 2;
	} else if(!n && e && s && w){ //Shapes 20-23.
		shape += 20;
		if(!se) shape += 1;
		if(!sw) shape += 2;
	} else if(n && !e && s && w){ //Shapes 24-27.
		shape += 24;
		if(!sw) shape += 1;
		if(!nw) shape += 2;
	} else if(n && e && !s && w){ //Shapes 28-31.
		shape += 28;
		if(!nw) shape += 1;
		if(!ne) shape += 2;
	} else if(n && !e && s && !w){ //Shape 32.
		shape += 32;
	} else if(!n && e && !s && w){ //Shape 33.
		shape += 33;
	} else if(!n && e && s && !w){ //Shapes 34-35.
		shape += 34;
		if(!se) shape += 1;
	} else if(!n && !e && s && w){ //Shapes 36-37.
		shape += 36;
		if(!sw) shape += 1;
	} else if(n && !e && !s && w){ //Shapes 38-39.
		shape += 38;
		if(!nw) shape += 1;
	} else if(n && e && !s && !w){ //Shapes 40-41.
		shape += 40;
		if(!ne) shape += 1;
	} else if(!n && !e && s && !w){ //Shape 42.
		shape += 42;
	} else if(!n && e && !s && !w){ //Shape 43.
		shape += 43;
	} else if(n && !e && !s && !w){ //Shape 44.
		shape += 44;
	} else if(!n && !e && !s && w){ //Shape 45.
		shape += 45;
	} else if(!n && !e && !s && !w){ //Shape 46
		shape += 46;
		//tileId+47 (Shape 47) is not used; it is a duplicate of tileId+46 (Shape 46).
	};
	return shape;
};

// New method
// For calculating the shape (appearance) of waterfall tiles.
Game_Map.prototype.calculateWaterfallShape = function(e, w) {
	var shape = 0; //Shape 0.
	if(e && !w) { //Shape 1.
		shape += 1;
	} else if(!e && w) { //Shape 2.
		shape += 2;
	} else if(!e && !w) { //Shape 3.
		shape += 3;
	};
	return shape;
};

// New method
// For calculating the shape (appearance) of building (roof and building edge) tiles (A3 tiles), and wall side tiles (certain A4 tiles).
Game_Map.prototype.calculateAutotileNESWShape = function(n, e, s, w) {
	var shape = 0; //Shapes 0-15.
	if(!w) shape += 1;
	if(!n) shape += 2;
	if(!e) shape += 4;
	if(!s) shape += 8;
	return shape;
};

// New method
Game_Map.prototype.setTileIdByRegion = function(regionId, tileId, z) {
	var width = $dataMap.width;
    var height = $dataMap.height;
	for(var y = 0; y <= height; y++) {
		for(var x = 0; x <= width; x++) {
			if(this.regionId(x, y) == regionId) {this.setTileId(x, y, z, tileId, true, false)};
		}	
	}
};

// New method
Game_Map.prototype.setTileIdByArea = function(x1, y1, x2, y2, tileId, z) {
	for(var y = y1; y <= y2; y++) {
		for(var x = x1; x <= x2; x++) {
			this.setTileId(x, y, z, tileId, true, false);
		}	
	}
};

// New method
Game_Map.prototype.setTileIdByAreaRegion = function(x1, y1, x2, y2, regionId, tileId, z) {
	for(var y = y1; y <= y2; y++) {
		for(var x = x1; x <= x2; x++) {
			if(this.regionId(x, y) == regionId) {this.setTileId(x, y, z, tileId, true, false)};
		}	
	}
};

// New method
Game_Map.prototype.swapTileId = function(startTileId, tileId, z, zEnd) {
	var width = $dataMap.width;
    var height = $dataMap.height;
	var a1 = (startTileId >= 2048 ? Math.floor((startTileId - 2048) / 48) : -1);
	for(var y = 0; y <= height; y++) {
		for(var x = 0; x <= width; x++) {
			var a = this.autotileType(x, y, z);
			if(((a == a1) && (a != -1)) || this.tileId(x, y, z) == startTileId) {this.setTileId(x, y, zEnd, tileId, true, false)};
		}	
	}
};

// New method
Game_Map.prototype.swapTileIdByRegion = function(regionId, startTileId, tileId, z, zEnd) {
	var width = $dataMap.width;
    var height = $dataMap.height;
	var a1 = (startTileId >= 2048 ? Math.floor((startTileId - 2048) / 48) : -1);
	for(var y = 0; y <= height; y++) {
		for(var x = 0; x <= width; x++) {
			var a = this.autotileType(x, y, z);
			if(this.regionId(x, y) == regionId && (((a == a1) && (a != -1)) || this.tileId(x, y, z) == startTileId)) {this.setTileId(x, y, zEnd, tileId, true, false)};
		}	
	}
};

// New method
Game_Map.prototype.swapTileIdByArea = function(x1, y1, x2, y2, startTileId, tileId, z, zEnd) {
	var a1 = (startTileId >= 2048 ? Math.floor((startTileId - 2048) / 48) : -1);
	for(var y = y1; y <= y2; y++) {
		for(var x = x1; x <= x2; x++) {
			var a = this.autotileType(x, y, z);
			if(((a == a1) && (a != -1)) || this.tileId(x, y, z) == startTileId) {this.setTileId(x, y, zEnd, tileId, true, false)};
		}	
	}
};

// New method
Game_Map.prototype.swapTileIdByAreaRegion = function(x1, y1, x2, y2, regionId, startTileId, tileId, z, zEnd) {
	var a1 = (startTileId >= 2048 ? Math.floor((startTileId - 2048) / 48) : -1);
	for(var y = y1; y <= y2; y++) {
		for(var x = x1; x <= x2; x++) {
			var a = this.autotileType(x, y, z);
			if(this.regionId(x, y) == regionId && (((a == a1) && (a != -1)) || this.tileId(x, y, z) == startTileId)) {this.setTileId(x, y, zEnd, tileId, true, false)};
		}	
	}
};

// New method
Game_Map.prototype.spreadTileId = function(x1, y1, tileId, z) {
	var d = 0; //Additional distance to spread from the origin, in tiles. (Where x1,y1 is the origin.) If spread has already occured, then proceeds further.
	var a1 = this.autotileTypeById(tileId);
	for(var i = 0; i <= d; i++) {
		var matchCount = 0;
		var x = x1;
		var y = y1;
		var a = this.autotileType(x, y, z);
		if(((a == a1) && (a != -1)) || this.tileId(x, y, z) == tileId) {
			matchCount += 1;
		}
		if(matchCount <= 0 || matchCount < i*4) {
			this.setTileId(x, y, z, tileId, true, false);
		}
	}
};

// New method
Game_Map.prototype.fillTileId = function(x1, y1, tileId, startTileId, distance, z) {
	if(z == null) {z = 0;};
	if(distance == null) {distance = 10000};
	if(startTileId == null) {startTileId = this.tileId(x1, y1, z);}; //If no startTileId provided, then use whatever tile is currently found at location (x1,y1,z).
	var tiles = this.detectFill(x1, y1, startTileId, distance, z);
	this.setTileIdByArray(tiles, tileId, z);
	var text = tiles.length == 1 ? "Tile" : "Tiles";
	var tileCode = this.tileCodeFromId(tileId);
	// console.log("Filled", tiles.length , text, "with TileCode", tileCode, tiles);
};

// New method
// Set all tiles found in an array to a certain tildId.
Game_Map.prototype.setTileIdByArray = function(tiles, tileId, z) {
	if(z == null) {z = 0;};
	for(var i = 0; i < tiles.length; i++) {
		this.setTileId(tiles[i].x, tiles[i].y, z, tileId, true, false);
	};
};

// New method
Game_Map.prototype.detectFill = function(x1, y1, tileId, distance, z) {
	if(z == null) {z = 0;};
	if(distance == null) {distance = 10000};
	var d = distance; //Total distance to detect spread.
	var tiles = [];
	var tile = this.detectTileMatch(x1, y1, tileId, z);
	// console.log("Detected Origin Tile:", tile);
	if(tile != null) {tiles.push(tile)};
	var scanTiles = tiles;
	for(var i = 0; i < d; i++) {
		var nextTiles = [];
		var spliceTiles = [];
		for(var t = 0; t < scanTiles.length; t++) {
			var tile = scanTiles[t];
			var ringTiles = this.detectFillNeighbors(tile.x, tile.y, tileId, z);
			var validRingTiles = [];
			for(var r = 0; r < ringTiles.length; r++) {
				var sameTile = false;
				for(var t2 = 0; t2 < tiles.length; t2++) {
					if(ringTiles[r].x == tiles[t2].x && ringTiles[r].y == tiles[t2].y) {
						sameTile = true;
					}
				};
				for(var n = 0; n < nextTiles.length; n++) {
					if(ringTiles[r].x == nextTiles[n].x && ringTiles[r].y == nextTiles[n].y) {
						sameTile = true;
					}
				};
				if(sameTile == false) {
					validRingTiles.push(ringTiles[r]);
				};
			};
			nextTiles = [].concat(nextTiles, validRingTiles);
			if(validRingTiles.length <= 0) {spliceTiles.push(tile);};
		};
		if(nextTiles.length <= 0) break; //If we didn't find any additional tiles, then we can break the for loop, because additional distance will not yield any more tiles.
		tiles = [].concat(tiles, nextTiles);
		scanTiles = [].concat(scanTiles, nextTiles);
		for(var t = 0; t < spliceTiles.length; t++) {
			scanTiles.splice(scanTiles.indexOf(spliceTiles[t]), 1);
		};
	};
	/*
	var text = tiles.length == 1 ? "Tile" : "Tiles";
	var tileCode = this.tileCodeFromId(tileId);
	console.log("Detected", tiles.length , text, "with TileCode", tileCode, tiles);
	*/
	return tiles;
};

// New method.
Game_Map.prototype.detectTileMatch = function(x, y, tileId, z) {
	var tile;
	var a1 = this.autotileTypeById(tileId);
	var a = this.autotileType(x, y, z);
	if(((a == a1) && (a != -1)) || this.tileId(x, y, z) == tileId) { //Match is present.
		tile = {x:x, y:y};
	}
	return tile;
};

// New method.
Game_Map.prototype.detectFillNeighbors = function(x1, y1, tileId, z) {
	var tiles = [];
	for(var i = 0; i <= 3; i++) {
		var x2 = x1 + (i == 0 ? 1 : 0) + (i == 1 ? -1 : 0);
		var y2 = y1 + (i == 2 ? 1 : 0) + (i == 3 ? -1 : 0);
		if(x2 < 0 || x2 > $gameMap.width() || y2 < 0 || y2 > $gameMap.height) {continue;}; //Do not detect non-existant tiles that are outside the boundaries of the map.
		var tile = this.detectTileMatch(x2, y2, tileId, z);
		if(tile != null) {tiles.push(tile)};
	}
	return tiles;
};

// New method
Game_Map.prototype.fillInnerBorder = function(x1, y1, tileId, startTileId, z) {
	if(z == null) {z = 0;};
	if(startTileId == null) {startTileId = this.tileId(x1, y1, z);}; //If no startTileId provided, then use whatever tile is currently found at location (x1,y1,z).
	var distance = null;
	var detectFill = this.detectFill(x1, y1, startTileId, distance, z);
	var borderTiles = this.detectBorderTiles(detectFill); //Inner border (shrink).
	this.setTileIdByArray(borderTiles, tileId, z);
};
	
// New method
Game_Map.prototype.fillOuterBorder = function(x1, y1, tileId, startTileId, z) {
	if(z == null) {z = 0;};
	if(startTileId == null) {startTileId = this.tileId(x1, y1, z);}; //If no startTileId provided, then use whatever tile is currently found at location (x1,y1,z).
	var distance = null;
	var detectFill = this.detectFill(x1, y1, startTileId, distance, z);
	var neighborTiles = this.detectNeighborTiles(detectFill); //Outer border (grow/spread).
	this.setTileIdByArray(neighborTiles, tileId, z);
};

// New method
Game_Map.prototype.fillInnerBorderRegion = function(x1, y1, tileId, region, startTileId, z) {
	if(region == null) {region = this.regionId(x1, y1);};
	if(z == null) {z = 0;};
	if(startTileId == null) {startTileId = this.tileId(x1, y1, z);}; //If no startTileId provided, then use whatever tile is currently found at location (x1,y1,z).
	var distance = null;
	var detectFill = this.detectFill(x1, y1, startTileId, distance, z);
	var borderTiles = this.detectBorderTiles(detectFill); //Inner border (shrink).
	var borderRegionTiles = this.detectRegionTiles(borderTiles, region);
	this.setTileIdByArray(borderRegionTiles, tileId, z);
};

// New method
Game_Map.prototype.fillOuterBorderRegion = function(x1, y1, tileId, region, startTileId, z) {
	if(region == null) {region = this.regionId(x1, y1);};
	if(z == null) {z = 0;};
	if(startTileId == null) {startTileId = this.tileId(x1, y1, z);}; //If no startTileId provided, then use whatever tile is currently found at location (x1,y1,z).
	var distance = null;
	var detectFill = this.detectFill(x1, y1, startTileId, distance, z);
	var neighborTiles = this.detectNeighborTiles(detectFill); //Outer border (grow/spread).
	var neighborRegionTiles = this.detectRegionTiles(neighborTiles, region);
	this.setTileIdByArray(neighborRegionTiles, tileId, z);
};

// New method
// From the array tiles, returns an array containing only tiles found at the borders of the tiles provided, as seen on the map.
Game_Map.prototype.detectBorderTiles = function(tiles) { //From a list of tiles detectFill, find the tiles that border on at least one tile that is not of type tileId.
	var borderTiles = [];
	for(var t = 0; t < tiles.length; t++) {
		var neighbors = 0;
		for(var t2 = 0; t2 < tiles.length; t2++) {
			if(tiles[t].x == tiles[t2].x) {
				if(tiles[t].y + 1 == tiles[t2].y) neighbors += 1;
				if(tiles[t].y - 1 == tiles[t2].y) neighbors += 1;
			} else if(tiles[t].y == tiles[t2].y) {
				if(tiles[t].x + 1 == tiles[t2].x) neighbors += 1;
				if(tiles[t].x - 1 == tiles[t2].x) neighbors += 1;
			};
		};
		if(neighbors < 4) {
			borderTiles.push(tiles[t]);
		};
	};
	return borderTiles;
};

// New method
// From the array tiles, returns an array containing only tiles that are neighbors of the tiles (not including the tiles provided).
Game_Map.prototype.detectNeighborTiles = function(tiles) {
	var neighborTiles = [];
	//Find all the neighborTiles that are adjacent (in cardinal directions) to tiles.
	for(var t = 0; t < tiles.length; t++) {
		// console.log(tiles[t].x, tiles[t].y, tiles[t]);
		for(var i = 0; i <= 3; i++) {
			var x2 = tiles[t].x + (i == 0 ? 1 : 0) + (i == 1 ? -1 : 0);
			var y2 = tiles[t].y + (i == 2 ? 1 : 0) + (i == 3 ? -1 : 0);
			if(x2 < 0 || x2 > $gameMap.width() || y2 < 0 || y2 > $gameMap.height) {continue;}; //Do not detect non-existant tiles that are outside the boundaries of the map.
			var tile = {x:x2, y:y2};
			var withinFill = false;
			for(var t2 = 0; t2 < tiles.length; t2++) {
				if(tile.x == tiles[t2].x && tile.y == tiles[t2].y) {withinFill = true;};
			};
			if(tile != null && withinFill == false) {neighborTiles.push(tile)};
		}
	};
	//console.log("Detected Neighbor Tiles:", neighborTiles);
	return neighborTiles;
};

// New method
// From the array tiles, returns an array containing only the tiles that have a certain region.
Game_Map.prototype.detectRegionTiles = function(tiles, region) {
	var regionTiles = [];
	for(var t = 0; t < tiles.length; t++) {
		if(this.regionId(tiles[t].x, tiles[t].y) == region) {regionTiles.push(tiles[t])};
	};
	//console.log("Detected Region Tiles:", regionTiles);
	return regionTiles;
};

//=============================================================================
// Game_Player
//=============================================================================

// Replacement method
Game_Player.prototype.triggerButtonAction = function() {
    if (Input.isTriggered('ok')) {
		if((Tyruswoo.Param.TileInfoOnButton === 'true') && Input.isPressed('control')) {
			$gameMap.logTileInfo($gamePlayer.x, $gamePlayer.y);
		}
        if (this.getOnOffVehicle()) {
            return true;
        }
        this.checkEventTriggerHere([0]);
        if ($gameMap.setupStartingEvent()) {
            return true;
        }
        this.checkEventTriggerThere([0,1,2]);
        if ($gameMap.setupStartingEvent()) {
            return true;
        }
		if(Tyruswoo.Param.OkButtonCommonEvent > 0) {
			$gameTemp.reserveCommonEvent(Tyruswoo.Param.OkButtonCommonEvent);
		}
    }
    return false;
};

// Alias method
Tyruswoo.TileControl.Game_Player_executeMove = Game_Player.prototype.executeMove;
Game_Player.prototype.executeMove = function(direction) {
	Tyruswoo.TileControl.Game_Player_executeMove.call(this, direction);
	if(Tyruswoo.Param.TileInfoOnMove === 'true') {
		$gameMap.logTileInfo(this.x, this.y);
	}
};

//=============================================================================
// Game_CharacterBase
//=============================================================================

// New method
Game_CharacterBase.prototype.xFront = function() {
    return this.xWithDirection(this.x, this.direction());
};

// New method
Game_CharacterBase.prototype.yFront = function() {
    return this.yWithDirection(this.y, this.direction());
};

// New method
Game_CharacterBase.prototype.xWithDirection = function(x, d) {
    return x + (d === 6 ? 1 : d === 4 ? -1 : 0);
};

// New method
Game_CharacterBase.prototype.yWithDirection = function(y, d) {
    return y + (d === 2 ? 1 : d === 8 ? -1 : 0);
};

//=============================================================================
// rpg_core.js
// Tilemap
//=============================================================================

// Replacement method
Tilemap.prototype.update = function() {
    this.animationCount++;
    this.animationFrame = Math.floor(this.animationCount / Tyruswoo.Param.TileAnimationSpeed);
    this.children.forEach(function(child) {
    	// Thanks to Cris Litvin for helping us find and fix the bug on the line below!
        if (child && child.update) {
            child.update();
        }
    });
    for (var i = 0; i < this.bitmaps.length; i++) {
        if (this.bitmaps[i]) {
            this.bitmaps[i].touch();
        }
    }
	if ($gameMap._needsTilemapRefresh) {
		$gameMap._needsTilemapRefresh = false;
		this.refresh();
	}
};
