import { useState, useEffect, useRef } from "react";

type StateSetter<T> = (prevT: T | ((prevState: T) => T)) => void;

export const useStateWithEffect = <T>(initialValue: T): [T, StateSetter<T>] => {
  const [state, setState] = useState(initialValue);
  const stateRef = useRef(state);

  const setStateWithEffect: StateSetter<T> = (newState) => {
    setState((prevState) => {
      const newValue =
        typeof newState === "function"
          ? (newState as (prevState: T) => T)(prevState)
          : newState;

      stateRef.current = newValue;
      return newValue;
    });
  };

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  return [stateRef.current, setStateWithEffect];
};

// export const useStateWithEffect = <T>(initialValue: T): [T, StateSetter<T>] => {
//   let state: T = initialValue;

//   function setState(newState: T | ((prevState: T) => T)) {
//     typeof newState === "function"
//       ? (state = (newState as (prevState: T) => T)(state))
//       : newState;

//     return [state, setState];
//   }

//   return [state, setState];
// };
