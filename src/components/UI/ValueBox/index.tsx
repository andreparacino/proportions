import { AppContext } from "components/App";
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ERROR, MEMBER } from "shared/enums";
import { useClassNames } from "shared/hooks";
import styles from "./index.module.scss";

interface ValueBoxProps {
  placeholder: string;
  name: MEMBER;
  value: string;
  isResult: boolean;
  isFirst?: boolean;
  resultFound: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ValueBox = ({
  placeholder,
  name,
  value,
  isResult,
  isFirst,
  resultFound,
  onChange,
}: ValueBoxProps) => {
  const [invalid, setInvalid] = useState<boolean>(false);
  const classNames = useClassNames([
    styles.ValueBox,
    isResult ? styles["ValueBox--isResult"] : "",
    invalid ? styles["ValueBox--invalid"] : "",
    resultFound ? styles["ValueBox--resultFound"] : "",
  ]);

  const { setDisplayedError } = useContext(AppContext);

  const inputWidth = useMemo(
    () => (value ? value.length + "ch" : "25px"),
    [value]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (isNaN(+e.target.value)) {
        setInvalid(true);
        setDisplayedError(ERROR.ONLY_NUMERIC);
      }
      if (e.target.value.includes(",")) setDisplayedError(ERROR.INVALID_FLOAT);
      onChange(e);
    },
    [onChange, setDisplayedError]
  );

  useEffect(() => {
    const timeout = setTimeout(() => invalid && setInvalid(false), 200);
    return () => clearTimeout(timeout);
  }, [invalid]);

  return (
    <input
      name={name}
      autoComplete={"off"}
      style={{ width: inputWidth }}
      type="text"
      className={classNames}
      value={value}
      autoFocus={isFirst}
      placeholder={placeholder}
      disabled={isResult}
      onChange={handleChange}
    />
  );
};

export default ValueBox;
