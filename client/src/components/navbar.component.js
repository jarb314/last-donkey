import { logOut } from "../services/auth.service";
import { useState, useEffect } from "react";
import { Settings, Users, BarChart } from "react-feather";
import { getCurrentUser } from "../services/auth.service";

// function Navbar(props) {
//   const { route } = props;

//   return (
//     <nav id="navbar" className="navbar">
//       <p id="brand">{props.title}</p>
//       {/* <div id="account"></div> */}
//       {/* <Link> */}
//       <ul className="navbar-nav">
//         <li className={`nav-item ${route === "settings" ? "selected" : ""}`}>
//           <a className="nav-link" href="/">
//             {/* Inicio */}
//             <Home />
//           </a>
//         </li>

//         <li className={`nav-item ${route === "settings" ? "selected" : ""}`}>
//           <a className="nav-link" href="/">
//             {/* Inicio */}
//             <Users />
//           </a>
//         </li>

//         <li className={`nav-item ${route === "settings" ? "selected" : ""}`}>
//           <a href="/login" className="nav-link" onClick={logOut}>
//             {/* LogOut */}
//             <User />
//           </a>
//         </li>
//       </ul>
//     </nav>
//   );
// }

function Navbar(props) {
  const [expanded, setExpanded] = useState(false);
  const { route } = props;

  const [isAdmin, setAdmin] = useState(false);
  useEffect(() => {
    let user = getCurrentUser();
    if (user) {
      if (user.roles.includes("ROLE_ADMIN")) {
        setAdmin(true);
      }
    }
  }, []);

  return (
    <div id="navbar">
      {/* <div className="hiden-area"></div> */}
      <nav className="navbar navbar-expand-sm navbar-light fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Club Nature
            {/* {props.title} */}
            {/* <img className="logo" src={logo} alt="jarbis-logo" /> */}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setExpanded(expanded ? false : true)}
          >
            <span className="navbar-toggler-icon"></span>
            {/* <img src={menu} alt="" /> */}
          </button>
          <div
            className={`${expanded ? "" : "collapse"} navbar-collapse`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto mb-lg-0">
              <li
                className={`nav-item ${
                  route === "home"
                    ? "selected"
                    : route === "members"
                    ? "selected"
                    : ""
                }`}
              >
                <a className="nav-link" href="/">
                  <Users />
                </a>
              </li>

              {isAdmin ? (
                <li
                  className={`nav-item ${
                    route === "reports" ? "selected" : ""
                  }`}
                >
                  <a className="nav-link" href="/">
                    <BarChart />
                  </a>
                </li>
              ) : (
                <div />
              )}
              <li
                className={`nav-item ${route === "settings" ? "selected" : ""}`}
              >
                <a href="/login" className="nav-link" onClick={logOut}>
                  <Settings />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
