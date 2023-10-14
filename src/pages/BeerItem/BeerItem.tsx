import axios from "axios";
import { getFirebaseToken } from "../../firebase";
import { useEffect, useState } from "react";
import { Beer } from "../BeerList/BeerList";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";
import { Link } from "react-router-dom";
import styles from "./BeerItem.module.css";

interface RouteParams {
  id: string;
}

const BeerItem: React.FC = () => {
  const { isAuthenticated } = useUser();
  const [beer, setBeer] = useState<Beer | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedBeer, setEditedBeer] = useState<Beer | null>(null);

  const navigate = useNavigate();

  const { id } = useParams() as unknown as RouteParams;

  const handleDeleteBeer = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this beer?"
    );
    if (!isConfirmed) return;

    try {
      const token = await getFirebaseToken();
      const response = await axios.delete(`/api/beer/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      if (response.status === 200) {
        console.log("Beer deleted");
        navigate("/profile");
      } else {
        setError(`Fialed to delete beer: $response.data.message`);
      }
    } catch (error: any) {
      setError(`Error deleting beer: ${error.message}`);
    }
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedBeer((prev) => ({ ...prev!, [name]: value }));
  };

  const handleUpdateBeer = async () => {
    try {
      const token = await getFirebaseToken();
      const response = await axios.put(`/api/beer/${id}`, editedBeer, {
        headers: {
          Authorization: token,
        },
      });
      if (response.status === 200) {
        console.log("Successfully updated beer", response.data);
        setBeer(response.data as Beer);
        setEditMode(false);
      } else {
        setError(`Failed to update beer: ${response.data.message}`);
      }
    } catch (error: any) {
      setError(`Error updating beer: ${error.message}`);
    }
  };

  useEffect(() => {
    const getBeer = async () => {
      if (!isAuthenticated) {
        console.error("User is not authenticated.");
        return;
      }
      setIsLoading(true);
      try {
        const token = await getFirebaseToken();
        if (!token) {
          console.error("No token available");
          return;
        }
        const response = await axios.get(`/api/beer/${id}`, {
          headers: {
            Authorization: token,
          },
        });
        if (response.status === 200) {
          console.log("Successful get request", response.data);
          setBeer(response.data as Beer);
        } else {
          setError(`Failed to get beer: ${response.data.message}`);
        }
      } catch (error: any) {
        setError(`Error getting beer: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    getBeer();
  }, [id, isAuthenticated]);

  return (
    <div className={styles.BeerContainer}>
      {isLoading && <p>Loading beer details...</p>}
      {!isLoading && error && <p>Error: {error}</p>}
      {!isLoading && !error && beer && (
        <>
          {editMode ? (
            <>
              <p className={styles.Descriptor}>Brewery: </p>
              <input
                className={styles.EditInput}
                type="text"
                name="brewery"
                value={editedBeer?.brewery}
                onChange={handleFieldChange}
              />
              <p className={styles.Descriptor}>Name: </p>
              <input
                className={styles.EditInput}
                type="text"
                name="name"
                value={editedBeer?.name}
                onChange={handleFieldChange}
              />
              <p className={styles.Descriptor}>Style: </p>
              <input
                className={styles.EditInput}
                type="text"
                name="style"
                value={editedBeer?.style}
                onChange={handleFieldChange}
              />
              <p className={styles.Descriptor}>ABV: </p>
              <input
                className={styles.EditInput}
                type="number"
                step="0.1"
                name="abv"
                value={editedBeer?.abv}
                onChange={handleFieldChange}
              />
              <p className={styles.Descriptor}>Rating: </p>
              <input
                className={styles.EditInput}
                type="number"
                min="0"
                max="10"
                step="0.1"
                name="rating"
                value={editedBeer?.rating}
                onChange={handleFieldChange}
              />
              <p className={styles.Descriptor}>Comments: </p>
              <input
                className={styles.EditInput}
                type="text"
                name="comments"
                value={editedBeer?.comments}
                onChange={handleFieldChange}
              />

              <button className={styles.Button} onClick={handleUpdateBeer}>
                Save
              </button>
              <button
                className={styles.Button}
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <div>
                <span className={styles.Descriptor}>Brewery: </span>
                {beer.brewery}
              </div>
              <div>
                <span className={styles.Descriptor}> Beer name: </span>
                {beer.name}
              </div>
              <div>
                <span className={styles.Descriptor}>Style: </span> {beer.style}
              </div>
              <div>
                <span className={styles.Descriptor}>ABV: </span> {beer.abv}%
              </div>
              <div>
                <span className={styles.Descriptor}>Rating: </span>{" "}
                {beer.rating}/10
              </div>
              <div>
                <span className={styles.Descriptor}>Comment: </span>
                {beer.comments}
              </div>

              <button
                className={styles.Button}
                onClick={() => {
                  setEditedBeer(beer);
                  setEditMode(true);
                }}
              >
                Edit Beer
              </button>
              <button className={styles.Button} onClick={handleDeleteBeer}>
                Delete Beer
              </button>
              <Link className={styles.Button} to="/profile">
                Back to Profile
              </Link>
            </>
          )}
        </>
      )}
    </div>
  );
};
export default BeerItem;
