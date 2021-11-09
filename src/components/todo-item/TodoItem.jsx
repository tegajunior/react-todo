import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPen } from "react-icons/fa";

import classes from "./TodoItem.module.css";

const TodoItem = (props) => {
  const onClickHandler = () => {
    props.onDeleteTodoItem(props.todoItem._id);
  }
  return (
    <div className={classes.root}>
      <div className={classes.todoItem__title}>
        <span>{props.todoItem.todoTitle}</span>
      </div>
      <div className={classes.todoItem__actions}>
        <FaPen className={classes.todoItem__actions__icon} />
        <FaRegTrashAlt className={classes.todoItem__actions__icon} onClick={onClickHandler} />
      </div>
    </div>
  );
};

export default TodoItem;
