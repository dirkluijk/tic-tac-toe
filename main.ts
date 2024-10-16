import { Cell, Draw, GameState, Grid, Pending, Player, Won } from "./model.ts";
import { sample } from "@std/collections/sample";
import { delay } from "@std/async";

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

    public get finished(): boolean {
        return this.state.end;
    }

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

        const withIndex = <T>(
            elem: T,
            index: number,
        ): [T, number] => [elem, index];
        const cellAvailable = (cell: Cell) => cell === "_";

        const rowToPick = sample(
            this.grid
                .map(withIndex)
                .filter(([row]) => row.some(cellAvailable))
                .map(([_, index]) => index),
        )!;

        const cellToPick = sample(
            this.grid[rowToPick]
                .map(withIndex)
                .filter(([cell]) => cellAvailable(cell))
                .map(([_, index]) => index),
        )!;

        this.grid[rowToPick][cellToPick] = this.state.currentPlayer;

        const anyCellsAvailable = this.grid.flat().some((cell) => cell === "_");

        if (anyCellsAvailable) {
            const nextPlayer = this.state.currentPlayer === "X" ? "O" : "X";
            this.state = pending(nextPlayer);
        } else {
            this.state = DRAW;
        }
    }
}

export async function loopUntilFinished(
    game: Game,
    onNext: () => Promise<void> | void,
): Promise<void> {
    do {
        await onNext();
        game.progress();
    } while (!game.finished);
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
    const delayBetweenSteps = 1_500;
    const game = new Game();

    await loopUntilFinished(game, async () => {
        console.clear();
        console.log(game.printStatus());
        await delay(delayBetweenSteps);
    });

    console.clear();
    console.log(game.printStatus());
}
