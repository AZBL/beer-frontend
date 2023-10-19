import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBeerMugEmpty } from "@fortawesome/free-solid-svg-icons";
import styles from "./LoadingScreen.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";

const LoadingScreen: React.FC = () => {
  const [isLoadingBackend, setIsLoadingBackend] = useState(true);

  useEffect(() => {
    const checkBackendHealth = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/health`);
        if (response.status === 200) {
          setIsLoadingBackend(false);
        }
      } catch (error) {
        console.error("Error checking backend health:", error);
        setTimeout(checkBackendHealth, 5000);
      }
    };

    checkBackendHealth();
  }, []);

  if (!isLoadingBackend) {
    return null;
  }

  return (
    <div className={styles.LoadingContainer}>
      <div className="grid">
        <p className={styles.LoadingMessage}>
          The server is warming up. This might take a few minutes. In the
          meantime, please enjoy a free beer haiku.
        </p>
        <div className={styles.MugContainer}>
          <FontAwesomeIcon className={styles.Mug} icon={faBeerMugEmpty} />
        </div>
        <div className={styles.MugContainer}>
          <FontAwesomeIcon className={styles.Mug} icon={faBeerMugEmpty} />
        </div>
        <div className={styles.MugContainer}>
          <FontAwesomeIcon className={styles.Mug} icon={faBeerMugEmpty} />
        </div>

        <p className={styles.Haiku}>
          Beer, oh yummy beer <br />
          So bubbly and refreshing <br />
          Quenches thirst with joy.
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
