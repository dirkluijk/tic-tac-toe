import { sample } from "@std/collections/sample";
import { delay } from "@std/async";
import { withIndex } from "./utils.ts";
import { Grid, initialGrid } from "./grid.ts";
import { draw, GameState, pending } from "./game-state.ts";
import { cellAvailable } from "./cell.ts";

export class Game {
    public readonly grid: Grid = initialGrid();

    private state: GameState = {
        status: "pending",
        finished: false,
        currentPlayer: "X",
    };

    public get finished(): boolean {
        return this.state.finished;
    }

    public printGrid(): string {
        return [
            !this.state.finished ? `Player ${this.state.currentPlayer}:` : "",
            this.grid.map((row) => row.join(" | ")).join("\n"),
        ].join("\n");
    }

    public progress(): void {
        if (this.state.status !== "pending") return;

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

        this.grid[rowIndexToPick][cellIndexToPick] = this.state.currentPlayer;
        const anyCellsAvailable = this.grid.flat().some(cellAvailable);

        if (anyCellsAvailable) {
            const nextPlayer = this.state.currentPlayer === "X" ? "O" : "X";
            this.state = pending(nextPlayer);
        } else {
            this.state = draw();
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

function repaint(game: Game) {
  console.clear();
  console.log(game.printGrid());
}

// `deno run game.ts`
if (import.meta.main) {
    const delayBetweenSteps = 1_500;
    const game = new Game();

    await loopUntilFinished(game, async () => {
        repaint(game);
        await delay(delayBetweenSteps);
    });

    repaint(game);
}
