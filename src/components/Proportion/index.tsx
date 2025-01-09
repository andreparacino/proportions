import { ChangeEvent, Fragment, useCallback, useState } from "react";

import Slider from "@/components/UI/Slider";
import ValueBox from "@/components/UI/ValueBox";
import { DEFAULT_INPUTS } from "@/shared/helpers/constants";
import { Input } from "@/shared/helpers/models";
import { evaluatePlaceholders, getResult, getValuesArray } from "@/shared/helpers/utilities";
import { useClipboard } from "@/shared/hooks";

import styles from "./index.module.scss";

const Proportion = () => {
  const [inputs, setInputs] = useState<Input[]>(DEFAULT_INPUTS);
  const [allowedDecimals, setAllowedDecimals] = useState(2);

  const valuesArray = getValuesArray(inputs);
  const totalFilledInputs = valuesArray.filter(Boolean).length;
  const placeholders = evaluatePlaceholders(valuesArray);
  const result = getResult(valuesArray, allowedDecimals);

  const { copyToClipboard } = useClipboard(result);

  const handleInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>, index: number) =>
      setInputs((prev) => {
        const newInputs = [...prev];
        newInputs[index].value = e.target.value;
        return newInputs;
      }),
    []
  );

  return (
    <section className={styles.Proportion}>
      <section className={styles["Proportion-decimalsFilter"]}>
        <span>
          Precision (<strong>decimals</strong>):
        </span>
        <Slider onChange={(value) => setAllowedDecimals(value)} />
      </section>
      <section className={styles["Proportion-europeanLayout"]}>
        {inputs.map((input, index) => (
          <Fragment key={input.id}>
            <ValueBox
              value={input.value || result || ""}
              isResult={!input.value && totalFilledInputs === 3}
              isFirst={index === 0}
              resultFound={!!result}
              placeholder={placeholders[index]}
              onChange={(e) => handleInput(e, index)}
              onClick={copyToClipboard}
            />
            {input.nextSymbol && <span style={{ fontSize: "2rem" }}>{input.nextSymbol}</span>}
          </Fragment>
        ))}
      </section>
    </section>
  );
};

export default Proportion;
