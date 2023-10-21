import { useEffect, useState } from "react";
import { fetchUserProfile } from "../../firebase";
import { auth } from "../../firebase";
import BeerList from "../BeerList/BeerList";
import { Link } from "react-router-dom";
import styles from "./Profile.module.css";

const Profile: React.FC = () => {
  const [firstName, setFirstName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userDetails = await fetchUserProfile(user.uid);
          setFirstName(userDetails.first_name);
        } catch (error: any) {
          console.error("Failed to fetch user details:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setFirstName(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className={styles.ProfileWrapper}>
      {loading ? (
        <h1 className={styles.ProfileH1}></h1>
      ) : firstName ? (
        <>
          <h1 className={styles.ProfileH1}>Hello {firstName}!</h1>
          <Link to="/addbeer">
            <button className={styles.Button}>Add New Beer</button>
          </Link>
          <div className={styles.BeerListWrapper}>
            <BeerList />
          </div>
        </>
      ) : (
        <>
          <h4 className={styles.SignInWarning}>
            You must be signed in to access this page.
          </h4>
          <Link className={styles.Link} to="/signin">
            <p>Sign In</p>
          </Link>
          <Link className={styles.Link} to="/">
            <p>Go Home</p>
          </Link>
        </>
      )}
    </div>
  );
};

export default Profile;
