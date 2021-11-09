import React, { useContext, useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AddItem from "../../components/forms/AddItem";
import TodoItem from "../../components/todo-item/TodoItem";
import Sidebar from "../../components/sidebar/Sidebar";
import { AiOutlineMenu } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";

import { AuthContext } from "../../context/AuthContext";
import { logoutCall } from "../../apiCalls";

import classes from "./Dashboard.module.css";

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todoArrayChange, setTodoArrayChange] = useState(false);

  const { user } = useContext(AuthContext);
  const history = useHistory();

  const sidebarConHideClasses = !showSidebar ? "hideSidebar" : "";

  const logoutHandler = () => {
    logoutCall(history);
  };

  const onTodoArrayChangedHandler = () => {
    setTodoArrayChange(!todoArrayChange);
  };
  const onAddTodoFormSubmittedHandler = async (data) => {
    try {
      let res = await axios.post(
        "https://chidi-todo-api.herokuapp.com/api/v1/todo",
        data,
        {
          headers: {
            "content-type": "application/json",
            "access-token": user.token,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.msg);
      }
    } catch (err) {
      if (!err.response.data.success) return toast.error(err.response.data.msg);
    }
  };

  const onDeleteTodoItemHandler = async (id) => {
    console.log(id)
    try {
      let res = await axios.delete(
        `https://chidi-todo-api.herokuapp.com/api/v1/todo/${id}`,
        {
          headers: {
            "content-type": "application/json",
            "access-token": user.token,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.msg);
        setTodoArrayChange(!todoArrayChange);
      }
    } catch(err) {
      if (!err.response.data.success) return toast.error(err.response.data.msg);
    }
  }
  const fetchAllTodo = useCallback(async () => {
    try {
      let res = await axios.get(
        "https://chidi-todo-api.herokuapp.com/api/v1/todo",
        {
          headers: {
            "content-type": "application/json",
            "access-token": user.token,
          },
        }
      );

      if (res.data.success) {
        
        setTodos(res.data.allTodos);
      }
    } catch (err) {
      if (!err.response.data.success) return toast.error(err.response.data.msg);
    }
  }, [user.token]);

  useEffect(() => {
    fetchAllTodo();
  }, [todoArrayChange, fetchAllTodo]);

  return (
    <>
      <div className={sidebarConHideClasses}>
        <Sidebar
          onHideSidebarIconClicked={() => setShowSidebar(false)}
          onLogout={logoutHandler}
          className={classes.sidebar}
        />
      </div>
      <div>
        <AiOutlineMenu
          className={classes.menuIcon}
          onClick={() => setShowSidebar(true)}
        />
      </div>
      <div className={classes.root}>
        <AddItem
          onAddTodoFormSubmitted={onAddTodoFormSubmittedHandler}
          onTodoArrayChanged={onTodoArrayChangedHandler}
        />
        <div className={classes.TodoItemContainer}>
          <h4 className={classes.itemListText}>Item List</h4>
          {todos.length === 0 && (
            <p style={{ color: "red", fontWeight: "bold", paddingLeft: '40px' }}>
              No todo, please add some todo
            </p>
          )}
          {todos.length !== 0 &&
            todos.map((todo) => (
              <TodoItem
                key={todo._id}
                todoItem={todo}
                onDeleteTodoItem={onDeleteTodoItemHandler}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
