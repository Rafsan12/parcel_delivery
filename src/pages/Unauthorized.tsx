import { Link } from "react-router";

export default function Unauthorized() {
  return (
    <>
      <h1>You are Unauthorized</h1>
      <Link to={"/"}>Go to Home</Link>
    </>
  );
}
