import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import Button from "../button";

const LogoutButton = ({ onClick }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = async (e) => {
    await dispatch(logout());
    onClick()
    history.push('/')
  };

  return (
    <Button
      action={onLogout}
      width={100}
      borderRadius={10}
      btnColor={"black"}
      text={"Logout"}
      fontColor={"white"}
      fontSize={16}
    />
  );
};

export default LogoutButton;
