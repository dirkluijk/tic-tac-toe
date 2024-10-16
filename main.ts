import { GameState, Grid, Pending, Player } from "./model.ts";

const pending = (nextPlayer: Player): Pending => ({
    status: "pending",
    end: false,
    nextPlayer,
});

export class Game {
    public readonly grid: Grid = [
        ["_", "_", "_"],
        ["_", "_", "_"],
        ["_", "_", "_"],
    ];

    private readonly state: GameState = pending("X");

    public printStatus(): string {
        return [
           this.state.status === 'pending' ? `Player ${this.state.nextPlayer.toUpperCase()}:` : '',
           this.grid.map(row => row.join(' | ')).join('\n')
        ].join('\n');
    }
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
    const game = new Game();

    console.log(game.printStatus());
}
