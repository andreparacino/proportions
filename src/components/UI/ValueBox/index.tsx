import {
  ChangeEvent,
  InputHTMLAttributes,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

import { AppContext } from "@/components/App";
import { ERROR } from "@/shared/helpers/models";
import { useClassNames } from "@/shared/hooks";

import styles from "./index.module.scss";

interface ValueBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  isResult: boolean;
  isFirst?: boolean;
  resultFound: boolean;
  onClick: () => void;
}

const ValueBox = ({
  placeholder,
  value,
  isResult,
  isFirst,
  resultFound,
  onChange,
  onClick
}: ValueBoxProps) => {
  const [invalid, setInvalid] = useState<boolean>(false);
  const classNames = useClassNames([
    styles.ValueBox,
    isResult ? styles["ValueBox--isResult"] : "",
    invalid ? styles["ValueBox--invalid"] : "",
    resultFound ? styles["ValueBox--resultFound"] : ""
  ]);

  const { setDisplayedMessage } = useContext(AppContext);

  const inputWidth = useMemo(
    () => (typeof value === "string" && value ? value.length + "ch" : "25px"),
    [value]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;

      if (value.includes(",")) value = value.replace(",", ".");
      if (isNaN(+value)) {
        setInvalid(true);
        setDisplayedMessage({ message: ERROR.ONLY_NUMERIC, type: "error" });
        return;
      }

      onChange && onChange(e);
    },
    [onChange, setDisplayedMessage]
  );

  useEffect(() => {
    const timeout = setTimeout(() => invalid && setInvalid(false), 200);
    return () => clearTimeout(timeout);
  }, [invalid]);

  return (
    <input
      className={classNames}
      onClick={() => isResult && onClick()}
      type="text"
      inputMode="decimal"
      style={{ width: inputWidth }}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      autoComplete={"off"}
      autoFocus={isFirst}
      readOnly={isResult}
    />
  );
};

export default ValueBox;
