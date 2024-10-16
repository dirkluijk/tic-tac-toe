import { expect } from "@std/expect";
import { Game, loopUntilFinished } from "./main.ts";
import { Cell, Grid } from "./model.ts";

Deno.test("It should print the initial game status", () => {
    const game = new Game();

    expect(game.printStatus()).toBe(trimMargin(`
        #Player X:
        #_ | _ | _ 
        #_ | _ | _ 
        #_ | _ | _ 
    `));
});

Deno.test("It should progress to the next state", () => {
    const game = new Game();

    expect(countCells("X", game.grid)).toBe(0);
    expect(countCells("O", game.grid)).toBe(0);
    expect(countCells("_", game.grid)).toBe(9);

    game.progress();

    expect(countCells("X", game.grid)).toBe(1);
    expect(countCells("O", game.grid)).toBe(0);
    expect(countCells("_", game.grid)).toBe(8);

    game.progress();

    expect(countCells("X", game.grid)).toBe(1);
    expect(countCells("O", game.grid)).toBe(1);
    expect(countCells("_", game.grid)).toBe(7);
});

Deno.test("It should loop until game has ended", async () => {
    const game = new Game();
    let steps = 0;
    await loopUntilFinished(game, () => {
        steps++;
    });

    expect(steps).toBe(9);

    expect(countCells("X", game.grid)).toBe(5);
    expect(countCells("O", game.grid)).toBe(4);
    expect(countCells("_", game.grid)).toBe(0);
});

function countCells(cell: Cell, grid: Grid) {
    return grid.flat().filter((it) => it === cell).length;
}

function trimMargin(string: string, marginPrefix: string = "#"): string {
    return string
        .trim()
        .split("\n")
        .map((row) => row.trim().replace(marginPrefix, ""))
        .filter((it) => it !== "")
        .join("\n");
}
