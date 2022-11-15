import logo from "./logo.svg";
import "./App.css";

function App() {
  const test = process.env;
  console.log(test);
  console.log(window.location.origin);
  console.log(process.env.PUBLIC_URL);
  return (
    <div className="App">
      <img src={`/images/Default0.png`} alt="" />
    </div>
  );
}

export default App;
