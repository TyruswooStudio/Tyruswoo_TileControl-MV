## WARNING: This is an older version!
It lacks the features and improvements of this plugin's later versions.
To get the latest version for free, visit
[Tyruswoo.com](https://www.tyruswoo.com).

# Tyruswoo Tile Control v1.0.1 for RPG Maker MV

Change tiles dynamically during gameplay!

## Plugin Commands

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

## Version History

**v1.0** - December 10, 2019
- Original release: Tile Control released for RPG Maker MV!

**v1.0.1** - September 6, 2023:
- This older plugin version is now free and open source under the MIT license.
