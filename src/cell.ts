export type Cell = "X" | "O" | "_";

export function cellAvailable(cell: Cell) {
  return cell === "_";
}

export function matchesCell(cell: Cell) {
  return (it: Cell) => it === cell;
}
