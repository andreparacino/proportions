import { SYMBOLS } from "@/shared/helpers/constants";
import { Input, Maybe } from "@/shared/helpers/models";

export const getValuesArray = (inputs: Input[]) => inputs.map((input) => input.value);

export const evaluatePlaceholders = (valuesArray: Maybe<string>[]) => {
  const placeholders: string[] = ["", "", "", ""];
  let currentIndex = 0;

  valuesArray.forEach((value, index) => {
    if (value) return;

    placeholders[index] = SYMBOLS[currentIndex];
    currentIndex++;
  });

  return placeholders;
};

const toNumber = (value: Maybe<string>, defaultValue = "0") => +(value || defaultValue);

const calculate = (
  multiplier1: Maybe<string>,
  multiplier2: Maybe<string>,
  dividend: Maybe<string>,
  fallBackDividend: Maybe<string>
): number => {
  const m1 = toNumber(multiplier1);
  const m2 = toNumber(multiplier2);
  const div = toNumber(dividend, fallBackDividend || undefined);

  return (m1 * m2) / div;
};

export const getResult = (values: string[], allowedDecimals: number) => {
  const [extreme1, middle1, middle2, extreme2] = values.map((value) => value.replace(",", "."));
  const structure = JSON.stringify(values.map(Boolean));
  let result: Maybe<number> = null;

  switch (structure) {
    case "[true,true,true,false]":
    case "[false,true,true,true]":
      result = calculate(middle1, middle2, extreme1, extreme2);
      break;
    case "[true,true,false,true]":
    case "[true,false,true,true]":
      result = calculate(extreme1, extreme2, middle1, middle2);
      break;
  }

  if (Number.isInteger(result)) return result?.toString() || "";

  return result?.toFixed(allowedDecimals) || "";
};
