import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div>
      <ErrorMessage />
      <p>page not found</p>
      <Link to="/">return to main page</Link>
    </div>
  );
};

export default Page404;
