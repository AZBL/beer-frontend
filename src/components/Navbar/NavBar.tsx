import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBeerMugEmpty } from "@fortawesome/free-solid-svg-icons";
import useSignOut from "../SignOut";
import { useUser } from "../../UserContext";


const NavBar: React.FC = () => {
  const { isAuthenticated, logout } = useUser();
  const signOutFromFirebase = useSignOut();

  const signOutUser = async () => {
    await signOutFromFirebase();
    logout();
  };

  return (
    <header className="grid">
      <NavLink to="/" className={styles.titleContainer}>
        <h1 className={styles.title}>Beer Fridge</h1>
        <FontAwesomeIcon className={styles.mug} icon={faBeerMugEmpty} />
      </NavLink>

      <nav>
        <ul>
          {!isAuthenticated && (
            <>
              <li>
                <NavLink to="signup">Sign up</NavLink>
              </li>
              <li>
                <NavLink to="signin">Sign in</NavLink>
              </li>
            </>
          )}
          {isAuthenticated && (
            <>
              <li>
                <NavLink to="Profile">Profile</NavLink>
              </li>
              <li>
                <button onClick={signOutUser}>Sign out</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
export default NavBar;
