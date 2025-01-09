import { useContext, useEffect, useState } from "react";

import { AppContext } from "@/components/App";
import { useClassNames } from "@/shared/hooks";
import utilities from "@/shared/styles/utilities.module.scss";

import styles from "./index.module.scss";

const ERROR_TIMEOUT = 3000;

const MessageOverlay = () => {
  const [show, setShow] = useState(false);
  const { displayedMessage, setDisplayedMessage } = useContext(AppContext);

  const classNames = useClassNames([
    styles.ErrorOverlay,
    show ? utilities["u-fadeIn"] : utilities["u-fadeOut"],
    displayedMessage?.type === "error"
      ? styles["ErrorOverlay--error"]
      : styles["ErrorOverlay--success"]
  ]);

  useEffect(() => {
    displayedMessage && setShow(true);

    const hide = setTimeout(() => displayedMessage && setShow(false), ERROR_TIMEOUT - 200);
    const setToNull = setTimeout(
      () => displayedMessage && setDisplayedMessage(null),
      ERROR_TIMEOUT
    );

    return () => {
      clearTimeout(hide);
      clearTimeout(setToNull);
    };
  }, [displayedMessage, setDisplayedMessage]);

  return <span className={classNames}>{displayedMessage?.message}</span>;
};

export default MessageOverlay;
