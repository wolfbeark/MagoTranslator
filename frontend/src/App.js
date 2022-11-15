import logo from "./logo.svg";
import "./App.css";

function App() {
  const test = process.env;

  return (
    <div className="App">
      <img src={`${process.env.PUBLIC_URL}/images/Default0.png`} alt="" />
    </div>
  );
}

export default App;
