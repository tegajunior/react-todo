import axios from "axios";
import toast from "react-hot-toast";

export const loginCall = async (userCredentials, dispatch, history) => {
  dispatch({ type: "LOGIN_START" });

  try {
    let res = await axios.post(
      "https://chidi-todo-api.herokuapp.com/api/v1/auth/login",
      userCredentials
    );
    if (res.data.success) toast.success(res.data.msg);

    dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data });
    history.push('/dashboard')
  } catch (err) {
    if (!err.response.data.success) return toast.error(err.response.data.msg);
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

export const registerCall = async (userData, forceLogin) => {
 try {
  let res = await axios.post(
    "https://chidi-todo-api.herokuapp.com/api/v1/auth/register",
    userData
  );
  if (res.data.success) toast.success(res.data.msg);
  forceLogin("login");
 } catch(err) {
  if (!err.response.data.success) return toast.error(err.response.data.msg);
 }
};

export const addtodoCall = async (data, token) => {
  
}

export const logoutCall = async (history) => {
  localStorage.clear();
  history.push("/");
};
