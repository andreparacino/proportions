import { TypeOrNull } from "shared/helpers/types";

// I chose to place this function here becouse of the possibility of implementing different layouts/variants of the proportion component, so it could be shared between instances of a similar logic.
// The function takes two multiplying members and tryes to divide the multiplication by one of the two dividends (the correct function call is handled by a switch case in Proportion/index.tsx).
export const evaluateProportion = ({
  toMultiply,
  toDivide,
  precision,
}: {
  toMultiply: [TypeOrNull<string>, TypeOrNull<string>];
  toDivide: [TypeOrNull<string>, TypeOrNull<string>];
  precision: number;
}) =>
  +(
    (+(toMultiply[0] || "") * +(toMultiply[1] || "")) /
    +(toDivide[0] || toDivide[1] || "")
  ).toFixed(precision);
