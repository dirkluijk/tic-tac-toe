import type { Game } from './game.ts';

export function printGame(game: Game): string {
    const printStatus = () => {
        switch (game.state.status) {
            case "pending":
                return `Player ${game.state.currentPlayer}:`;
            case "draw":
                return `It's a draw!`;
            case "won":
                return `Player ${game.state.winningPlayer} won!`;
        }
    };

    const printCells = () =>
        game.grid.map((row) => row.join(" | ")).join("\n");

    return [printStatus(), printCells()].join("\n");
}
