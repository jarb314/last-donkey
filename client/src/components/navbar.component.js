import { logOut } from "../services/auth.service";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <nav id="navbar">
      <p id="brand">{props.title}</p>
      {/* <div id="account"></div> */}
      {/* <Link> */}
      <a href="/login" className="nav-link" onClick={logOut}>
        LogOut
      </a>
      {/* </Link> */}
    </nav>
  );
}

export default Navbar;
