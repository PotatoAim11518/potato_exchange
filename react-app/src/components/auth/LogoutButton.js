import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import Button from "../button";

const LogoutButton = ({ onClick }) => {
  const dispatch = useDispatch();

  const onLogout = async (e) => {
    await dispatch(logout());
    onClick()
  };

  return (
    <Button
      action={onLogout}
      width={100}
      borderRadius={10}
      btnColor={"black"}
      text={"Logout"}
      fontColor={"white"}
    />
  );
};

export default LogoutButton;
