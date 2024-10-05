import "./App.css";
import Logo from "../src/logo.jpg";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/Signup.jsx";
import { useState } from "react";

function App() {
  const [screen, setScreen] = useState("login");
  return (
    <div className="bg-white">
      <header className="w-full px-4">
        <img src={Logo} className="w-16 h-16" />
      </header>
      {screen === "login" ? (
        <Login onSignUp={() => setScreen("signup")} />
      ) : (
        <SignUp onSignUp={() => setScreen("login")} />
      )}
    </div>
  );
}

export default App;
