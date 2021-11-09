import React, { useState, useContext } from "react";
import clsx from "clsx";
import axios from "axios";
import toast from "react-hot-toast";

import classes from "./Sidebar.module.css";
import { FaAngleLeft } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FiCamera } from "react-icons/fi";
import { FiPower } from "react-icons/fi";
import { AuthContext } from "../../context/AuthContext";


const Sidebar = (props) => {
  const [showUpdateAvatarForm, setShowUpdateAvatarForm] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const { user, dispatch } = useContext(AuthContext);

  const onFileChangeHandler = async (e) => {
    let newImage = e.target.files[0]; 
    setUploadingImage(true);

    if (newImage) {
      const data = new FormData();
      data.append("profilePic", newImage);

      try {
        let postRes = await axios.post(
          "https://chidi-todo-api.herokuapp.com/api/v1/user/update-avatar",
          data,
          {
            headers: {
              "content-type": "application/json",
              "access-token": user.token,
            },
          }
        );

        if (postRes.data.success) {
          toast.success(postRes.data.msg);

          setUploadingImage(false);
          
          const updatedUser = {
            token: user.token,
            user: postRes.data.user,
          }
          dispatch({ type: "UPLOAD_SUCCESS", payload: updatedUser });
        }
      } catch (err) {
        if (!err.response.data.success)
          return toast.error(err.response.data.msg);
      }
    }
  };
  const logoutHandler = () => {
    props.onLogout();
  };
  return (
    <div className={classes.root}>
      <FaAngleLeft
        onClick={props.onHideSidebarIconClicked}
        className={classes.hideSidebarIcon}
      />
      <div className={classes.avatarAndNameCon}>
        <div className={classes.avatarAndNameConInner}>
          <div
            className={clsx(classes.shape, classes.shapeCircle)}
            onMouseOver={() => setShowUpdateAvatarForm(true)}
            onMouseLeave={() => {
              if (!user.user.avatarSmall) setShowUpdateAvatarForm(true);
              else {
                setShowUpdateAvatarForm(false);
              }
            }}
          >
            {!showUpdateAvatarForm && (
              <img
                src={user.user.avatarSmall ? user.user.avatarSmall : ""}
                alt={!user.user.avatarSmall ? "upload" : "Profile Photo"}
                className={classes.profileImage}
              />
            )}

            {showUpdateAvatarForm && (
              <form action="POST" className={classes.updateAvaterForm}>
                <label htmlFor="media">
                  <FiCamera />
                  <input
                    type="file"
                    style={{ display: "none" }}
                    id="media"
                    accept="image/*"
                    onChange={onFileChangeHandler}
                  />
                </label>
              </form>
            )}
          </div>
          <h5 className={classes.fullName}>{user.user.fullname}</h5>
          {uploadingImage && (
            <span className={classes.uploadingAlert}>uploading image...</span>
          )}
        </div>
      </div>
      <div>
        <div className={classes.sidebarItem}>
          <FaEdit />
          <span className={classes.sidebarItemText}>Notes</span>
        </div>
        <hr className={classes.hr} />
        <div className={classes.sidebarItem}>
          <FaRegTrashAlt />
          <span className={classes.sidebarItemText}>Trash</span>
        </div>

        <hr className={classes.hr} />
      </div>
      <div
        className={`${classes.sidebarItem} ${classes.logoutDiv}`}
        onClick={logoutHandler}
      >
        <FiPower />
        <span className={classes.sidebarItemText}>Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;
