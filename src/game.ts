import { sample } from "@std/collections/sample";
import { delay } from "@std/async";
import { withIndex } from "./utils.ts";
import {
    cellAvailable,
    cellsAvailable,
    type Grid,
    initialGrid,
    nextPlayer,
    playerHasThreeInRow,
} from "./grid.ts";
import { draw, type GameState, pending, win } from "./game-state.ts";

/**
 * A Tic-Tac-Toe game
 */
export class Game {
    /**
     * Represents the grid of the game.
     */
    public readonly grid: Grid = initialGrid();

    private _state: GameState = {
        status: "pending",
        finished: false,
        currentPlayer: "X",
    };

    /**
     * The current state of the game, either pending, a draw or a win.
     */
    public get state(): Readonly<GameState> {
        return this._state;
    }

    /**
     * Advances the game by letting the next player make a turn.
     */
    public progress(): void {
        if (this.state.finished) return;

        // pick a random cell that is available
        const rowIndexToPick = sample(
            this.grid
                .map(withIndex)
                .filter(([row]) => row.some(cellAvailable))
                .map(([_, index]) => index),
        )!;

        const columnIndexToPick = sample(
            this.grid[rowIndexToPick]
                .map(withIndex)
                .filter(([cell]) => cellAvailable(cell))
                .map(([_, index]) => index),
        )!;

        // mark the cell with the current player
        const currentPlayer = this.state.currentPlayer;
        this.grid[rowIndexToPick][columnIndexToPick] = currentPlayer;

        // determine next state
        const currentPlayerWon = playerHasThreeInRow(this.grid, currentPlayer);
        const anyCellsAvailable = cellsAvailable(this.grid);

        if (currentPlayerWon) {
            this._state = win(currentPlayer);
        } else if (!anyCellsAvailable) {
            this._state = draw();
        } else {
            this._state = pending(nextPlayer(currentPlayer));
        }
    }

    /**
     * Loops until the game has been finished.
     * @param onNext An optional callback to run on every step.
     */
    public async untilFinished(
        onNext?: () => Promise<unknown> | unknown,
    ): Promise<void> {
        do {
            if (onNext) await onNext();
            this.progress();
        } while (!this.state.finished);
    }

    /**
     * Iterates until the game has been finished.
     */
    async *[Symbol.asyncIterator](): AsyncGenerator<GameState> {
        this.progress();
        do {
            yield this.state;
            this.progress();
        } while (!this.state.finished);
    }

    /**
     * Prints the current game state.
     */
    public printState(): string {
        const printStatus = () => {
            switch (this.state.status) {
                case "pending":
                    return `Player ${this.state.currentPlayer}:`;
                case "draw":
                    return `It's a draw!`;
                case "win":
                    return `Player ${this.state.winningPlayer} won!`;
            }
        };

        const printCells = () =>
            this.grid.map((row) => row.join(" | ")).join("\n");

        return [printStatus(), printCells()].join("\n");
    }
}

// `deno run game.ts`
if (import.meta.main) {
    const delayBetweenSteps = 800;
    const game = new Game();

    await game.untilFinished(async () => {
        console.clear();
        console.log(game.printState());
        await delay(delayBetweenSteps);
    });

    console.clear();
    console.log(game.printState());
}
