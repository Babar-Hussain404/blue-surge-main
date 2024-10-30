import { Link } from "react-router-dom";
const Error404 = () => {
  return (
    <>
      <div
        style={{ color: "white", display: "flex", flexDirection: "column" }}
        className="container error-page"
      >
        <h2 style={{ color: "white" }}>404</h2>
        <h3 style={{ color: "white" }}>Looks like somthing went wrong</h3>
        <p style={{ color: "white" }}>
          The page you are looking for was moved, removed, renamed or might
          never existed.
        </p>
        <div>
          <Link to="/" className="btn main_btn">
            Go to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default Error404;
