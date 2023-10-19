import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className={styles.ErrorContainer}>
      <h2>404</h2>
      <p className={styles.ErrorMessage}>
        Sorry, either this page does not exist or you do not have access.
      </p>
      <Link className={styles.Link} to="/">
        <p>Go Home</p>
      </Link>
    </div>
  );
};
export default NotFound;
