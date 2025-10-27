import { FunctionComponent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { logout } from "../../features/auth/authSlice";

const Header: FunctionComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const toggleMobileSubmenu = (menu: string) => {
    setActiveMobileMenu(activeMobileMenu === menu ? null : menu);
  };

  const handleDropdownEnter = (menu: string) => {
    setActiveDropdown(menu);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <header className="bg-[#2E7D32] text-white shadow-lg">
      <div className="max-w-full px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <img src="/images/ecews-logo.png" alt="ECEWS" className="h-10 w-auto" />
            <div>
              <h1 className="text-lg font-semibold leading-tight">ECEWS Dashboard</h1>
              <p className="text-xs opacity-90">Early Childhood Education Workforce System</p>
            </div>
          </div>

          {/* Main Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-1">
            {/* Dashboard Mega Menu */}
            <div 
              className="relative"
              onMouseEnter={() => handleDropdownEnter('dashboard')}
              onMouseLeave={handleDropdownLeave}
            >
              <button className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-[#1B5E20] transition-all duration-150">
                <i className="fas fa-home text-lg"></i>
                <span>Dashboard</span>
                <i className={`fas fa-chevron-down text-xs ml-1 transition-transform duration-200 ${activeDropdown === 'dashboard' ? 'rotate-180' : ''}`}></i>
              </button>
              <div className={`absolute top-full left-0 w-[280px] bg-white rounded-lg shadow-lg transition-all duration-200 transform ${activeDropdown === 'dashboard' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'} z-[100]`}>
                <div className="p-4">
                  <h3 className="text-[#2E7D32] font-semibold mb-2">Dashboard Options</h3>
                  <div className="grid gap-2">
                    <Link to="/dashboard/overview" className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 text-gray-700">
                      <i className="fas fa-chart-line w-5"></i>
                      <div>
                        <div className="font-medium">Overview</div>
                        <div className="text-xs text-gray-500">System-wide statistics</div>
                      </div>
                    </Link>
                    <Link to="/dashboard/analytics" className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 text-gray-700">
                      <i className="fas fa-chart-bar w-5"></i>
                      <div>
                        <div className="font-medium">Analytics</div>
                        <div className="text-xs text-gray-500">Detailed data analysis</div>
                      </div>
                    </Link>
                    <Link to="/dashboard/reports" className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 text-gray-700">
                      <i className="fas fa-file-alt w-5"></i>
                      <div>
                        <div className="font-medium">Reports</div>
                        <div className="text-xs text-gray-500">Generated reports</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Mega Menu */}
            <div 
              className="relative"
              onMouseEnter={() => handleDropdownEnter('services')}
              onMouseLeave={handleDropdownLeave}
            >
              <button className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-[#1B5E20] transition-all duration-150">
                <i className="fas fa-cog text-lg"></i>
                <span>Services</span>
                <i className={`fas fa-chevron-down text-xs ml-1 transition-transform duration-200 ${activeDropdown === 'services' ? 'rotate-180' : ''}`}></i>
              </button>
              <div className={`absolute top-full left-0 w-[540px] bg-white rounded-lg shadow-lg transition-all duration-200 transform ${activeDropdown === 'services' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'} z-[100]`}>
                <div className="p-4">
                  <h3 className="text-[#2E7D32] font-semibold mb-3">Our Services</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Education</h4>
                      <div className="space-y-2">
                        <Link to="/services/courses" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50 text-gray-700">
                          <i className="fas fa-graduation-cap w-5"></i>
                          <span>Training Courses</span>
                        </Link>
                        <Link to="/services/workshops" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50 text-gray-700">
                          <i className="fas fa-chalkboard-teacher w-5"></i>
                          <span>Workshops</span>
                        </Link>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Support</h4>
                      <div className="space-y-2">
                        <Link to="/services/consulting" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50 text-gray-700">
                          <i className="fas fa-comments w-5"></i>
                          <span>Consulting</span>
                        </Link>
                        <Link to="/services/resources" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50 text-gray-700">
                          <i className="fas fa-book w-5"></i>
                          <span>Resources</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Projects Menu */}
            <div 
              className="relative"
              onMouseEnter={() => handleDropdownEnter('projects')}
              onMouseLeave={handleDropdownLeave}
            >
              <button className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-[#1B5E20] transition-all duration-150">
                <i className="fas fa-project-diagram text-lg"></i>
                <span>Projects</span>
                <i className={`fas fa-chevron-down text-xs ml-1 transition-transform duration-200 ${activeDropdown === 'projects' ? 'rotate-180' : ''}`}></i>
              </button>
              <div className={`absolute top-full left-0 w-[280px] bg-white rounded-lg shadow-lg transition-all duration-200 transform ${activeDropdown === 'projects' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'} z-[100]`}>
                <div className="p-4">
                  <div className="space-y-2">
                    <Link to="/projects/active" className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 text-gray-700">
                      <i className="fas fa-play-circle w-5 text-green-600"></i>
                      <div>
                        <div className="font-medium">Active Projects</div>
                        <div className="text-xs text-gray-500">Currently running</div>
                      </div>
                    </Link>
                    <Link to="/projects/upcoming" className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 text-gray-700">
                      <i className="fas fa-calendar w-5 text-blue-600"></i>
                      <div>
                        <div className="font-medium">Upcoming</div>
                        <div className="text-xs text-gray-500">Future projects</div>
                      </div>
                    </Link>
                    <Link to="/projects/completed" className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 text-gray-700">
                      <i className="fas fa-check-circle w-5 text-gray-600"></i>
                      <div>
                        <div className="font-medium">Completed</div>
                        <div className="text-xs text-gray-500">Past projects</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Menu */}
            <div 
              className="relative"
              onMouseEnter={() => handleDropdownEnter('team')}
              onMouseLeave={handleDropdownLeave}
            >
              <button className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-[#1B5E20] transition-all duration-150">
                <i className="fas fa-users text-lg"></i>
                <span>Team</span>
                <i className={`fas fa-chevron-down text-xs ml-1 transition-transform duration-200 ${activeDropdown === 'team' ? 'rotate-180' : ''}`}></i>
              </button>
              <div className={`absolute top-full left-0 w-[280px] bg-white rounded-lg shadow-lg transition-all duration-200 transform ${activeDropdown === 'team' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'} z-[100]`}>
                <div className="p-4">
                  <div className="space-y-2">
                    <Link to="/team/members" className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 text-gray-700">
                      <i className="fas fa-user-friends w-5 text-blue-600"></i>
                      <div>
                        <div className="font-medium">Team Members</div>
                        <div className="text-xs text-gray-500">View all members</div>
                      </div>
                    </Link>
                    <Link to="/team/departments" className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 text-gray-700">
                      <i className="fas fa-building w-5 text-purple-600"></i>
                      <div>
                        <div className="font-medium">Departments</div>
                        <div className="text-xs text-gray-500">Department overview</div>
                      </div>
                    </Link>
                    <Link to="/team/schedule" className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 text-gray-700">
                      <i className="fas fa-calendar-alt w-5 text-green-600"></i>
                      <div>
                        <div className="font-medium">Schedule</div>
                        <div className="text-xs text-gray-500">Team calendar</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Plants & Nature Menu */}
            <div 
              className="relative"
              onMouseEnter={() => handleDropdownEnter('plants')}
              onMouseLeave={handleDropdownLeave}
            >
              <button className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-[#1B5E20] transition-all duration-150">
                <i className="fas fa-leaf text-lg"></i>
                <span>Plants & Nature</span>
                <i className={`fas fa-chevron-down text-xs ml-1 transition-transform duration-200 ${activeDropdown === 'plants' ? 'rotate-180' : ''}`}></i>
              </button>
              <div className={`absolute top-full right-0 w-[280px] bg-white rounded-lg shadow-lg transition-all duration-200 transform ${activeDropdown === 'plants' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'} z-[100]`}>
                <div className="p-4">
                  <div className="space-y-2">
                    <Link to="/plants/catalog" className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 text-gray-700">
                      <i className="fas fa-seedling w-5 text-green-600"></i>
                      <div>
                        <div className="font-medium">Plant Catalog</div>
                        <div className="text-xs text-gray-500">Browse plants</div>
                      </div>
                    </Link>
                    <Link to="/plants/gardens" className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 text-gray-700">
                      <i className="fas fa-tree w-5 text-green-700"></i>
                      <div>
                        <div className="font-medium">Gardens</div>
                        <div className="text-xs text-gray-500">Garden layouts</div>
                      </div>
                    </Link>
                    <Link to="/plants/conservation" className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 text-gray-700">
                      <i className="fas fa-leaf w-5 text-green-500"></i>
                      <div>
                        <div className="font-medium">Conservation</div>
                        <div className="text-xs text-gray-500">Protection efforts</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Right Side Items */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div 
              className="relative"
              onMouseEnter={() => handleDropdownEnter('notifications')}
              onMouseLeave={handleDropdownLeave}
            >
              <button className="relative p-2 rounded-full hover:bg-[#1B5E20] transition-all duration-150">
                <i className="fas fa-bell text-lg"></i>
                <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-red-500 text-white rounded-full">
                  3
                </span>
              </button>
              <div className={`absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg transition-all duration-200 transform ${activeDropdown === 'notifications' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'} z-[100]`}>
                <div className="p-4">
                  <h3 className="text-gray-900 font-semibold mb-2">Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                        <i className="fas fa-info"></i>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">New project update available</p>
                        <p className="text-xs text-gray-500">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                        <i className="fas fa-check"></i>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">Task completed successfully</p>
                        <p className="text-xs text-gray-500">1 hour ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded">
                      <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500">
                        <i className="fas fa-exclamation"></i>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">System maintenance scheduled</p>
                        <p className="text-xs text-gray-500">5 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <Link to="/notifications" className="text-sm text-[#2E7D32] hover:text-[#1B5E20] font-medium">
                      View all notifications
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* User Profile */}
            <div 
              className="relative"
              onMouseEnter={() => handleDropdownEnter('profile')}
              onMouseLeave={handleDropdownLeave}
            >
              <button className="flex items-center space-x-3 p-2 rounded-md hover:bg-[#1B5E20] transition-all duration-150">
                <span className="text-sm font-medium hidden md:block">{userData.fullName || 'John Doe'}</span>
                <img 
                  src="/images/avatar.png" 
                  alt="Profile" 
                  className="h-8 w-8 rounded-full border-2 border-white object-cover"
                />
                <i className={`fas fa-chevron-down text-xs transition-transform duration-200 ${activeDropdown === 'profile' ? 'rotate-180' : ''}`}></i>
              </button>
              <div className={`absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg transition-all duration-200 transform ${activeDropdown === 'profile' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'} z-[100]`}>
                <div className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <img 
                      src="/images/avatar.png" 
                      alt="Profile" 
                      className="h-10 w-10 rounded-full border-2 border-gray-200 object-cover"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{userData.fullName || 'John Doe'}</div>
                      <div className="text-xs text-gray-500">{userData.email || 'john@example.com'}</div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Link 
                      to="/profile" 
                      className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50 text-gray-700"
                    >
                      <i className="fas fa-user w-5"></i>
                      <span>Your Profile</span>
                    </Link>
                    <Link 
                      to="/settings" 
                      className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50 text-gray-700"
                    >
                      <i className="fas fa-cog w-5"></i>
                      <span>Settings</span>
                    </Link>
                    <Link 
                      to="/help" 
                      className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50 text-gray-700"
                    >
                      <i className="fas fa-question-circle w-5"></i>
                      <span>Help Center</span>
                    </Link>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 p-2 w-full rounded text-left text-red-600 hover:bg-red-50"
                    >
                      <i className="fas fa-sign-out-alt w-5"></i>
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-[#1B5E20] transition-all duration-150"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-[#4CAF50] space-y-2">
            {/* Dashboard Mobile */}
            <div className="px-4">
              <button 
                onClick={() => toggleMobileSubmenu('dashboard')}
                className="flex items-center justify-between w-full p-2 rounded-md hover:bg-[#1B5E20] transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <i className="fas fa-home w-5"></i>
                  <span>Dashboard</span>
                </div>
                <i className={`fas fa-chevron-${activeMobileMenu === 'dashboard' ? 'up' : 'down'} text-sm transition-transform duration-200`}></i>
              </button>
              {activeMobileMenu === 'dashboard' && (
                <div className="mt-2 ml-7 space-y-1">
                  <Link to="/dashboard/overview" className="block p-2 text-sm rounded-md hover:bg-[#1B5E20]">Overview</Link>
                  <Link to="/dashboard/analytics" className="block p-2 text-sm rounded-md hover:bg-[#1B5E20]">Analytics</Link>
                  <Link to="/dashboard/reports" className="block p-2 text-sm rounded-md hover:bg-[#1B5E20]">Reports</Link>
                </div>
              )}
            </div>

            {/* Services Mobile */}
            <div className="px-4">
              <button 
                onClick={() => toggleMobileSubmenu('services')}
                className="flex items-center justify-between w-full p-2 rounded-md hover:bg-[#1B5E20] transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <i className="fas fa-cog w-5"></i>
                  <span>Services</span>
                </div>
                <i className={`fas fa-chevron-${activeMobileMenu === 'services' ? 'up' : 'down'} text-sm transition-transform duration-200`}></i>
              </button>
              {activeMobileMenu === 'services' && (
                <div className="mt-2 ml-7 space-y-1">
                  <Link to="/services/education" className="block p-2 text-sm rounded-md hover:bg-[#1B5E20]">Education Services</Link>
                  <Link to="/services/training" className="block p-2 text-sm rounded-md hover:bg-[#1B5E20]">Training Programs</Link>
                  <Link to="/services/consulting" className="block p-2 text-sm rounded-md hover:bg-[#1B5E20]">Consulting</Link>
                </div>
              )}
            </div>

            {/* Projects Mobile */}
            <div className="px-4">
              <button 
                onClick={() => toggleMobileSubmenu('projects')}
                className="flex items-center justify-between w-full p-2 rounded-md hover:bg-[#1B5E20] transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <i className="fas fa-project-diagram w-5"></i>
                  <span>Projects</span>
                </div>
                <i className={`fas fa-chevron-${activeMobileMenu === 'projects' ? 'up' : 'down'} text-sm transition-transform duration-200`}></i>
              </button>
              {activeMobileMenu === 'projects' && (
                <div className="mt-2 ml-7 space-y-1">
                  <Link to="/projects/active" className="block p-2 text-sm rounded-md hover:bg-[#1B5E20]">Active Projects</Link>
                  <Link to="/projects/completed" className="block p-2 text-sm rounded-md hover:bg-[#1B5E20]">Completed Projects</Link>
                  <Link to="/projects/upcoming" className="block p-2 text-sm rounded-md hover:bg-[#1B5E20]">Upcoming Projects</Link>
                </div>
              )}
            </div>

            {/* Team Mobile */}
            <div className="px-4">
              <button 
                onClick={() => toggleMobileSubmenu('team')}
                className="flex items-center justify-between w-full p-2 rounded-md hover:bg-[#1B5E20] transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <i className="fas fa-users w-5"></i>
                  <span>Team</span>
                </div>
                <i className={`fas fa-chevron-${activeMobileMenu === 'team' ? 'up' : 'down'} text-sm transition-transform duration-200`}></i>
              </button>
              {activeMobileMenu === 'team' && (
                <div className="mt-2 ml-7 space-y-1">
                  <Link to="/team/members" className="block p-2 text-sm rounded-md hover:bg-[#1B5E20]">Team Members</Link>
                  <Link to="/team/departments" className="block p-2 text-sm rounded-md hover:bg-[#1B5E20]">Departments</Link>
                  <Link to="/team/schedule" className="block p-2 text-sm rounded-md hover:bg-[#1B5E20]">Schedule</Link>
                </div>
              )}
            </div>

            {/* Plants & Nature Mobile */}
            <div className="px-4">
              <button 
                onClick={() => toggleMobileSubmenu('plants')}
                className="flex items-center justify-between w-full p-2 rounded-md hover:bg-[#1B5E20] transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <i className="fas fa-leaf w-5"></i>
                  <span>Plants & Nature</span>
                </div>
                <i className={`fas fa-chevron-${activeMobileMenu === 'plants' ? 'up' : 'down'} text-sm transition-transform duration-200`}></i>
              </button>
              {activeMobileMenu === 'plants' && (
                <div className="mt-2 ml-7 space-y-1">
                  <Link to="/plants/catalog" className="block p-2 text-sm rounded-md hover:bg-[#1B5E20]">Plant Catalog</Link>
                  <Link to="/plants/gardens" className="block p-2 text-sm rounded-md hover:bg-[#1B5E20]">Gardens</Link>
                  <Link to="/plants/conservation" className="block p-2 text-sm rounded-md hover:bg-[#1B5E20]">Conservation</Link>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
