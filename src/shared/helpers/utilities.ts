import { MEMBER } from "@/shared/enums";
import { DisabledInput, TypeOrNull } from "@/shared/helpers/types";

const { FIRST_MEMBER, SECOND_MEMBER, THIRD_MEMBER, FOURTH_MEMBER } = MEMBER;

// I chose to place this function here because of the possibility of implementing
// different layouts/variants of the proportion component, so it could be shared between
// instances of a similar logic.
// The function takes two multiplying members and tries to divide the multiplication by
// one of the two dividends (the correct function call is handled by a switch case in
// Proportion/index.tsx).
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

export const getResult = (
  disabledInput: DisabledInput,
  values: Record<MEMBER, string | null>,
  allowedDecimals: number
) => {
  if (!disabledInput.isDisabled) return null;
  switch (disabledInput.instance) {
    case FIRST_MEMBER:
    case FOURTH_MEMBER:
      return evaluateProportion({
        toMultiply: [values[SECOND_MEMBER], values[THIRD_MEMBER]],
        toDivide: [values[FIRST_MEMBER], values[FOURTH_MEMBER]],
        precision: +allowedDecimals,
      });
    default:
      return evaluateProportion({
        toMultiply: [values[FIRST_MEMBER], values[FOURTH_MEMBER]],
        toDivide: [values[SECOND_MEMBER], values[THIRD_MEMBER]],
        precision: +allowedDecimals,
      });
  }
};
