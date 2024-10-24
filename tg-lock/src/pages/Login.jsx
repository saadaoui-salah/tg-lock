import { Link } from "react-router-dom";
import Logo from "../logo.jpg";
import { useLogin } from "../api/auth";
import { useState } from "react";
import { Eye, EyeSlash } from "../components/Icons";

const Login = () => {
  const { error, submit } = useLogin();
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);
  return (
    <div className="w-full h-[90vh] flex items-center justify-center">
      <div className="h-[400px] px-24 flex gap-6 flex-col items-center justify-center">
        <img src={Logo} className="w-24 h-24 rounded-full" />
        <p className="text-2xl font-bold text-white">Login</p>
        <input
          onChange={(e) =>
            setData({
              ...data,
              email: e.target.value,
            })
          }
          type="email"
          placeholder="Email"
          className="px-2 py-1 rounded-md text-md border w-[230px] text-white bg-gray-600"
        />
        <div className="px-2 py-1 flex items-center w-[230px] gap-2 rounded-md text-md border text-white bg-gray-600">
          <input
            onChange={(e) =>
              setData({
                ...data,
                password: e.target.value,
              })
            }
            type={show ? "password" : "text"}
            placeholder="Password"
            className="border-none bg-transparent w-[184px]"
          />
          <div onClick={() => setShow(!show)}>
            {show ? <EyeSlash /> : <Eye />}
          </div>
        </div>
        <button
          onClick={() => submit(data)}
          className="bg-blue-500 text-white font-bold px-12 py-1 rounded-md"
        >
          Login
        </button>
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
