import { useEffect, useState } from "react";
import { TOTP } from "totp-generator";
import Logo from "../logo.jpg";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useApp } from "../api/app";
import { useLogout } from "../api/auth";
import { Html5QrcodeScanner } from "html5-qrcode";

const qrcodeRegionId = "html5qr";

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props) => {
  let config = {};
  if (props.fps) {
    config.fps = props.fps;
  }
  if (props.qrbox) {
    config.qrbox = props.qrbox;
  }
  if (props.aspectRatio) {
    config.aspectRatio = props.aspectRatio;
  }
  if (props.disableFlip !== undefined) {
    config.disableFlip = props.disableFlip;
  }
  console.log(config);
  return config;
};

const Html5QrcodePlugin = (props) => {
  useEffect(() => {
    // when component mounts
    const config = createConfig(props);
    const verbose = props.verbose === true;
    // Suceess callback is required.
    if (!props.qrCodeSuccessCallback) {
      throw "qrCodeSuccessCallback is required callback.";
    }
    const html5QrcodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId,
      config,
      verbose
    );
    html5QrcodeScanner.render(
      props.qrCodeSuccessCallback,
      props.qrCodeErrorCallback
    );

    // cleanup function when component will unmount
    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, []);

  return (
    <div
      className="w-[300px] h-[300px] flex items-center justify-center flex-col"
      id={qrcodeRegionId}
    />
  );
};

const PopUP = ({ children, close }) => {
  return (
    <div className="absolute flex items-center justify-center bg-black bg-opacity-50 z-50 w-full h-full">
      <div className="bg-white relative items-center gap-5 flex flex-col rounded-md px-4 py-4">
        <span
          onClick={() => close()}
          className="border cursor-pointer z-[100] top-[12px] text-white bg-red-500 text-center absolute right-[12px] rounded-full py-[1px] px-2 font-bold"
        >
          X
        </span>
        {children}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { error, submit, apps, deleteApp } = useApp();
  const [selected, setSelected] = useState([]);
  const { logout } = useLogout();
  const [data, setData] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [totps, setTotps] = useState([]);
  const generateTOTPs = () => {
    const newTotps = apps?.map(({ secret_key, name, id }) => {
      const { otp, expires } = TOTP.generate(secret_key, { period: 60 });
      const timeRemaining = expires - new Date().getTime();
      setTimeRemaining(timeRemaining);
      return { otp, expires, secret_key, timeRemaining, name, id };
    });

    setTotps(newTotps);
  };
  useEffect(() => {
    // Update the countdown every second
    generateTOTPs();
    const interval = setInterval(() => {
      generateTOTPs();
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [apps]);
  const [open, setOpen] = useState(false);
  const [scan, setScan] = useState(false);
  const onSubmit = () => {
    setOpen(false);
    submit(data);
  };
  const onNewScanResult = (decodedText, decodedResult) => {
    console.log(decodedText);
  };

  return (
    <>
      <div className={`${scan ? "" : "hidden"}`}>
        <PopUP close={() => setScan(false)}>
          <Html5QrcodePlugin
            fps={10}
            qrbox={250}
            disableFlip={false}
            qrCodeSuccessCallback={onNewScanResult}
          />
        </PopUP>
      </div>
      {open && (
        <PopUP close={() => setOpen(false)}>
          <p className="text-black mb-4 font-bold text-xl">Create App</p>
          <input
            required
            type="text"
            onChange={(e) =>
              setData({
                ...data,
                name: e.target.value,
              })
            }
            placeholder="Name"
            className="px-2 py-1 rounded-md text-md border text-black bg-gray-600 bg-opacity-30 "
          />
          <input
            type="text"
            required
            onChange={(e) =>
              setData({
                ...data,
                secret_key: e.target.value,
              })
            }
            placeholder="Secret key"
            className="px-2 py-1 rounded-md text-md border text-black bg-gray-600 bg-opacity-30 "
          />
          <button
            onClick={() => onSubmit()}
            className="text-white bg-black w-24 py-1 rounded-md shadow-md hover:shadow-sm"
          >
            Save
          </button>
        </PopUP>
      )}
      <div className="w-full relative h-full bg-white">
        <div className="flex items-center justify-between px-4">
          <img src={Logo} className="w-16 h-16 rounded-full" />
          <button
            onClick={() => logout()}
            className="bg-black text-white font-bold w-24 text-center py-1 rounded-md"
          >
            Logout
          </button>
        </div>
        <div className="w-full gap-4 flex justify-end px-4 mt-12">
          <button
            disabled={selected.length === 0}
            onClick={() => deleteApp({ id: selected })}
            className={`text-white bg-red-500 disabled:bg-red-400 disabled:shadow-none w-24 py-1 rounded-md shadow-md hover:shadow-sm`}
          >
            Delete
          </button>
          <button
            onClick={() => setScan(true)}
            className="text-white bg-black w-32 py-1 rounded-md shadow-md hover:shadow-sm"
          >
            Scan QR Code
          </button>
          <button
            onClick={() => setOpen(true)}
            className="text-white bg-black w-24 py-1 rounded-md shadow-md hover:shadow-sm"
          >
            Create App
          </button>
        </div>

        <div className="w-full h-full text-center pt-8 px-4">
          {totps.length === 0 && <p>Create Your First App</p>}
          {totps?.map((totp) => (
            <div
              onClick={() =>
                setSelected(
                  selected.includes(totp.id)
                    ? selected.filter((i) => i !== totp.id)
                    : [...selected, totp.id]
                )
              }
              className={`border cursor-pointer ${
                selected.includes(totp.id)
                  ? " bg-gray-200"
                  : "hover:bg-gray-200 bg-white"
              } items-center mt-12 text-black w-full flex justify-between shadow-md px-4 py-2 rounded-md`}
            >
              <div className="flex justify-between">
                <p className="font-bold">{totp.name}</p>{" "}
                <p className="font-bold ml-2">Key Code: {totp.otp}</p>
              </div>
              <CountdownCircleTimer
                isPlaying
                duration={60}
                initialRemainingTime={Math.floor(
                  (totp.timeRemaining % (1000 * 60)) / 1000
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
          ))}
        </div>
      </div>
    </>
  );
};
export default Dashboard;
