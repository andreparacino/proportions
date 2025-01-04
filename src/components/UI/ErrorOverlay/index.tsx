import { AppContext } from "@/components/App";
import { useContext, useEffect, useState } from "react";
import { useClassNames } from "@/shared/hooks";
import styles from "./index.module.scss";
import utilities from "@/shared/styles/utilities.module.scss";

const ERROR_TIMEOUT = 3000;

const ErrorOverlay = () => {
  const [show, setShow] = useState<boolean>(false);
  const { displayedError, setDisplayedError } = useContext(AppContext);

  const classNames = useClassNames([
    styles.ErrorOverlay,
    show ? utilities["u-fadeIn"] : utilities["u-fadeOut"],
  ]);

  useEffect(() => {
    displayedError && setShow(true);

    const hide = setTimeout(
      () => displayedError && setShow(false),
      ERROR_TIMEOUT - 200
    );

    const setToNull = setTimeout(
      () => displayedError && setDisplayedError(null),
      ERROR_TIMEOUT
    );

    return () => {
      clearTimeout(hide);
      clearTimeout(setToNull);
    };
  }, [displayedError, setDisplayedError]);

  return <span className={classNames}>{displayedError}</span>;
};

export default ErrorOverlay;
