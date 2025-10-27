
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Header from '../Header';




const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (

    <div className="main-layout">
      <div className="container-fluid">
        <Header />
      </div>
      <div className="content-container px-6">{children}</div>

    </div>
  );
};

export default MainLayout;