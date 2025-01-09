// ENUMS

export enum ERROR {
  INVALID_FLOAT = 'To insert a floating number, use "." instead of ","',
  ONLY_NUMERIC = "Each input only accepts numeric values."
}

// TYPES

export type Maybe<T> = T | null;

export type DisabledInput = {
  isDisabled: boolean;
  instance: Maybe<string>;
};

export type Input = { id: 1 | 2 | 3 | 4; value: string; nextSymbol: Maybe<":" | "="> };
