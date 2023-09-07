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
 * @plugindesc v2.0.1  Allows greater control of tiles and tilesets.
 * @author Tyruswoo
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
 * Tile Control
 * by Tyruswoo
 *
 * Last Update: April 19, 2020
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
 * ===========================================================================
 * A tile's tileId may be identified by opening the console window (using
 * F12), then by having the party leader stand on the tile of interest, then
 * holding the Control (Ctrl) key and pressing Enter (Return).
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
 * 
 */
 
Tyruswoo.Parameters = PluginManager.parameters('Tyruswoo_TileControl');
Tyruswoo.Param = Tyruswoo.Param || {};

Tyruswoo.Param.TileInfoOnButton = String(Tyruswoo.Parameters['Tile Info on Button']);
Tyruswoo.Param.TileInfoOnMove = String(Tyruswoo.Parameters['Tile Info on Move']);
Tyruswoo.Param.TileAnimationSpeed = String(Tyruswoo.Parameters['Tile Animation Speed']);
Tyruswoo.Param.OkButtonCommonEvent = String(Tyruswoo.Parameters['Button Common Event']);

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
					//	console.log("Tile Set PlayerLoc z =", z, "to tileId", tileId);
						break;
					case 'playerfront':
						x = $gamePlayer.x;
						y = $gamePlayer.y;
						var d = $gamePlayer.direction();
						x = $gameMap.xWithDirection(x, d);
						y = $gameMap.yWithDirection(y, d);
						z = args[2];
						tileId = this.readTileCode(args[3]);
					//	console.log("Tile Set PlayerFront z =", z, "to tileId", tileId);
						break;
					case 'eventloc':
						var e = $gameMap.event(args[2]);
						x = e.x;
						y = e.y;
						z = args[3];
						tileId = this.readTileCode(args[4]);
					//	console.log("Tile Set EventLoc at event =", e._eventId, "z =", z, "to tileId", tileId);
						break;
					default:
						x = args[1];
						y = args[2];
						z = args[3];
						tileId = this.readTileCode(args[4]);
					//	console.log("Tile Set", x, y, z, "to tileId", tileId);
				}
				$gameMap.setTileId(x, y, z, tileId, clearUpperLayers, exact);
				break;
		}
	}
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
	} else {
		codeNumber = parseInt(arg.substr(1));
	}
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
	
//=============================================================================
// Game_Map
//=============================================================================

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
	var index = (z * $dataMap.height + y) * $dataMap.width + x;
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
// rpg_core.js
// Tilemap
//=============================================================================

// Replacement method
Tilemap.prototype.update = function() {
    this.animationCount++;
    this.animationFrame = Math.floor(this.animationCount / Tyruswoo.Param.TileAnimationSpeed);
    this.children.forEach(function(child) {
        if (child.update) {
            child.update();
        }
    });
    for (var i=0; i<this.bitmaps.length;i++) {
        if (this.bitmaps[i]) {
            this.bitmaps[i].touch();
        }
    };
	if($gameMap._needsTilemapRefresh == true) {
		$gameMap._needsTilemapRefresh = false;
		this.refresh();
	};
};