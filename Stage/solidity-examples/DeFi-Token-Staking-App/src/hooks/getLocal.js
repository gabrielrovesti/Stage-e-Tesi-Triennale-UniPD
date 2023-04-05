import { useEffect, useState } from "react";

// countinous changes detect -> returns dafult || result
export const getLocal = (key, defaultValue) => {
  const [value, setValue] = useState("0x0");
  // don't use cache [] as we need update async type data, otherwise it renders once
  useEffect(() => {
    // getting stored value
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(key);
      const initial = saved !== null ? JSON.parse(saved) : defaultValue;
      setValue(initial);
    }
  });
  return value;
};

