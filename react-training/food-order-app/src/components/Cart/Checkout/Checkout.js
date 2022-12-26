import { useRef, useState } from "react";

import Input from "../../UI/Input/Input";

import styles from "./Checkout.module.css";

const Checkout = (props) => {
  const [nameInputIsValid, setNameInputIsValid] = useState(true);

  const [addressInputIsValid, setAddressInputIsValid] = useState(true);

  const [cityInputIsValid, setCityInputIsValid] = useState(true);

  const [formIsValid, setFormIsValid] = useState(false);

  const nameInputRef = useRef();
  const addressInputRef = useRef();
  const cityInputRef = useRef();

  const validateInput = (input) => {
    if (input === "") return false;

    return true;
  };

  const nameInputChangeHandler = (event) => {
    setNameInputIsValid(validateInput(event.target.value));
  };
  const addressInputBlurHandler = (event) => {
    setAddressInputIsValid(validateInput(event.target.value));
  };
  const cityInputBlurHandler = (event) => {
    setCityInputIsValid(validateInput(event.target.value));
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    setNameInputIsValid(validateInput(enteredName));
    setAddressInputIsValid(validateInput(enteredAddress));
    setCityInputIsValid(validateInput(enteredCity));

    if (!nameInputIsValid || !addressInputIsValid || !cityInputIsValid) {
      setFormIsValid(false);
      return;
    }

    setFormIsValid(true);

    if (formIsValid) {
      props.onConfirm({
        name: nameInputRef.current.value,
        address: addressInputRef.current.value,
        city: cityInputRef.current.value,
      });
    }
  };

  const nameInputStyle = `${styles.control} ${
    !nameInputIsValid && styles.invalid
  }`;

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={nameInputStyle}>
        <Input
          label="Name"
          isColumn={true}
          input={{
            id: "name-input",
            type: "text",
            onChange: nameInputChangeHandler,
          }}
          ref={nameInputRef}
        />
      </div>
      <div
        className={`${styles.control} ${
          !addressInputIsValid && styles.invalid
        }`}
      >
        <Input
          label="Address"
          isColumn={true}
          input={{
            id: "address-input",
            type: "text",
            onBlur: addressInputBlurHandler,
          }}
          ref={addressInputRef}
        />
      </div>
      <div
        className={`${styles.control} ${!cityInputIsValid && styles.invalid}`}
      >
        <Input
          label="City"
          isColumn={true}
          input={{
            id: "city-input",
            type: "text",
            onBlur: cityInputBlurHandler,
          }}
          ref={cityInputRef}
        />
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
