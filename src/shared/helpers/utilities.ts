import { TypeOrNull } from "shared/helpers/types";

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
