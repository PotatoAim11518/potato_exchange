import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import Button from "../button";
import LoginForm from "./LoginForm";
import styles from "./ModalForms.module.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [existingUser, setExistingUser] = useState(false);

  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      }
    } else {
      setErrors(["Passwords do not match."]);
    }
  };

  const goLogIn = () => {
    return setExistingUser(true);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      {!existingUser && (
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={onSignUp}>
            <div>
              <input
                className={styles.inputField}
                placeholder="Username"
                type="text"
                name="username"
                onChange={updateUsername}
                value={username}
              ></input>
            </div>
            <div>
              <input
                className={styles.inputField}
                placeholder="Email"
                type="text"
                name="email"
                onChange={updateEmail}
                value={email}
              ></input>
            </div>
            <div>
              <input
                className={styles.inputField}
                placeholder="Password"
                type="password"
                name="password"
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            <div>
              <input
                className={styles.inputField}
                placeholder="Confirm Password"
                type="password"
                name="repeat_password"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>
            </div>
            <div className={styles.errorsContainer}>
              {errors.map((error, ind) => (
                <div className={styles.error} key={ind}>
                  {error}
                </div>
              ))}
            </div>
            <Button
              action={onSignUp}
              width={200}
              borderRadius={10}
              btnColor={"gold"}
              text={"Submit"}
              fontColor={"black"}
            />
            <button type="submit">
              <Button
                action={goLogIn}
                width={200}
                borderRadius={10}
                btnColor={"blue"}
                text={"Already a user"}
                fontColor={"white"}
              />
            </button>
          </form>
        </div>
      )}
      {existingUser && <LoginForm />}
    </>
  );
};

export default SignUpForm;
