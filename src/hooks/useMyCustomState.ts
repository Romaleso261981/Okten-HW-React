import { useReducer } from "react";

type SetStateAction<S> = S | ((prevState: S) => S);

export const useCustomWithReducerState = <T>(
  initialState: T | (() => T)
): [T, (setStateAction: SetStateAction<T>) => void] => {
  const stateReducer = (state: T, action: SetStateAction<T>): T => {
    return typeof action === "function"
      ? (action as (prevState: T) => T)(state)
      : action;
  };

  const [state, dispatch] = useReducer(
    stateReducer,
    typeof initialState === "function"
      ? (initialState as () => T)()
      : initialState
  );

  const setState = (setStateAction: SetStateAction<T>) => {
    dispatch(setStateAction);
  };

  return [state, setState];
};

type StateSetter<T> = (prevT: T | ((prevState: T) => T)) => void;

export const useStateWithEffect = <T>(initialValue: T): [T, StateSetter<T>] => {
  let state: T = initialValue;

  function setState(newState: T | ((prevState: T) => T)) {
    typeof newState === "function"
      ? (state = (newState as (prevState: T) => T)(state))
      : newState;

    return [state, setState];
  }

  return [state, setState];
};
