import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TOTP } from "totp-generator";

const Dashboard = () => {
  const { otp, expires } = TOTP.generate("JBSWY3DPEHPK3PXP", { period: 60 });
  const [timeRemaining, setTimeRemaining] = useState(
    expires - new Date().getTime()
  );

  useEffect(() => {
    // Update the countdown every second
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const timeLeft = expires - currentTime;
      if (timeLeft <= 0) {
        clearInterval(interval); // Stop the countdown when time is up
        setTimeRemaining(0);
      } else {
        setTimeRemaining(timeLeft);
      }
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [expires]);

  return (
    <div className="w-full relative h-full">
      <div className="w-full flex justify-end px-16">
        <button className="text-white bg-blue-500 px-4 py-1 rounded-md shadow-md hover:shadow-sm">
          Create App
        </button>
      </div>
      <div className="w-full h-full py-8 px-16">
        <Link to="/app">
          <div className="border flex-col text-white bg-blue-500 flex shadow-md px-4 py-2 rounded-md w-60">
            <div className="flex justify-between w-full">
              <p className="font-bold">Google</p>{" "}
              <p className="font-bold">TOTP: {otp}</p>
            </div>
            <p>
              Expires in: {Math.floor((timeRemaining % (1000 * 60)) / 1000)}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default Dashboard;
