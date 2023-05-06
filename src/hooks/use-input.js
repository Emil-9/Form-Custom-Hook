import { useState } from "react";

// validateValue is a function should be passed from the app or simpleInput component

const useInput = (validateValue) => {
  const [isTouched, setIsTouched] = useState(false); // to avoid getting error message at the first load -> this one for first focus
  const [enteredValue, setEnteredValue] = useState(""); // first way using state to track each key strock
  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched; // it's invalid when the input has changed not at first load

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };
  const InputBlurHandler = (event) => {
    setIsTouched(true); // if the user put the cursor in the input (focus) and lost it
  };
  const reset = () => {
    setIsTouched(false);
    setEnteredValue("");
  };
  return {
    value: enteredValue,
    hasError,
    isValid: valueIsValid,
    valueChangeHandler,
    InputBlurHandler,
    reset
  };
};
export default useInput;
