import { useReducer } from "react";

type SetStateAction<S> = S | ((prevState: S) => S);

const useCustomState = <T>(
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

export default useCustomState;
