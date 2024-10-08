import "./App.css";
import Logo from "../src/logo.jpg";
import { Link } from "react-router-dom";

function App({ children }) {
  return (
    <div className="bg-white">
      <header className="w-full px-4">
        <Link to="/">
          <img src={Logo} className="w-16 h-16" />
        </Link>
      </header>
      {children}
    </div>
  );
}

export default App;
