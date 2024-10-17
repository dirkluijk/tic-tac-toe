import { sample } from "@std/collections/sample";
import { delay } from "@std/async";
import { withIndex } from "./utils.ts";
import {
    cellsAvailable,
    Grid,
    initialGrid,
    playerHasThreeInRow,
} from "./grid.ts";
import { draw, GameState, pending, won } from "./game-state.ts";
import { cellAvailable } from "./cell.ts";
import { nextPlayer } from "./player.ts";
import { printGame } from './print.ts';

export class Game {
    public readonly grid: Grid = initialGrid();

    private _state: GameState = {
        status: "pending",
        finished: false,
        currentPlayer: "X",
    };

    public get state(): GameState {
        return this._state;
    }

    private set state(newState: GameState) {
        this._state = newState;
    }

    public progress(): void {
        if (this.state.status !== "pending") return;

        const currentPlayer = this.state.currentPlayer;

        const rowIndexToPick = sample(
            this.grid
                .map(withIndex)
                .filter(([row]) => row.some(cellAvailable))
                .map(([_, index]) => index),
        )!;

        const cellIndexToPick = sample(
            this.grid[rowIndexToPick]
                .map(withIndex)
                .filter(([cell]) => cellAvailable(cell))
                .map(([_, index]) => index),
        )!;

        // mark the cell
        this.grid[rowIndexToPick][cellIndexToPick] = currentPlayer;

        const anyCellsAvailable = cellsAvailable(this.grid);
        const playerWon = playerHasThreeInRow(this.grid, currentPlayer);

        if (playerWon) {
            this.state = won(currentPlayer);
        } else if (anyCellsAvailable) {
            this.state = pending(nextPlayer(currentPlayer));
        } else {
            this.state = draw();
        }
    }

    public async untilFinished(
        onNext?: () => Promise<unknown> | unknown,
    ): Promise<void> {
        do {
            if (onNext) await onNext();
            this.progress();
        } while (!this.state.finished);
    }
}

// `deno run game.ts`
if (import.meta.main) {
    const delayBetweenSteps = 800;
    const game = new Game();

    await game.untilFinished(async () => {
        console.clear();
        console.log(printGame(game));
        await delay(delayBetweenSteps);
    });

    console.clear();
    console.log(printGame(game));
}
