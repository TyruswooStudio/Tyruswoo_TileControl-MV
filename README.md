## WARNING: This is an older version!
It lacks the features and improvements of this plugin's later versions.
To get the latest version for free, visit
[Tyruswoo.com](https://www.tyruswoo.com).

# Tyruswoo Tile Control v2.0.1 for RPG Maker MV

Change tiles dynamically during gameplay!

Great for farming, secret passages, making water or lava flow, mining, enemies that break walls, placing furniture, etc!

## Plugin Commands

All supported plugin commands are listed below.

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

**v1.0** - December 10, 2019
- Original release: Tile Control released for RPG Maker MV!

**v2.0** - April 19, 2020
- Tile ID can now be expressed in form `Tn` or `Tx,y`.
- Fixed autotiling errors.

**v2.0.1** - September 6, 2023:
- This older plugin version is now free and open source under the MIT license.
