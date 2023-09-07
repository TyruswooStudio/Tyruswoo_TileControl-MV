# Tyruswoo Tile Control for RPG Maker MV

Change tiles dynamically during gameplay!

Great for farming, secret passages, making water or lava flow, mining, enemies that break walls, placing furniture, etc!

## Plugin Commands

All supported plugin commands are listed below.

Most of these commands call for x,y coordinates;
you can use phrases like `x+2` or `y-1` to specify coordinates relative to the active event.
Refer to the Relative Coordinates section of this document for more info.

Most Tile Control commands call for one or more Tile IDs; these can be given as an exact integar,
in the form `Tx,y`, or in the form `Tn`. Read the Tile ID Finding and Tile ID Codes sections of this document for examples and more details.

### `Tile Info` 
Displays the location and ID of the tiles on which
the player currently stands.

### `Tile Refresh`
Forces the tilemap to refresh, which allows correctly
displaying the graphics of the map's tiles. (Note: Tilemap
refresh is automatic whenever a tile is changed.)

### `Tile Set x y z tileId`
Set a tile at coordinates `x`, `y` and layer `z`
to the selected tileId. `z = 0` for lowest layer.

### `Tile Set PlayerLoc z tileId`
Set a tile at the player's coordinates and layer z to the selected tileId.

### `Tile Set PlayerFront z tileId`    
Set the tile towards which player is facing at layer z to selected tileId.

### `Tile Set EventLoc eventID z tileId`
At the location of the event with eventID, set layer z to tileId.

### `Tile SetRegion regionId tileId z`
At all tiles with regionId, set the tile to tileId. z level is optional,
and if not used, defaults to 0.

### `Tile SetArea x1 y1 x2 y2 tileId z`
At all tiles in the area defined by coordinates `x1`,`y1` to `x2`,`y2`,
set the tile to tileId. `z` level is optional, and if not used, defaults to 0.

### `Tile SetAreaRegion x1 y1 x2 y2 regionId tileId z`
### `Tile SetRegionArea regionId x1 y1 x2 y2 tileId z`

The above commands have identical effects of combining the
area and region filters together to only change the `tileId`
of tiles that meet both area and region conditions. The `z`
level is optional, and if not used, defaults to 0.

### `Tile Swap startTileId tileId z zEnd`
At all tiles with tileId `startTileId`, set the tile to `tileId`.
Affects z layer `z`, which may be excluded to default to z layer 0.
`zEnd` is the layer used for setting the new tile,
and is an optional argument that is by default the same as `z`.

### `Tile SwapRegion regionId startTileId tileId z zEnd`
At all tiles with `regionId` and `startTileId`, set the tile to `tileId`.
`z` level is optional, and if not used, defaults to 0.
`zEnd` is the layer used for setting the new tile, and
is an optional argument that is by default the same as `z`.

### `Tile SwapArea x1 y1 x2 y2 startTileId tileId z zEnd`
At all tiles in the area defined by coordinates `x1`,`y1` to `x2`,`y2`,
if the tile matches `startTileId`, then set the tile to `tileId`.
`z` level is optional, and if not used, defaults to 0.
`zEnd` is the layer used for setting the new tile, and is an
optional argument that is by default the same as `z`.

### `Tile SwapAreaRegion x1 y1 x2 y2 regionId startTileId tileId z zEnd`
### `Tile SwapRegionArea regionId x1 y1 x2 y2 startTileId tileId z zEnd`
The above commands have identical effects of combining the area,
region, and tile filters together to only change the
`tileId` of tiles that meet all area, region, and tile swap conditions.
The `z` level is optional, and if not used, defaults to 0.
`zEnd` is the layer used for setting the new tile,
and is an optional argument that is by default the same as `z`.

The SwapAreaRegion (or SwapRegionArea) command is useful if you want to
change all `startTileId` to `tileId` within only a certain area of the map
and certain region of the map. Therefore, three conditions must be met:
startTileId, area, and region. This can be use for fine-tuned control
of making lots of tile changes with only needing a few commands.

### `Tile Fill x y tileId`
### `Tile Fill x y tileId startTileId distance z`
This command originates at coordinates `x`,`y` and sets tiles to `tileId`.
If no `startTileId` is provided, then the tile found at `x`,`y`
will be used to determine the `startTileId`.
Using this command, it is possible to fill tiles, similar to a fill tool.

`startTileId`, `distance`, and `z` are optional arguments.
The `distance` argument determines how many far the fill command will go.
Note that the distance depends on tiles being adjacent.
The `z` argument can be used to determine which z level is used for checking
and setting new tiles.

### `Tile FillInnerBorder x y tileId`
### `Tile FillInnerBorder x y tileId startTileId z`
Finds the tiles that would be filled, but then only fills the
outermost of these tiles.

### `Tile FillOuterBorder x y tileId`
### `Tile FillOuterBorder x y tileId startTileId z`
Finds the tiles that would be filled, but then instead fills one
tile beyond the border.

### `Tile FillInnerBorderRegion x y tileId`
### `Tile FillInnerBorderRegion x y tileId region startTileId z`
Same as `FillInnerBorder`, but instead applies only to border tiles
that have the specified region. (If the optional region argument
is excluded, then region will be assumed to match the region at
location `x`,`y` on the current map.)

### `Tile FillOuterBorderRegion x y tileId`
### `Tile FillOuterBorderRegion x y tileId region startTileId z`
Same as `FillOuterBorder`, but instead modifies only the outer border
tiles that match the specified region. (If the optional region
argument is excluded, then region will be assumed to match the
region at location `x`,`y` on the current map.)

**Tip:** `FillOuterBorderRegion` is especially useful for making flowing
water or lava, or drying up of water or lava.

Note that if the optional argument startTileId is excluded from FillInnerBorder,
FillOuterBorder, FillInnerBorderRegion, or FillOuterBorderRegion, the behavior of
the plugin command may be different. For example, FillOuterBorder will attempt to
fill the outer border of the specified startTileId, using tileId to fill. If
startTileId is not included, it will be assumed to be the same as tileId. So, if
tileId is not the same as the tile at the indicated location, the origin tile in
question will be modified to tileId, without affecting any other tiles.

## Relative Coordinates

When stating `x` and `y` in a plugin command, you can provide
exact integer coordinates, or you can use relative coordinates written in
the form  `x`, `x+Int`, `x-Int`, `y`, `y+Int`, or `y-Int`,
where `x` and `y` represent the current coordinates of the event
running the plugin command; and where `Int` is any integer value.
You can use relative coordinates to more easily specify where tile changes
are to be made, without needing to determine the exact coordinate values!

For example, the following sets tile A3,1 at a location two tiles to
the right, and one tile down, from the event running the plugin command:

`Tile Set x+2 y+1 0 A3,1`

As another example, the following sets tile A3,1 at a location two tiles
to the left, and one tile up, from the event running the plugin command:

`Tile Set x-2 y-1 0 A3,1`

Relative coordinates also work with all other plugin commands, including
Set Area, Swap Area, and all types of Fill commands, including Fill commands.

## Tile ID Finding

A tile's tileId may be identified by opening the console window (using
F12), then by having the party leader stand on the tile of interest, then
holding the Control (Ctrl) key and pressing Enter (Return). (Note that for
this to work, the "Tile Info on Button" option must be true in the Plugin
Manager.)

For example, using the default Overworld tileset, a whirlpool can be placed
using the following plugin command:

`Tile Set PlayerLoc 0 2576`

There is also an easier way to specify the tileId. Rather than using the
tileId itself, a code can be used. The code should begin with the letter of
the tile panel to be used (A, B, C, D, or E). This is followed by the code
number of the desired tile, where the numbers begin at 0 in the upper-left
corner of the tile pane, then proceed to increment by 1 from left to right,
then top to bottom. The pattern of the numbers for each pane A, B, C, D,
and E, matches exactly the numbers shown in the R (region) pane, so the
region pane can be used to determine the code number of any desired tile.

For example, using the default Overworld tileset, a whirlpool can be placed
using this plugin command:

`Tile Set PlayerLoc 0 A11`

Notice in the above, that the whirlpool tile is in the A panel, and it is
tile 11 in the panel.

Another easy way to specify the tileId is using tilemap coordinates; in
other words, the (x,y) position of the desired tile within the tile's
selection panel.

For example, using the default Overworld tileset, a whirlpool can be placed
using this plugin command:

`Tile Set PlayerLoc 0 A3,1`

## Tile ID Codes

There are two types of tile ID codes. You can use either of these codes
instead of the tileId.

### `Tx,y`
Where `T` is the tab, `x` is the x position in the tab's tileset,
and `y` is the y position in the tab's tileset.
Also known as "Letter X comma Y" or "Tab X comma Y".

This tile code is determined by the Tab (A, B, C, D, or E)
and the (x,y) position of the desired tile within the
tilset.

Examples:
- In tab A, the top left tile is A0,0 (which in the Overworld tileset is ocean).
- In the default Overworld tileset, use tile code A3,1 for a whirlpool.
- In the default Overworld tileset, use tile code B2,1 for a pyramid.

You can use tile code B0,0 to erase any tile.
             
The Tx,y tile ID code assumes that you have a full tileset in Tab A.
This includes A1, A2, A3, A4, and A5. If a plugin command calls for a Tile ID
belonging to an absent tile sheet, the console will log a warning,
and the tile will not be placed. If you do not have a full tileset in Tab A,
refer to the table below for the first Y value of each A tilesheet:
             
| Tilesheet | First Y value |
|-----------|---------------|
|        A1 |  0            |
|        A2 |  2            |
|        A3 |  6            |
|        A4 | 10            |
|        A5 | 16            |

Tabs B, C, D, and E (if present) have a single tilesheet each,
so finding their x,y coordinates is straightforward.

### Tn        

Where `T` is the tab, and `n` is the number of the tile when
counting tiles from left to right, starting with zero.
Also known as "Letter Number" or "Tab Number".

Tip: This numbering scheme is the same as how regions are
numbered and displayed in the regions (R) tab, so you can
use the regions tab to help with counting tiles.

Examples:
- In tab A, the first tile is A0 (which in the Overworld tileset is ocean).
- In the default Overworld tileset, use tile code A11 for a whirlpool.
- In the default Overworld tileset, use tile code B10 for a pyramid.

You can use tile code B0 to erase any tile.

The `Tn` tile ID code assumes that you have a full
tileset in Tab A. This includes A1, A2, A3, A4, and A5. If you
do not have a full tileset in Tab A, refer to the tile code
cheat sheet below:

| Tilesheet | 1st Code |
|-----------|----------|
|        A1 |  0       |
|        A2 | 16       |
|        A3 | 48       |
|        A4 | 80       |
|        A5 | 128      |

By default, above the selected z layer, all z layers are erased when the
tile is set. This is similar to how RPG Maker MV works in the map editor.
If you want to set a single z layer without modifying any upper z layers,
use "Tile SetLayer" instead of "Tile Set".

By default, autotiles are detected, so if Tile Set is used to set an
autotile, then nearby autotiles will be detected, and they will be linked
together. If you want to prevent autotiling, and just set the tile exactly,
then use "Tile SetExact" instead of "Tile Set". This is similar to using a
Ctrl+RightClick to copy a tile exactly in the map editor.

It is possible to combine "Tile SetLayer" and "Tile SetExact". So, you can
use "Tile SetLayerExact" (or synonymously, "Tile SetExactLayer"). Using
"Tile SetLayerExact" will result in the z layer of the tile being modified,
without changing the above z layers of the tile, and without affecting
any nearby autotiling.

## Version History

**v2.1** - May 7, 2020
- New plugin commands: `Tile SetRegion`, `Tile SetArea`, `Tile Swap`,
  and other commands that combine these features.

**v3.0** - May 21, 2020
- Added `Tile Fill` command!

**v3.1** - July 12, 2020
- Enabled providing relative coordinates in all commands.
- Added border fill commands.

**v4.0** - November 8, 2021:
- Fixed bug that was keeping A5 tiles from being placed properly when
  written in the form `Ax,y`
- Fixed crash on plugin command calling for a Tile ID from an absent
  tile sheet. Now a warning is logged instead.
- Fixed bug that kept the map from loading properly in some projects.
Thanks to Cris Litvin for reporting this issue and helping us debug!

**v4.0.1** - September 4, 2023:
- This plugin is now free and open source under the MIT license.
