import { Input } from "@/shared/helpers/models";

export const INPUT_NAMES: Record<1 | 2 | 3 | 4, string> = {
  1: "First extreme",
  2: "First middle",
  3: "Second middle",
  4: "Second extreme"
};

export const DEFAULT_INPUTS: Input[] = [
  { id: 1, value: "", nextSymbol: ":" },
  { id: 2, value: "", nextSymbol: "=" },
  { id: 3, value: "", nextSymbol: ":" },
  { id: 4, value: "", nextSymbol: null }
];

export const SYMBOLS = ["𝑥", "𝑦", "𝑧", "𝑤"];
