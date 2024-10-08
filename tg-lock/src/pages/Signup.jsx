import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="w-full h-[90vh] flex items-center justify-center">
      <div className="shadow-lg h-[400px] px-24 border border-gray-300 py-4 rounded-md flex gap-6 flex-col items-center justify-center">
        <p className="text-2xl mb-6 font-bold text-gray-500">
          Create an account
        </p>
        <input
          type="email"
          placeholder="Email"
          className="px-2 py-1 rounded-md text-md border"
        />
        <input
          type="password"
          placeholder="Password"
          className="px-2 py-1 rounded-md text-md border "
        />
        <Link
          to="/"
          className="bg-blue-500 text-white font-bold px-12 py-1 rounded-md"
        >
          Sing Up
        </Link>
        <p className="text-sm text-gray-500">
          You have already an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignUp;
