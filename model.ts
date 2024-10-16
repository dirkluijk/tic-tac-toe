export type Player = "X" | "O";
export type Cell = "X" | "O" | "_";

export type Grid = [
    [Cell, Cell, Cell],
    [Cell, Cell, Cell],
    [Cell, Cell, Cell],
];

export type GameState = Pending | Draw | Won;

export type Pending = { status: "pending"; end: false; currentPlayer: Player };
export type Draw = { status: "draw"; end: true };
export type Won = { status: "won"; end: true; winningPlayer: Player };
