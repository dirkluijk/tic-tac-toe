import { expect } from "@std/expect";
import { Game } from "./main.ts";

Deno.test("It should print the initial game status", () => {
    const game = new Game();

    expect(game.printStatus()).toBe(trimMargin(`
        #Player X:
        #_ | _ | _ 
        #_ | _ | _ 
        #_ | _ | _ 
    `));
});

function trimMargin(string: string, marginPrefix: string = "#"): string {
    return string
        .trim()
        .split("\n")
        .map((row) => row.trim().replace(marginPrefix, ""))
        .filter((it) => it !== "")
        .join("\n");
}
