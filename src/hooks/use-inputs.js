import { useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};
const InputReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return { value: state.value, isTouched: true };
  }
  if (action.type === "RESET") {
    return { value: "", isTouched: false };
  }
  return initialInputState;
};

const useInput = (validateValue) => {
  // extra training to use useReducer
  const [inputState, dispatchInput] = useReducer(
    InputReducer,
    initialInputState
  );
  //   const [inputValue, setInputValue] = useState(""); // set a new state for input value
  //   const [isTouched, setIsTouched] = useState(false); // default is not touched
  const isValid = validateValue(inputState.value); // pass this function as a prop
  const hasError = !isValid && inputState.isTouched; // make sure the value is not valid after being edited (focused)

  const valueChangeHandler = (event) => {
    dispatchInput({ type: "INPUT", value: event.target.value });
    // setInputValue(event.target.value); // the function for onChange
  };
  const inputBlurHandler = () => {
    // setIsTouched(true); // the function for onBlur
    dispatchInput({ type: "BLUR", value: true });
  };
  const reset = () => {
    // setIsTouched(false);
    // setInputValue("");
    dispatchInput({ type: "RESET" });
  };
  // pass this object to the parent component
  return {
    value: inputState.value,
    isValid: isValid,
    hasError,
    inputBlurHandler,
    valueChangeHandler,
    reset,
  };
};
export default useInput;
