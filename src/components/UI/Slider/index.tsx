import { ChangeEvent, useCallback, useState } from "react";

import styles from "./index.module.scss";

interface SliderProps {
  onChange: (value: number) => void;
}

const Slider = ({ onChange }: SliderProps) => {
  const [value, setValue] = useState("2");

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const updatedValue = e.target.value;
      setValue(updatedValue);
      onChange(+updatedValue);
    },
    [onChange]
  );

  return (
    <div className={styles.Slider}>
      <input type="range" min="1" max="4" step="1" defaultValue={value} onChange={handleChange} />
      <output>{value}</output>
    </div>
  );
};

export default Slider;
