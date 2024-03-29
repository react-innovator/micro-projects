import { useState, useRef, useEffect } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const nameInputRef = useRef();
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  useEffect(() => {
    if(enteredNameIsValid) {
      console.log('Name Input is valid!')
    }
  }, [enteredNameIsValid]);

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);

    if(event.target.value.trim() !== '') {
      setEnteredNameIsValid(true);
    }
  }

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
    if(enteredName.trim() === '') {
      setEnteredNameIsValid(false);
    }
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setEnteredNameTouched(true);

    if(enteredName.trim() === '') {
      setEnteredNameIsValid(false);
      return;
    }
    setEnteredNameIsValid(true);

    console.log(enteredName);
    console.log(nameInputRef.current.value)
  }

  const nameInputIsInvalid = enteredNameTouched && !enteredNameIsValid;
  
  const nameInputClasses = nameInputIsInvalid ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' onChange={nameInputChangeHandler} onBlur={nameInputBlurHandler} ref={nameInputRef}/>
        {nameInputIsInvalid && <p className="error-text">Name must not be empty.</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
