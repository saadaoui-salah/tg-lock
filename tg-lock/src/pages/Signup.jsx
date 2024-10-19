import { Link } from "react-router-dom";
import Logo from "../logo.jpg";
import { useSignup } from "../api/auth";
import { useState } from "react";

const SignUp = () => {
  const { error, submit } = useSignup();
  const [data, setData] = useState({});
  return (
    <div className="w-full h-[90vh] flex items-center justify-center">
      <div className="h-[400px] px-24 flex gap-6 flex-col items-center justify-center">
        <img src={Logo} className="w-24 h-24 rounded-full" />
        <p className="text-2xl mb-6 font-bold text-white">Create an account</p>
        <div className="text-red-500">
          {error?.map((error) => (
            <p>{error}</p>
          ))}
        </div>
        <input
          onChange={(e) =>
            setData({
              ...data,
              email: e.target.value,
            })
          }
          type="email"
          placeholder="Email"
          className="px-2 py-1 rounded-md text-md border text-white bg-gray-600"
        />
        <input
          onChange={(e) =>
            setData({
              ...data,
              password: e.target.value,
            })
          }
          type="password"
          placeholder="Password"
          className="px-2 py-1 rounded-md text-md border text-white bg-gray-600 "
        />
        <input
          onChange={(e) =>
            setData({
              ...data,
              password2: e.target.value,
            })
          }
          type="password"
          placeholder="Password Confirmation"
          className="px-2 py-1 rounded-md text-md border text-white bg-gray-600 "
        />

        <button
          onClick={() => submit(data)}
          className="bg-blue-500 text-white font-bold px-12 py-1 rounded-md"
        >
          Sign Up
        </button>
        <p className="text-sm text-gray-200">
          You already have an account?{" "}
          <Link to="/login" className="text-blue-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignUp;
