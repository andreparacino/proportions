import ValueBox from "@/components/UI/ValueBox";
import {
  ChangeEvent,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { MATH_SYMBOL, MEMBER, VARIABLE_SYMBOL } from "@/shared/enums";
import { getResult } from "@/shared/helpers/utilities";
import styles from "./index.module.scss";
import Slider from "@/components/UI/Slider";
import { DisabledInput } from "@/shared/helpers/types";

const { FIRST_MEMBER, SECOND_MEMBER, THIRD_MEMBER, FOURTH_MEMBER } = MEMBER;
const members = Object.values(MEMBER);

const { COLON, EQUAL } = MATH_SYMBOL;

const { X, Y, Z, W } = VARIABLE_SYMBOL;
const symbols = Object.values(VARIABLE_SYMBOL);

const Proportion = () => {
  const [values, setValues] = useState<Record<MEMBER, string | null>>({
    [FIRST_MEMBER]: null,
    [SECOND_MEMBER]: null,
    [THIRD_MEMBER]: null,
    [FOURTH_MEMBER]: null,
  });
  const [placeholders, setPlaceholders] = useState<
    Record<MEMBER, VARIABLE_SYMBOL>
  >({
    [FIRST_MEMBER]: X,
    [SECOND_MEMBER]: Y,
    [THIRD_MEMBER]: Z,
    [FOURTH_MEMBER]: W,
  });

  const [allowedDecimals, setAllowedDecimals] = useState(2);

  const existingValues = useMemo(
    () => Object.keys(values).filter((key) => !!values[key as MEMBER]),
    [values]
  );

  const disabledInput = useMemo(
    (): DisabledInput => ({
      isDisabled: existingValues.length === 3,
      instance: Object.keys(values).find((key) => !values[key as MEMBER]),
    }),
    [existingValues.length, values]
  );

  const result = useMemo(
    () => getResult(disabledInput, values, allowedDecimals),
    [disabledInput, values, allowedDecimals]
  );

  const handleInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const event = e.target;
    const currentReference = event.name as MEMBER;
    if (isNaN(+event.value) || !currentReference) return;
    setValues((prev) => ({
      ...prev,
      [currentReference]: event.value,
    }));
  }, []);

  useEffect(
    () =>
      // The placeholders assignment to the correct input needs to change based on the number and position of the existing values, so that theoretically the last unknown value is going to be the x.
      members
        .filter((member) => !existingValues?.includes(member))
        .forEach((_member, index) => {
          setPlaceholders((prev) => ({
            ...prev,
            [_member]: symbols[index],
          }));
        }),
    [existingValues]
  );

  return (
    <section className={styles.Proportion} onChange={handleInput}>
      <section className={styles["Proportion-decimalsFilter"]}>
        <span>
          Precision (<strong>decimals</strong>):
        </span>
        <Slider onChange={(value) => setAllowedDecimals(value)} />
      </section>
      <section className={styles["Proportion-europeanLayout"]}>
        {members.map((member, index) => (
          <Fragment key={member}>
            <ValueBox
              name={member}
              value={values[member] || result?.toString() || ""}
              isResult={
                disabledInput.isDisabled && disabledInput.instance === member
              }
              isFirst={index === 0}
              resultFound={typeof result === "number"}
              placeholder={placeholders[member]}
              onChange={handleInput}
            />
            {index !== 3 && (
              <span style={{ fontSize: "2rem" }}>
                {index === 1 ? EQUAL : COLON}
              </span>
            )}
          </Fragment>
        ))}
      </section>
    </section>
  );
};

export default Proportion;
