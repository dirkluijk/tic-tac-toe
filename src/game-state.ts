import type { Player } from './grid.ts';

export type GameState = Pending | Draw | Win;

export type Pending = {
    status: "pending";
    finished: false;
    currentPlayer: Player;
};

export type Draw = {
    status: "draw";
    finished: true;
};

export type Win = {
    status: "win";
    finished: true;
    winningPlayer: Player;
};

// factories
export const draw = (): Draw => ({
    status: "draw",
    finished: true,
});

export const win = (winningPlayer: Player): Win => ({
    status: "win",
    finished: true,
    winningPlayer,
});

export const pending = (currentPlayer: Player): Pending => ({
    status: "pending",
    finished: false,
    currentPlayer,
});
