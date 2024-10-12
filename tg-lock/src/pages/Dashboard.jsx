import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TOTP } from "totp-generator";
import Logo from "../logo.jpg";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

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
    <div className="w-full relative h-full bg-white">
      <div className="flex items-center justify-between px-4">
        <img src={Logo} className="w-16 h-16 rounded-full" />
        <Link
          to="/login"
          className="bg-black text-white font-bold w-24 text-center py-1 rounded-md"
        >
          Logout
        </Link>
      </div>
      <div className="w-full flex justify-end px-4 mt-12">
        <button className="text-white bg-black w-24 py-1 rounded-md shadow-md hover:shadow-sm">
          Create App
        </button>
      </div>
      <div className="w-full h-full py-8 px-4">
        <Link to="#">
          <div className="border items-center mt-4 text-black bg-white w-full flex justify-between shadow-md px-4 py-2 rounded-md">
            <div className="flex justify-between">
              <p className="font-bold">Google</p>{" "}
              <p className="font-bold ml-2">TOTP: {otp}</p>
            </div>
            <CountdownCircleTimer
              isPlaying
              duration={60}
              initialRemainingTime={Math.floor(
                (timeRemaining % (1000 * 60)) / 1000
              )}
              onComplete={() => {
                return { shouldRepeat: true, delay: 0 };
              }}
              colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
              colorsTime={[7, 5, 2, 0]}
              size={40}
              strokeWidth={6}
            ></CountdownCircleTimer>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default Dashboard;
