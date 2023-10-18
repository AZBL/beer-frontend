import styles from "./BeerOfTheDay.module.css";
import greenStateLager from "src/assets/images/green-state-lager-2.jpg";

const BeerOfTheDay = () => {
  return (
    <div className={styles.BeerOfTheDayContainer}>
      <div className={styles.BOTDinfoContainer}>
        <h5>Featured Beer:</h5>
        <h2 className={styles.BeerOfTheDay}>
          <a
            href="https://www.zerogravitybeer.com/green-state-lager"
            target="_blank"
            rel="noopener noreferrer"
          >
            Green State Lager
          </a>
        </h2>
        <h3 className={styles.BeerOfTheDayBrewery}>
          <a
            href="https://www.zerogravitybeer.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Zero Gravity Beer
          </a>
        </h3>
        <div>Burlington, Vermont, United States</div>
        <div>Style: Pilsner</div>
        <div>ABV: 4.9%</div>
        <div>Hops: Hallertau Mittelfruh, Saaz</div>
      </div>
      <img src={greenStateLager} alt="Green State lager glass" />
    </div>
  );
};
export default BeerOfTheDay;
