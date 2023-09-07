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
 * @plugindesc v1.0.1  Allows greater control of tiles and tilesets.
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
 * Last Update: 14 Jun. 2016
 * ===========================================================================
 * Plugin Commands:
 *
 * Tile Info       Displays the location and ID of the tiles on which
 *                 the player currently stands.
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
 * Tile Refresh    This is an advanced legacy command that you probably won't
 *                 need. Forces the tilemap to refresh, which allows correctly
 *                 displaying the graphics of the map's tiles as soon as
 *                 changes are made.  In other words, this allows the
 *                 map's tiles to refresh faster than the Tile Animation
 *                 Speed. Note that by default, this occurs automatically after
 *                 every "Tile Set" command, so you don't need to call it.
 *                 It is here in case for any reason you need it.
 *                 Use the "Tile Refresh" plugin command at the
 *                 end of any event that alters tiles, to allow prompt
 *                 updating of the graphics.
 * ===========================================================================
 *
 * Note:  Tile smoothing does not currently account for diagonal autotiles.
 * 
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
 */
 
Tyruswoo.Parameters = PluginManager.parameters('Tyruswoo_TileControl');
Tyruswoo.Param = Tyruswoo.Param || {};

Tyruswoo.Param.TileInfoOnButton = String(Tyruswoo.Parameters['Tile Info on Button']);
Tyruswoo.Param.TileInfoOnMove = String(Tyruswoo.Parameters['Tile Info on Move']);
Tyruswoo.Param.TileAnimationSpeed = String(Tyruswoo.Parameters['Tile Animation Speed']);
Tyruswoo.Param.OkButtonCommonEvent = String(Tyruswoo.Parameters['Button Common Event']);

//=============================================================================
// Tile data persistence
// By McKathlin
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
// Game_Interpreter - plugin commands
// By Tyruswoo
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
			case 'setlayer':
				var clearUpperLayers = (subCommand != 'setlayer');
				var x, y, z, tileId;
				switch(args[1]) {
					case 'playerloc':
						x = $gamePlayer.x;
						y = $gamePlayer.y;
						z = args[2];
						tileId = args[3];
					//	console.log("Tile Set PlayerLoc z =", z, "to tileId", tileId);
						break;
					case 'playerfront':
						x = $gamePlayer.x;
						y = $gamePlayer.y;
						var d = $gamePlayer.direction();
						x = $gameMap.xWithDirection(x, d);
						y = $gameMap.yWithDirection(y, d);
						z = args[2];
						tileId = args[3];
					//	console.log("Tile Set PlayerFront z =", z, "to tileId", tileId);
						break;
					case 'eventloc':
						var e = $gameMap.event(args[2]);
						x = e.x;
						y = e.y;
						z = args[3];
						tileId = args[4];
					//	console.log("Tile Set EventLoc at event =", e._eventId, "z =", z, "to tileId", tileId);
						break;
					default:
						x = args[1];
						y = args[2];
						z = args[3];
						tileId = args[4];
					//	console.log("Tile Set", x, y, z, "to tileId", tileId);
				}
				$gameMap.setTileId(x, y, z, tileId, clearUpperLayers);
				break;
		}
	}
};
	
//=============================================================================
// Game_Map - Tile data setting
//=============================================================================

// Alias method
Tyruswoo.TileControl.Game_Map_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function(mapId) {
	Tyruswoo.TileControl.Game_Map_initialize.call(this, mapId);
    this._needsTilemapRefresh = false;
    this._tileChanges = {};
};

// Alias method
Tyruswoo.TileControl.Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	Tyruswoo.TileControl.Game_Map_setup.call(this, mapId);
	this._tileChanges = this.getTileChangeData(mapId);
}

// New method
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
	console.log("Info: Tile", x, y, 0, "tileId", tileId, "Autotile Type", a);
	for(z = 1; z <= 3; z++) {
		tileId = this.tileId(x, y, z);
		a = this.autotileType(x, y, z);
		console.log("      Tile", x, y, z, "tileId", tileId, "Autotile Type", a);
	}
	var r = this.regionId(x, y);
	var t = this.terrainTag(x, y);
	console.log("      Tile Region:", r);
	console.log("      Terrain Tag:", r);
}

// New method
Game_Map.prototype.setTileId = function(x, y, z, tileId, clearUpperLayers) {
	var x = Math.round(x);
	var y = Math.round(y);
	if (clearUpperLayers) {
		for (var zz = z + 1; zz <= 3; zz++) {
			this.setExactTileId(x, y, zz, 0);
		}
	}
	var a = this.autotileTypeById(tileId);
	if(a != -1 && a != 9) {
		tileId = this.autotileLink(x, y, z, a);
	}
	this.setExactTileId(x, y, z, tileId);
	if(a != -1 && a != 9) {
		this.autotileNeighbor(x, y - 1, z);
		this.autotileNeighbor(x + 1, y, z);
		this.autotileNeighbor(x, y + 1, z);
		this.autotileNeighbor(x - 1, y, z);	
	}
	$gameMap._needsTilemapRefresh = true; //Every time a tile ID is set, refresh.
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
}

// New method
Game_Map.prototype.autotileNeighbor = function(x, y, z) {
	var a = this.autotileType(x, y, z);
	if (a == -1) {
		return;
	}
	tileId = this.autotileLink(x, y, z, a);
	this.setExactTileId(x, y, z, tileId);
};

// New method
Game_Map.prototype.autotileLink = function(x, y, z, a) {
	var tileId = a * 48 + 2048;
	var n = false;
	var e = false;
	var s = false;
	var w = false;
	var a_n0 = this.autotileType(x, y - 1, 0);
	var a_e0 = this.autotileType(x + 1, y, 0);
	var a_s0 = this.autotileType(x, y + 1, 0);
	var a_w0 = this.autotileType(x - 1, y, 0);
	var a_n1 = this.autotileType(x, y - 1, 1);
	var a_e1 = this.autotileType(x + 1, y, 1);
	var a_s1 = this.autotileType(x, y + 1, 1);
	var a_w1 = this.autotileType(x - 1, y, 1);
	switch(a) {  //We make a values the same for a few values.
		case 0:
		case 1:
		case 9:
		case 10:
			a = 0;
			break;
	}
	switch(a_n0) {  //We make a_n0 values the same for a few values.
		case 0:
		case 1:
		case 9:
		case 10:
			a_n0 = 0;
			break;
	}
	switch(a_e0) {
		case 0:
		case 1:
		case 9:
		case 10:
			a_e0 = 0;
			break;
	}
	switch(a_s0) {
		case 0:
		case 1:
		case 9:
		case 10:
			a_s0 = 0;
			break;
	}
	switch(a_w0) {
		case 0:
		case 1:
		case 9:
		case 10:
			a_w0 = 0;
			break;
	}
	switch(a_n1) {  //We make a_n values the same for a few values.
		case 0:
		case 1:
		case 9:
		case 10:
			a_n1 = 0;
			break;
	}
	switch(a_e1) {
		case 0:
		case 1:
		case 9:
		case 10:
			a_e1 = 0;
			break;
	}
	switch(a_s1) {
		case 0:
		case 1:
		case 9:
		case 10:
			a_s1 = 0;
			break;
	}
	switch(a_w1) {
		case 0:
		case 1:
		case 9:
		case 10:
			a_w1 = 0;
			break;
	}
	if(a_n1 == a || a_n0 == a) {n = true;};
	if(a_e1 == a || a_e0 == a) {e = true;};
	if(a_s1 == a || a_s0 == a) {s = true;};
	if(a_w1 == a || a_w0 == a) {w = true;};
	tileId = this.autotileSmooth(tileId, n, e, s, w);
	return tileId;
};

// New method.
// Note: Tile smoothing does not currently account for diagnoal autotiles.
Game_Map.prototype.autotileSmooth = function(tileId, n, e, s, w) {
	if(n == true) {
		if(e == true) {
			if(s == true) {
				if(w == true) {
					tileId += 0;
				} else {
					tileId += 16;
				}
			} else {
				if(w == true) {
					tileId += 28;
				} else {
					tileId += 40;
				}
			}
		} else {
			if(s == true) {
				if(w == true) {
					tileId += 24;
				} else {
					tileId += 32;
				}
			} else {
				if(w == true) {
					tileId += 38;
				} else {
					tileId += 44;
				}
			}
		}
	} else {
		if(e == true) {
			if(s == true) {
				if(w == true) {
					tileId += 20;
				} else {
					tileId += 34;
				}
			} else {
				if(w == true) {
					tileId += 33;
				} else {
					tileId += 43;
				}
			}
		} else {
			if(s == true) {
				if(w == true) {
					tileId += 36;
				} else {
					tileId += 42;
				}
			} else {
				if(w == true) {
					tileId += 45;
				} else {
					tileId += 46;
				}
			}
		}
	}
	return tileId;
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