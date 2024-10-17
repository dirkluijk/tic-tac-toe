export type Player = "X" | "O";
export type Cell = "_" | Player;

export type Grid = [
    [Cell, Cell, Cell],
    [Cell, Cell, Cell],
    [Cell, Cell, Cell],
];

export const initialGrid = (): Grid => [
    ["_", "_", "_"],
    ["_", "_", "_"],
    ["_", "_", "_"],
];

export const cellAvailable = (cell: Cell) => cell === "_";
export const cellsAvailable = (grid: Grid) => grid.flat().some(cellAvailable);

export const nextPlayer = (currentPlayer: Player): Player => currentPlayer === "X" ? "O" : "X";

export const playerHasThreeInRow = (grid: Grid, player: Player) => {
    const allMatchPlayer = (...cells: Cell[]) =>
        cells.every((it) => it === player);

    return (
        // horizontal
        allMatchPlayer(grid[0][0], grid[0][1], grid[0][2]) ||
        allMatchPlayer(grid[1][0], grid[1][1], grid[1][2]) ||
        allMatchPlayer(grid[2][0], grid[2][1], grid[2][2]) ||
        // vertical
        allMatchPlayer(grid[0][0], grid[1][0], grid[2][0]) ||
        allMatchPlayer(grid[0][1], grid[1][1], grid[2][1]) ||
        allMatchPlayer(grid[0][2], grid[1][2], grid[2][2]) ||
        // diagonal
        allMatchPlayer(grid[0][0], grid[1][1], grid[2][2]) ||
        allMatchPlayer(grid[0][2], grid[1][1], grid[2][0])
    );
};
