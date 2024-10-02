import { FunctionComponent } from "react";
import PropTypes from 'prop-types';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS for the navbar toggle functionality
import { auth } from "../../services/auth.services";
import { useAuth } from "../../auth/authContext ";
import { NavLink, useNavigate } from "react-router-dom";


const Header: FunctionComponent = () => {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logging out
  };
  return (<>
    <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
      <div className="container-fluid">
        <NavLink
          className="navbar-brand"
          to="/"
        >
          <b>CDC (SPEED) Wallboard</b>
        </NavLink>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item nav-item-img">
              <img src="images/pepfar-logo.svg" alt="icon1" className="d-inline-block align-text-top me-2" />
            </li>
            <li className="nav-item nav-item-img">
              <img src="images/cdc.svg" alt="icon2" className="d-inline-block align-text-top me-2" />
            </li>
            <li className="nav-item nav-item-img">
              <img src="images/nigeria.svg" alt="icon3" className="d-inline-block align-text-top me-2" />
            </li>
            <li className="nav-item nav-item-img">
              <img src="images/ecews.svg" alt="icon3" className="d-inline-block align-text-top me-2" />
            </li>
            <li className="nav-item nav-item-img">
              (Last Update: 28 May 2024)
            </li>

          </ul>
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"
                to=""
              >
                <img src="https://via.placeholder.com/40" alt="profile" className="rounded-circle me-2" />
                Menu
              </NavLink>

              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/upload-data"
                  >
                    Upload Data
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/previous-upload"
                  >
                    Previous Upload
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/upload-tracker"
                  >
                    Upload Tracker
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/generate-linelist"
                  >
                    Generate Linelist
                  </NavLink>
                </li>

              </ul>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"
                to=""
              >
                <img src="https://via.placeholder.com/40" alt="profile" className="rounded-circle me-2" />
                Admin
              </NavLink>

              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/summary"
                  >
                    Summary Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/ncd"
                  >
                    NCD Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/mental-health"
                  >
                    mental-health
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/treatment"
                  >
                    Treatment Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/vl"
                  >
                    VL Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/vl-age-sex"
                  >
                    VL By Age & sex Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/cholera"
                  >
                    Cholera Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/lassa"
                  >
                    Lassa Fever
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/measles"
                  >
                    Measles Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/monkey-pox"
                  >
                    Monkey Pox Dashboard
                  </NavLink>
                </li>
              {/*   <li>
                  <NavLink
                    className="dropdown-item"
                    to="/yellow-fever"
                  >
                    Yellow Fever Show
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/slide-show"
                  >
                    Slide Show
                  </NavLink>
                </li> */}
                <li>
                  <a
                    className="dropdown-item"
                    aria-label="menu"
                    aria-expanded="false"
                    onClick={handleLogout}>
                    Logout
                  </a>

                </li>

              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav> </>);
};


Header.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Header;