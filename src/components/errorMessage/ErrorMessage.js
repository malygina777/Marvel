import img from "./error.gif";

const ErrorMessage = () => {
  return (
    <img
      src={img}
      alt="Error"
      style={{
        display: "block",
        placeSelf: "center",
        width: "250px",
        height: "250px",
        objectFit: "contain",
      }}
    />
  );
};

export default ErrorMessage;
