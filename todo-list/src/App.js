import { ToastContainer } from "react-toastify";
import "./index.css";
import Home from "./page/Home";

function App() {
  return (
    <div className="app">
      <Home />
      <ToastContainer />
    </div>
  );
}

export default App;
