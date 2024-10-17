export type Player = "X" | "O";

export function nextPlayer(currentPlayer: Player): Player {
    return currentPlayer === "X" ? "O" : "X";
}
