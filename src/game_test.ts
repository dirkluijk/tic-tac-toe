import { expect } from "@std/expect";
import { beforeEach, describe, it } from "@std/testing/bdd";
import { fail } from "@std/assert";
import { Game } from "./game.ts";
import type { Cell } from './grid.ts';

describe("Tic-tac-toe", () => {
    let game!: Game;

    beforeEach(() => {
        game = new Game();
    });

    it("should print the initial game status", () => {
        expect(game.printState()).toBe([
            "Player X:",
            "_ | _ | _",
            "_ | _ | _",
            "_ | _ | _",
        ].join("\n"));
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
        expect(game.state.finished).toBe(false);

        let steps = 0;
        await game.untilFinished(() => steps++);

        expect(game.state.finished).toBe(true);
        expect(steps).toBeGreaterThan(0);
        expect(steps).toBeLessThanOrEqual(9);
    });

    it("should end in draw or winning state", async () => {
        await game.untilFinished();

        if (game.state.status === "pending") {
            fail("Should not be pending");
        } else if (game.state.status === "draw") {
            expect(countCells("X")).toBe(5);
            expect(countCells("O")).toBe(4);
            expect(countCells("_")).toBe(0);
            expect(game.printState()).toContain(`draw!`);
        } else if (game.state.status === "win") {
            if (game.state.winningPlayer === "X") {
                expect(countCells("X")).toBeGreaterThan(countCells("O"));
            } else {
                expect(countCells("O")).toBeGreaterThanOrEqual(countCells("X"));
            }
            expect(game.printState()).toContain(
                `${game.state.winningPlayer} won!`,
            );
        }
    });

    function countCells(cell: Cell) {
        return game.grid.flat().filter(it => it === cell).length;
    }
});
