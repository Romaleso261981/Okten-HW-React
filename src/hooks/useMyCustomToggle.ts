import { useState } from "react";

const useMyCustomToggle = <T = boolean>(initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);
  const toggle = (newValue?: T) =>
    setValue((prev) => (newValue !== undefined ? newValue : (!prev as T)));
  return [value, toggle] as const;
};

export { useMyCustomToggle };
