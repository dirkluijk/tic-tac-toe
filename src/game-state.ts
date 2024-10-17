import type { Player } from "./player.ts";

export type GameState = Readonly<Pending | Draw | Won>;

export type Pending = {
    status: "pending";
    finished: false;
    currentPlayer: Player;
};

export type Draw = {
    status: "draw";
    finished: true;
};

export type Won = {
    status: "won";
    finished: true;
    winningPlayer: Player;
};

// factories
export const draw = (): Draw => ({
    status: "draw",
    finished: true,
});

export const won = (winningPlayer: Player): Won => ({
    status: "won",
    finished: true,
    winningPlayer,
});

export const pending = (currentPlayer: Player): Pending => ({
    status: "pending",
    finished: false,
    currentPlayer,
});
