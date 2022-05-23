import React, { useState } from "react";
import styles from "./Login.module.scss";

type TProps = {
  onSendEnteredUserData: (userName: string, userPassword: string) => void;
  errorData: null | string;
  onResetError: () => void;
  onSetErrorLength: () => void;
};

const Login = ({
  onSendEnteredUserData,
  errorData,
  onResetError,
  onSetErrorLength,
}: TProps) => {
  const [enteredUserLogin, setEnteredUserLogin] = useState("");
  const [enteredUserPassword, setEnteredUserPassword] = useState("");

  const onEnterUserDataHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const id = event.target.id;
    const newValue = event.currentTarget.value;
    onResetError();
    if (id === "userLogin") {
      setEnteredUserLogin(newValue);
    } else {
      setEnteredUserPassword(newValue);
    }
  };

  const onCheckUserEnteredDataHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (enteredUserPassword.length >= 3 && enteredUserLogin.length >= 3) {
      onSendEnteredUserData(enteredUserLogin, enteredUserPassword);
      setEnteredUserLogin("");
      setEnteredUserPassword("");
    } else {
      onSetErrorLength();
    }
  };

  return (
    <div>
      <h1>Please Enter: "Alex", "0000"</h1>
      <div>
        <form onSubmit={onCheckUserEnteredDataHandler}>
          <div className={`${styles.inputBox} ${errorData && styles.errorBox}`}>
            <label htmlFor="userLogin">User Login</label>
            <input
              id="userLogin"
              value={enteredUserLogin}
              onChange={onEnterUserDataHandler}
            />
          </div>
          <div className={`${styles.inputBox} ${errorData && styles.errorBox}`}>
            <label htmlFor="userPassword">User Password</label>
            <input
              id="userPassword"
              value={enteredUserPassword}
              onChange={onEnterUserDataHandler}
            />
          </div>
          <div className={styles.buttonBox}>
            <button disabled={!enteredUserLogin || !enteredUserPassword}>
              Send/Submit
            </button>
          </div>
          {errorData && (
            <div className={styles.errorBox}>
              <span>{errorData}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
export default Login;
