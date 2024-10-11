import "./App.css";
import { Link } from "react-router-dom";

function App({ children }) {
  return <div className="h-[100vh] bg-gray-800">{children}</div>;
}

export default App;
