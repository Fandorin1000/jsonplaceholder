import { Links } from "links";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./App.module.scss";

import Albums from "components/Albums/Albums";
import Comments from "components/Comments/Comments";
import Photos from "components/Photos/Photos";
import Posts from "components/Posts/Posts";
import Todos from "components/Todos/Todos";
import Users from "components/Users/Users";
import Header from "components/Header/Header";
import Login from "components/Login/Login";
import Post from "components/Post/Post";

const App: React.FC = () => {
  const [logginedName, setLogginedName] = useState<null | string>("Alex");
  const [error, setError] = useState<null | string>(null);
  const [isLogged, setIsLogged] = useState<boolean>(true);

  const navigate = useNavigate();

  const [adminData] = useState({
    name: "Alex",
    password: "0000",
  });

  useEffect(() => {
    if (!isLogged) {
      navigate(Links.Login);
    }
  }, [isLogged, navigate]);

  const onCheckEnteredDataHandler = (
    userName: string,
    userPassword: string
  ) => {
    if (userName === adminData.name && userPassword === adminData.password) {
      setIsLogged(true);
      setLogginedName(userName);
      navigate(Links.Posts);
    } else {
      setError(
        "Login or password incorrect, please enter your username or password correct"
      );
    }
  };

  const onResetErrorHandler = () => {
    setError(null);
  };

  const onSetErrorLengthHandler = () => {
    setError("min 3 characters in login and password");
  };

  const onLogoutHandler = () => {
    setIsLogged(false);
    setLogginedName(null);
  };

  return (
    <div className={styles.App}>
      <Header
        logginedName={logginedName}
        isLogged={isLogged}
        onLogoutHandler={onLogoutHandler}
      />
      <div>
        <Routes>
          <Route
            path={Links.Login}
            element={
              <Login
                onSendEnteredUserData={onCheckEnteredDataHandler}
                errorData={error}
                onResetError={onResetErrorHandler}
                onSetErrorLength={onSetErrorLengthHandler}
              />
            }
          />
          <Route path={Links.Posts} element={<Posts />} />
          <Route path={Links.Post} element={<Post />} />
          <Route path={Links.Comments} element={<Comments />} />
          <Route path={Links.Albums} element={<Albums />} />
          <Route path={Links.Photos} element={<Photos />} />
          <Route path={Links.Todos} element={<Todos />} />
          <Route path={Links.Users} element={<Users />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
