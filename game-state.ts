import { Player } from "./player.ts";

export type GameState = Pending | Draw | Won;

export type Pending = { status: "pending"; end: false; currentPlayer: Player };
export type Draw = { status: "draw"; end: true };
export type Won = { status: "won"; end: true; winningPlayer: Player };

export const DRAW: Draw = { status: "draw", end: true };

export function won(winningPlayer: Player): Won {
    return {
        status: "won",
        end: true,
        winningPlayer,
    };
}

export function pending(currentPlayer: Player): Pending {
    return {
        status: "pending",
        end: false,
        currentPlayer,
    };
}
