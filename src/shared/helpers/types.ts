export type TypeOrNull<T> = T | null;
export type TypeOrUndefined<T> = T | undefined;
export type TypeOrNonExisting<T> = TypeOrUndefined<TypeOrNull<T>>;

export type DisabledInput = {
  isDisabled: boolean;
  instance: TypeOrUndefined<string>;
};
