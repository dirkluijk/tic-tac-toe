import { expect } from "@std/expect";
import { beforeEach, describe, it } from "@std/testing/bdd";
import { Game, loopUntilFinished } from "./game.ts";
import { trimMargin } from './utils.ts';
import { Cell } from './cell.ts';

describe("Tic-tac-toe", () => {
    let game!: Game;

    beforeEach(() => {
        game = new Game();
    });

    it("should print the initial game status", () => {
        expect(game.printGrid()).toBe(trimMargin(`
            #Player X:
            #_ | _ | _ 
            #_ | _ | _ 
            #_ | _ | _ 
        `));
    });

    it("should progress to the next state", () => {
        expect(countCells("X")).toBe(0);
        expect(countCells("O")).toBe(0);
        expect(countCells("_")).toBe(9);

        game.progress();

        expect(countCells("X")).toBe(1);
        expect(countCells("O")).toBe(0);
        expect(countCells("_")).toBe(8);

        game.progress();

        expect(countCells("X")).toBe(1);
        expect(countCells("O")).toBe(1);
        expect(countCells("_")).toBe(7);
    });

    it("should loop until game has ended", async () => {
        expect(game.finished).toBe(false);

        let steps = 0;
        await loopUntilFinished(game, () => {
            steps++;
        });

        expect(game.finished).toBe(true);
        expect(steps).toBe(9);

        expect(countCells("X")).toBe(5);
        expect(countCells("O")).toBe(4);
        expect(countCells("_")).toBe(0);
    });

    function countCells(cell: Cell) {
        return game.grid.flat().filter((it) => it === cell).length;
    }
});
