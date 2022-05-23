import { NavLink } from "react-router-dom";
import { Links } from "links";
import styles from "./Header.module.scss";

type TProps = {
  logginedName: null | string;
  isLogged: boolean;
  onLogoutHandler: () => void;
};

const Header = ({ logginedName, isLogged, onLogoutHandler }: TProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.linksBox}>
        <NavLink to={Links.Posts}>posts</NavLink>
        <NavLink to={Links.Comments}>comments</NavLink>
        <NavLink to={Links.Albums}>albums</NavLink>
        <NavLink to={Links.Photos}>photos</NavLink>
        <NavLink to={Links.Todos}>todos</NavLink>
        <NavLink to={Links.Users}>users</NavLink>
        {isLogged ? (
          <div className={styles.statusIsLoggedBox}>
            <span onClick={onLogoutHandler}>Hello {logginedName}: logout</span>
          </div>
        ) : (
          <NavLink className={styles.statusIsLoggedBox} to={Links.Login}>
            login
          </NavLink>
        )}
      </div>
    </header>
  );
};
export default Header;
