import { Cell, Draw, GameState, Grid, Pending, Player, Won } from "./model.ts";
import { sample } from "@std/collections/sample";
import { delay } from '@std/async';

const DRAW: Draw = { status: "draw", end: true };

const won = (winningPlayer: Player): Won => ({
    status: "won",
    end: true,
    winningPlayer,
});

const pending = (currentPlayer: Player): Pending => ({
    status: "pending",
    end: false,
    currentPlayer,
});

export class Game {
    public readonly grid: Grid = [
        ["_", "_", "_"],
        ["_", "_", "_"],
        ["_", "_", "_"],
    ];

    private state: GameState = pending("X");

    public printStatus(): string {
        return [
            this.state.status === "pending"
                ? `Player ${this.state.currentPlayer.toUpperCase()}:`
                : "",
            this.grid.map((row) => row.join(" | ")).join("\n"),
        ].join("\n");
    }

    public progress(): void {
        if (this.state.status !== "pending") return;

        const cellAvailable = (cell: Cell) => cell === "_";
        const toIndex = (_: unknown, index: number) => index;

        const rowToPick = sample(
            this.grid
                .filter((it) => it.some(cellAvailable))
                .map(toIndex),
        )!;

        const cellToPick = sample(
            this.grid[rowToPick]
                .filter(cellAvailable)
                .map(toIndex),
        )!;

        this.grid[rowToPick][cellToPick] = this.state.currentPlayer;

        const nextPlayer: Player = this.state.currentPlayer === "X" ? "O" : "X";
        this.state = pending(nextPlayer);
    }
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
    const game = new Game();

    console.clear();
    console.log(game.printStatus());

    await delay(1_000);

    game.progress();

    console.clear();
    console.log(game.printStatus());
}
