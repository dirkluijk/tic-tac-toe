export function withIndex<T>(elem: T, index: number): [T, number] {
    return [elem, index];
}

export function trimMargin(string: string, marginPrefix: string = "#"): string {
    return string
        .trim()
        .split("\n")
        .map((row) => row.trim().replace(marginPrefix, ""))
        .filter((it) => it !== "")
        .join("\n");
}
