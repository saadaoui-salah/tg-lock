import { Link } from "react-router-dom";
import Logo from "../logo.jpg";

const Login = () => {
  return (
    <div className="w-full h-[90vh] flex items-center justify-center">
      <div className="h-[400px] px-24 flex gap-6 flex-col items-center justify-center">
        <img src={Logo} className="w-24 h-24 rounded-full" />
        <p className="text-2xl font-bold text-white">Login</p>
        <input
          type="email"
          placeholder="Email"
          className="px-2 py-1 rounded-md text-md border text-white bg-gray-600"
        />
        <input
          type="password"
          placeholder="Password"
          className="px-2 py-1 rounded-md text-md border text-white bg-gray-600 "
        />
        <Link
          to="/"
          className="bg-blue-500 text-white font-bold px-12 py-1 rounded-md"
        >
          Login
        </Link>
        <p className="text-sm text-gray-200">
          Don't have an account?
          <Link to="/signup" className="text-blue-400 ml-2">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
