import { FunctionComponent, useState } from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS for the navbar toggle functionality
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { RootState } from "../../store";
import { setValue } from "../../features/menu/menuSlice";
import { formatDate } from "../../utils/helpers";



const Header: FunctionComponent = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());  // Dispatch logout action
    navigate('/');       // Redirect to the login page after logout
  };


  const handleClick = (value:any) => {
    dispatch(setValue(value));
  };


  return (<>

    <header className="content-container px-6 flex items-center justify-between mb-4 mt-4">

      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold">{userData.fullName}  Wallboard</h1>
        <img src="images/pepfar-logo.svg" alt="FHPLUS logo" />
        <img src="images/cdc.svg" alt="CDC logo" />
        <img src="images/nigeria.svg" alt="Nigeria coat of arms" />
        <img src="images/ecews.svg" alt="ECEWS logo" />
        <div className="flex items-center space-x-4">
          <span>Last Update:  {formatDate(new Date())}</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <DropdownButton id="dropdown-basic-button" title="Filter" className="btn-dark">
        <Dropdown.Item  onClick={() => handleClick(0)} >All States</Dropdown.Item> 
          <Dropdown.Item  onClick={() => handleClick(1)} >Delta</Dropdown.Item>    
          <Dropdown.Item onClick={() => handleClick(2)}>Ekiti</Dropdown.Item>    
          <Dropdown.Item onClick={() => handleClick(3)}>Osun</Dropdown.Item>    
        </DropdownButton>
        <DropdownButton id="dropdown-basic-button" title="Menu" className="btn-dark">
          <Dropdown.Item as={Link} to="/upload-data">  Upload Data</Dropdown.Item>
          <Dropdown.Item as={Link} to="/previous-upload">    Previous Upload</Dropdown.Item>
          <Dropdown.Item as={Link} to="/upload-tracker">  Upload Tracker</Dropdown.Item>
          <Dropdown.Item as={Link} to="/generate-linelist">  Generate Linelist</Dropdown.Item>

        </DropdownButton>
        <DropdownButton id="dropdown-basic-button" title={userData.fullName}>
          <Dropdown.Item as={Link} to="/dashboard">  Summary Dashboard</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown drop="end" className="dropdown-submenu">
            <Dropdown.Toggle as="div" className="submenu-toggle">
              Somas Dashboard
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/cholera">     Cholera Dashboard</Dropdown.Item>
              <Dropdown.Item as={Link} to="/lassa">       Lassa Fever</Dropdown.Item>
              <Dropdown.Item as={Link} to="/measles">       Measles Dashboard</Dropdown.Item>
              <Dropdown.Item as={Link} to="/monkey-pox">      Monkey Pox Dashboard</Dropdown.Item>
              <Dropdown.Item as={Link} to="/yellow-fever">         Yellow Fever Show</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown.Divider />
          <Dropdown drop="end" className="dropdown-submenu">
            <Dropdown.Toggle as="div" className="submenu-toggle">
              Treament Dashboard
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/treatment"> Treatment Dashboard</Dropdown.Item>
              <Dropdown.Item as={Link} to="/treatment-trend"> Treatment Trend</Dropdown.Item>
              <Dropdown.Item as={Link} to="/vl">  VL Dashboard</Dropdown.Item>
              <Dropdown.Item as={Link} to="/vl-age-sex">    VL By Age & sex Dashboard</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown.Divider />
          <Dropdown drop="end" className="dropdown-submenu">
            <Dropdown.Toggle as="div" className="submenu-toggle">
              NCD Dashboard
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/ncd"> NCD Dashboard</Dropdown.Item>
              <Dropdown.Item as={Link} to="/mental-health"> Mental-health</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown.Divider />
          <Dropdown.Item as={Link} to="/slide-show">            Slide Show</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>        </DropdownButton>
      </div>
    </header>



  </>);
};



export default Header;