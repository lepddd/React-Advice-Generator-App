import { useFetch } from "./hooks/useFetch";
import mobileImg from "../public/pattern-divider-mobile.svg";
import desktopImg from "../public/pattern-divider-desktop.svg";
import iconDice from "../public/icon-dice.svg";

function App() {
  const { loading, advice, fetchData } = useFetch(
    "https://api.adviceslip.com/advice"
  );

  return (
    <div className="container">
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="box">
          <p className="advice_id">ADVICE #{advice.slip.id}</p>

          <p className="advice_title">"{advice.slip.advice}"</p>

          <picture>
            <source media="(max-width:550px)" srcSet={mobileImg} />
            <img src={desktopImg} alt="svg" />
          </picture>
        </div>
      )}
      <button
        className="new_advice_btn"
        onClick={() => fetchData("https://api.adviceslip.com/advice")}
        disabled={loading}
      >
        <img src={iconDice} alt="dice-icon" />
      </button>
    </div>
  );
}

export default App;
