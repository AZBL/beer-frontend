import styles from "./Home.module.css";
import BeerOfTheDay from "../../components/BeerOfTheDay/BeerOfTheDay";

const Home = () => {
  return (
    <main className={styles.main}>
      <p className={styles.welcome}>
        Welcome to the Beer Fridge. Beer Fridge is an app that allows you to add
        beers to your own perosnal fridge. In the future you will be able to
        view other peoples' fridges and explore new beers. Happy beer drinking.
        Please drink responsibly.
      </p>
      <div className={styles.BeerOfTheDayWrapper}>
        <BeerOfTheDay />
      </div>
    </main>
  );
};
export default Home;
