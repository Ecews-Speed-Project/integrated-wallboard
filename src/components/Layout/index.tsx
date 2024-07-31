import { FunctionComponent, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Header from '../Header';
import { auth } from '../../services/auth.services';

const Layout: FunctionComponent = () => {
  
    return (
        <div>
            <Header></Header>
            <main>
                <Outlet />
            </main>
            <footer>
                {/* Add your footer content here */}
            </footer>
        </div>
    );
};

export default Layout;
