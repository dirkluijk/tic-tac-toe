import { Cell } from "./cell.ts";

export type Grid = [
    [Cell, Cell, Cell],
    [Cell, Cell, Cell],
    [Cell, Cell, Cell],
];

export const initialGrid = (): Grid => [
    ["_", "_", "_"],
    ["_", "_", "_"],
    ["_", "_", "_"],
];
