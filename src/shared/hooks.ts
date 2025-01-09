import { useCallback, useContext, useEffect, useMemo } from "react";

import { AppContext } from "@/components/App";

export const useClassNames = (props: string[]): string => {
  return useMemo(() => {
    return [...props].join(" ").trim();
  }, [props]);
};

export const useClipboard = (value: string) => {
  const { setDisplayedMessage } = useContext(AppContext);

  const copyToClipboard = useCallback(() => {
    if (!value) return;

    navigator.clipboard
      .writeText(value)
      .then(() => {
        setDisplayedMessage({ message: "Copied to clipboard! ✅", type: "success" });
      })
      .catch(() => {
        setDisplayedMessage({ message: "Failed to copy to clipboard", type: "error" });
      });
  }, [setDisplayedMessage, value]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!value) return;
      if (event.key === "Enter") copyToClipboard();
    },
    [copyToClipboard, value]
  );

  useEffect(() => {
    if (!value) return;

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, value]);

  return { copyToClipboard };
};
