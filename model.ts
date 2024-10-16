export type Player = "X" | "O";
export type Field = "X" | "O" | "_";

export type Grid = [
    [Field, Field, Field],
    [Field, Field, Field],
    [Field, Field, Field],
];

export type GameState = Pending | Draw | Won;

export type Pending = { status: "pending"; end: false; nextPlayer: Player };
export type Draw = { status: "draw"; end: true };
export type Won = { status: "won"; end: true; winningPlayer: Player };
