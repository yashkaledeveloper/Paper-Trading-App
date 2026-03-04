import { Link } from "react-router-dom";
import "./css/NotFound.css"

export default function NotFound() {


  return (
    <div className="container">
      <div className="center">
        <h1 className="code">404</h1>
      </div>

      <a href="/" className="link">
        Take me back to <Link to="/"><span className="underline">papertrade.com</span></Link>
      </a>
    </div>
  );
}
