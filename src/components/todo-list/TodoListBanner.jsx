import React from "react";
import classes from "./TodoListBanner.module.css";

const TodoListBanner = () => {
  return (
    <div>
      {/* <Sidebar /> */}
      <div className={classes.root}>
        <span className={classes.comHeader}>TODO APP</span>
        <div className={classes.comText}>
          What is a ToDo List? The definition is a simple one. It’s a list of
          tasks you need to complete, or things that you want to do. <br />
          <p>
            Having a list of everything you need to do written down in one place
            means you shouldn’t forget anything important. By prioritising the
            tasks in the list you plan the order in which you’re going to do
            them and can quickly see what needs your immediate attention and
            what tasks you can leave until a little later.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TodoListBanner;
