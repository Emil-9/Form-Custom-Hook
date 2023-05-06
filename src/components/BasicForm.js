import useInput from "../hooks/use-inputs";

const BasicForm = (props) => {
  const isNotEmpty = (data) => data.trim() !== "";
  const isAvailable = (value) =>
    value
      .trim()
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: fNHasError,
    inputBlurHandler: fNBlurHandler,
    valueChangeHandler: fNChangeHandler,
    reset: fNReset,
  } = useInput(isNotEmpty);

  const {
    value: lNameValue,
    isValid: lNameIsValid,
    hasError: lNHasError,
    inputBlurHandler: lNBlurHandler,
    valueChangeHandler: lNChangeHandler,
    reset: lNReset,
  } = useInput(isNotEmpty);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    inputBlurHandler: emailBlurHandler,
    valueChangeHandler: emailChangeHandler,
    reset: emailReset,
  } = useInput(isAvailable);

  const firstNameClass = fNHasError ? "form-control invalid" : "form-control";
  const lastNameClass = lNHasError ? "form-control invalid" : "form-control";
  const emailClass = emailHasError ? "form-control invalid" : "form-control";

  let formIsValid = false;
  if (firstNameIsValid && lNameIsValid && emailIsValid) {
    formIsValid = true;
  }
  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    console.log("submitted");
    fNReset();
    lNReset();
    emailReset();
  };
  return (
    <form onSubmit={formSubmitHandler}>
      <div className="control-group">
        <div className={firstNameClass}>
          <label htmlFor="name">First Name</label>
          <input
            value={firstNameValue}
            onBlur={fNBlurHandler}
            onChange={fNChangeHandler}
            type="text"
            id="firstname"
          />
          {fNHasError && <p className="error-text">not valid</p>}
        </div>
        <div className={lastNameClass}>
          <label htmlFor="name">Last Name</label>
          <input
            value={lNameValue}
            onBlur={lNBlurHandler}
            onChange={lNChangeHandler}
            type="text"
            id="lastname"
          />
          {lNHasError && <p className="error-text">not valid</p>}
        </div>
      </div>
      <div className={emailClass}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          value={emailValue}
          onBlur={emailBlurHandler}
          onChange={emailChangeHandler}
          type="text"
          id="email"
        />
        {emailHasError && <p className="error-text">not valid</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
