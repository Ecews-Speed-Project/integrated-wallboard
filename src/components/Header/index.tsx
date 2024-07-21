import { FunctionComponent, useCallback, useState } from "react";
import PropTypes from 'prop-types';
import styles from '../../pages/SummaryBoard.module.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS for the navbar toggle functionality


const Header: FunctionComponent = () => {
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isDropdownLightOpen, setDropdownLightOpen] = useState(false);


  const openFilter = useCallback(() => {
    setFilterOpen(true);
  }, []);

  const closeFilter = useCallback(() => {
    setFilterOpen(false);
  }, []);


  const openDropdownLight = useCallback(() => {
    setDropdownLightOpen(true);
  }, []);

  const closeDropdownLight = useCallback(() => {
    setDropdownLightOpen(false);
  }, []);


  const onFrameContainerClick = useCallback(() => {
    // Add your code here
  }, []);
  return (<>
    <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
      <div className="container-fluid">
        <a className="navbar-brand" href="#"><b>CDC (SPEED) Wallboard</b></a>
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
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://via.placeholder.com/40" alt="profile" className="rounded-circle me-2" />
                Profile
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="/">Summary Dashboard</a></li>
                <li><a className="dropdown-item" href="/ncd">NCD Dashboard</a></li>
                <li><a className="dropdown-item" href="/mental-health">Mental Health</a></li>
                <li><a className="dropdown-item" href="/treatment">Treatment Dashboard</a></li>
                <li><a className="dropdown-item" href="/vl">VL Dashboard</a></li>
                <li><a className="dropdown-item" href="/vl-age-sex">VL By Age & sex Dashboard</a></li>
                <li><a className="dropdown-item" href="#">Malaria Dashboard</a></li>
                <li><a className="dropdown-item" href="#">Mpox Dashboard</a></li>
                <li><a className="dropdown-item" href="#">Slide Show</a></li>
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