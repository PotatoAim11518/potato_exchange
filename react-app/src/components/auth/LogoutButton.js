import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import Button from "../button";

const LogoutButton = ({ onClick }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user)

  const buttonWidth = user?.username.length * 10 + 100
  const onLogout = async (e) => {
    await dispatch(logout());
    onClick()
    history.push('/')
  };

  return (
    <Button
      action={onLogout}
      width={buttonWidth}
      borderRadius={10}
      btnColor={"black"}
      text={`Logout of ${user?.username}`}
      fontColor={"white"}
      fontSize={16}
    />
  );
};

export default LogoutButton;
