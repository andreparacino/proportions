import React, { ChangeEvent, useCallback, useState } from "react";
import styles from "./index.module.scss";

export type PilledRadioGroupOption = {
  label: string;
  value: string;
};

interface PilledRadioGroupProps {
  optionsData: PilledRadioGroupOption[];
  defaultValue: string;
  handleChange: (value: string) => void;
}

const PilledRadioGroup = ({
  optionsData,
  defaultValue,
  handleChange,
}: PilledRadioGroupProps) => {
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

  const handleRadioChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSelectedValue(value);
      handleChange(value);
    },
    [handleChange]
  );

  return (
    <div className={styles.PilledRadioGroup}>
      {optionsData.map((option) => (
        <React.Fragment key={option.value}>
          <input
            type="radio"
            id={option.value}
            checked={selectedValue === option.value}
            value={option.value}
            onChange={handleRadioChange}
          />
          <label htmlFor={option.value}>{option.label}</label>
        </React.Fragment>
      ))}
    </div>
  );
};

export default PilledRadioGroup;
