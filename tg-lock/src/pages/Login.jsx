import { Link } from "react-router-dom";

const Login = ({ onSignUp }) => {
  return (
    <div className="w-full h-[90vh] flex items-center justify-center">
      <div className="shadow-lg h-[400px] px-24 border border-gray-300 py-4 rounded-md flex gap-6 flex-col items-center justify-center">
        <p className="mb-6 text-2xl font-bold text-gray-500">
          Login to your account
        </p>
        <input
          type="email"
          placeholder="Email"
          className="px-2 py-1 rounded-md text-md border "
        />
        <input
          type="password"
          placeholder="Password"
          className="px-2 py-1 rounded-md text-md border "
        />
        <button className="bg-blue-500 text-white font-bold px-12 py-1 rounded-md">
          Login
        </button>
        <p className="text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Sing Up
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
