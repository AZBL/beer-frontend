import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getFirebaseToken } from "../../firebase";
import styles from "./AddBeer.module.css";
import { API_BASE_URL } from "../../config";
import BeerMugs from "/assets/images/beer-added-photo.jpg";

const AddBeer: React.FC = () => {
  const [brewery, setBrewery] = useState("");
  const [beerName, setBeerName] = useState("");
  const [style, setStyle] = useState("");
  const [abv, setAbv] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const resetForm = () => {
    setBrewery("");
    setBeerName("");
    setStyle("");
    setAbv("");
    setRating("");
    setComment("");
    setSubmitted(false);
  };

  const postBeer = async (beerData: any) => {
    try {
      const token = await getFirebaseToken();
      if (!token) {
        console.error("No token available");
        return;
      }
      const response = await axios.post(
        `${API_BASE_URL}/api/add-beer`,
        beerData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 201) {
        console.log("Beer successfully added:", response.data);
        setSubmitted(true);
      } else {
        console.error("Failed to add beer:", response.data.message);
      }
    } catch (error) {
      console.error("Error while adding beer:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const beerData = {
      brewery: brewery,
      name: beerName,
      style: style,
      abv: parseFloat(abv),
      rating: parseFloat(rating),
      comments: comment,
    };

    postBeer(beerData);
  };

  return (
    <>
      {!submitted ? (
        <form className={styles.BeerInfoContainer} onSubmit={handleSubmit}>
          <label htmlFor="brewery">Brewery:</label>
          <input
            type="text"
            id="brewery"
            value={brewery}
            onChange={(e) => setBrewery(e.target.value)}
            required
          />
          <label htmlFor="beerName">Beer name:</label>
          <input
            type="text"
            id="beerName"
            value={beerName}
            onChange={(e) => setBeerName(e.target.value)}
            required
          />
          <label htmlFor="style">Style:</label>
          <input
            type="text"
            id="style"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            required
          />
          <label htmlFor="abv">ABV:</label>
          <input
            type="number"
            step="0.1"
            id="abv"
            value={abv}
            onChange={(e) => setAbv(e.target.value)}
            required
          />
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button className={styles.FormButton} type="submit">
            Add Beer
          </button>
        </form>
      ) : (
        <>
          <div className={styles.BeerAddedContainer}>
            <h2 className={styles.BeerAdded}>Beer Added!</h2>
            <div className={styles.ImgContainer}>
              <img
                className={styles.BeerAddedImg}
                src={BeerMugs}
                alt="beer mugs"
              />
            </div>
            <button className={styles.Link} onClick={resetForm}>
              Add another
            </button>
            <Link className={styles.Link} to="/profile">
              Back to Profile
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default AddBeer;
