export type Cell = "X" | "O" | "_";

export function cellAvailable(cell: Cell) {
  return cell === "_";
}
