import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import "./App.css";
import TodoListBanner from "./components/todo-list/TodoListBanner";
// import Sidebar from "./components/sidebar/Sidebar";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/home/Home";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <div>
        <TodoListBanner />
        <Router>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/dashboard">{user ? <Dashboard /> : <Home />}</Route>
          </Switch>
        </Router>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            color: "white",
          },
          success: {
            style: {
              background: "green",
            },
          },
          error: {
            style: {
              background: "red",
            },
          },
        }}
      />
    </div>
  );
}

export default App;
