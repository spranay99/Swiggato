import { Link, useRouteError } from "react-router-dom";
import { ERROR_IMG_URL } from "../utils/constants";
const Error = () => {
  const { status, statusText, error } = useRouteError();

  return (
    <div className="text-white h-screen flex items-center justify-center flex-col gap-4">
      <img src={ERROR_IMG_URL} alt={statusText} />
      <h2 className="text-2xl sm:text-3xl text-[#282c3f] font-extrabold">
        <span>{status}</span> {statusText}
      </h2>
      <p className="text-lg sm:text-xl text-[#686b78]">{error.message}</p>
      <Link to="/">
        <div className="text-center p-2 bg-[#fc8019] mx-10 text-white font-semibold cursor-pointer">
          Go Home
        </div>
      </Link>
    </div>
  );
};

export default Error;
