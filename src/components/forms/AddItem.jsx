import React from "react";
import classes from "./Forms.module.css";
import useInput from "../../hooks/use-input";

const AddItem = (props) => {
  const {
    value: enteredTodoTitle,
    hasError: enteredTodoTitleHasError,
    isValid: enteredTodoTitleIsValid,
    valueChangeHandler: todoTitleChangeHandler,
    inputBlurHandler: todoTitleBlurHandler,
    reset: resetTodoTitleInput,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;
  if (enteredTodoTitleIsValid) formIsValid = true;

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!enteredTodoTitleIsValid) return;

    resetTodoTitleInput();

    const payload = {
      todoTitle: enteredTodoTitle,
    };
    props.onAddTodoFormSubmitted(payload);
    props.onTodoArrayChanged();

  }


  const todoTitleInputClasses = `${classes.formControl} ${
    enteredTodoTitleHasError ? classes.invalid : ""
  }`;
  return (
    <div className={classes.root}>
      <form onSubmit={onSubmitHandler}>
        <div className={todoTitleInputClasses}>
          <label htmlFor="todoTitle">Add Item</label>
          <input
            type="text"
            id="todoTitle"
            value={enteredTodoTitle}
            onChange={todoTitleChangeHandler}
            onBlur={todoTitleBlurHandler}
            palceholder="start typing..."
          />
          {enteredTodoTitleHasError && (
            <p className={classes.errorText}>Todo must not be empty.</p>
          )}
        </div>

        <button
          type="submit"
          className={classes.button}
          style={{ marginLeft: 0 }}
          disabled={!formIsValid}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddItem;
