import { useMemo } from "react";

export const useClassNames = (props: string[]): string => {
  return useMemo(() => {
    return [...props].join(" ").trim();
  }, [props]);
};
