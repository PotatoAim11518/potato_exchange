import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import Button from "../button";
import SignUpForm from "./SignUpForm";
import styles from "./ModalForms.module.css";

const LoginForm = ({ setShowModal }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [existingUser, setExistingUser] = useState(true);

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data)
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    await dispatch(login("demo@aa.io", "password"));
    await setShowModal(false)
  };

  const goSignUp = () => {
    return setExistingUser(false);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      {existingUser && (
        <div className={styles.formContainer}>
          <form className={styles.form} method="post" onSubmit={onLogin}>
            <div>
              <input
                className={styles.inputField}
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div>
              <input
                className={styles.inputField}
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={updatePassword}
              />
            </div>
            <div className={styles.errorsContainer}>
              {errors.map((error, ind) => (
                <div className={styles.error} key={ind}>
                  {error}
                </div>
              ))}
            </div>
            <button type="submit">
              <Button
                action={onLogin}
                width={200}
                borderRadius={8}
                btnColor={"salmon"}
                text={"Login"}
                fontColor={"white"}
              />
            </button>
            <button type="submit">
              <Button
                action={demoLogin}
                width={200}
                borderRadius={8}
                btnColor={"seagreen"}
                text={"Demo Login"}
                fontColor={"white"}
              />
            </button>
            <Button
              action={goSignUp}
              width={200}
              borderRadius={8}
              btnColor={"teal"}
              text={"New? Sign Up!"}
              fontColor={"white"}
            />
          </form>
        </div>
      )}
      {!existingUser && <SignUpForm />}
    </>
  );
};

export default LoginForm;
