import "./App.css";
import Logo from "../src/logo.jpg";
import { Link } from "react-router-dom";

function App({ children }) {
  console.log(window.location.pathname);
  return (
    <div className="bg-white h-[100vh]">
      <header className="w-full px-4 mb-6 flex items-center justify-between">
        <Link to="/">
          <img src={Logo} className="w-16 h-16" />
        </Link>
        {window.location.pathname !== "/login" &&
          window.location.pathname !== "/signup" && (
            <Link
              to="/login"
              className="bg-red-500 text-white font-bold px-12 w-fit py-1 rounded-md"
            >
              Logout
            </Link>
          )}
      </header>
      {children}
    </div>
  );
}

export default App;
