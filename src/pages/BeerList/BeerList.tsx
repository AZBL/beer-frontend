import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirebaseToken } from "../../firebase";
import styles from "./BeerList.module.css";
import { API_BASE_URL } from "../../config";

export interface Beer {
  id: number;
  name: string;
  brewery: string;
  style: string;
  abv: string;
  rating: string;
  comments?: string;
}

const BeerList = () => {
  const [beers, setBeers] = useState<Beer[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getBeers = async () => {
      try {
        const token = await getFirebaseToken();
        if (!token) {
          console.error("No token available");
          return;
        }
        const response = await axios.get(`${API_BASE_URL}/api/beers`, {
          headers: {
            Authorization: token,
          },
        });
        if (response.status === 200) {
          console.log("Successful get request", response.data);
          setBeers(response.data as Beer[]);
        } else {
          console.error("Failed to get beers:", response.data.message);
        }
      } catch (error) {
        console.error("Error getting beers:", error);
      }
    };
    getBeers();
  }, []);

  return (
    <div>
      {beers.map((beer) => (
        <div key={beer.id} className={styles.CardContainer}>
          <div>
            <span className={styles.Descriptor}>Brewery:</span> {beer.brewery}
          </div>
          <div>
            <span className={styles.Descriptor}> Beer name:</span> {beer.name}
          </div>
          <div>
            <span className={styles.Descriptor}>Style:</span> {beer.style}
          </div>
          <div>
            <span className={styles.Descriptor}>ABV:</span> {beer.abv} %{" "}
          </div>
          <div>
            <span className={styles.Descriptor}>Rating:</span> {beer.rating} /
            10
          </div>
          <div>
            <span className={styles.Descriptor}>Comment:</span> {beer.comments}
          </div>
          <button
            className={styles.ViewBeer}
            onClick={() => navigate(`/beer/${beer.id}`)}
          >
            View/Edit Beer
          </button>
        </div>
      ))}
    </div>
  );
};
export default BeerList;
