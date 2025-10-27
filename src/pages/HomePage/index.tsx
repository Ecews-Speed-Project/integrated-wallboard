import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const HomePage: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(slideTimer);
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const slides = [
    {
      title: "Safest City in",
      subtitle: "the World.",
      description: "2 Millions Visitors Every Year",
      image: "/images/background.png"
    },
    {
      title: "Modern City",
      subtitle: "Infrastructure.",
      description: "2 Millions Visitors Every Year", 
      image: "/images/background.png"
    },
    {
      title: "Smart City",
      subtitle: "Technology.",
      description: "2 Millions Visitors Every Year",
      image: "/images/background.png"
    }
  ];

  return (
    <div className="homepage">
      {/* Top Header Bar */}
      <div className="top-header">
        <div className="container">
          <div className="top-header-content">
            <div className="top-header-left">
              <div className="social-links">
                <a href="#" className="social-link">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-pinterest-p"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
            <div className="top-header-center">
              <span className="contact-info">
                <i className="fas fa-envelope"></i>
                needhelp@company.com
              </span>
              <span className="hours">
                Open hours: Mon - Fri 8.00 am - 6.00 pm
              </span>
            </div>
            <div className="top-header-right">
              <div className="top-nav">
                <Link to="/council">Council</Link>
                <Link to="/government">Government</Link>
                <Link to="/complaints">Complaints</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="main-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <h1>Govity CITY GOVERNMENT</h1>
            </div>
            
            <nav className="main-nav">
              <Link to="/" className="nav-link active">Home</Link>
              <div className="nav-dropdown">
                <span className="nav-link">Pages</span>
                <div className="dropdown-menu">
                  <Link to="/about">About us</Link>
                  <Link to="/history">Our history</Link>
                  <Link to="/team">Team</Link>
                  <Link to="/portfolio">Portfolio</Link>
                  <Link to="/events">Events</Link>
                  <Link to="/pricing">Pricing</Link>
                  <Link to="/faq">FAQs</Link>
                </div>
              </div>
              <div className="nav-dropdown">
                <span className="nav-link">Services</span>
                <div className="dropdown-menu">
                  <Link to="/services">Services</Link>
                  <Link to="/building-permission">Building permission</Link>
                  <Link to="/driving-license">Driving license</Link>
                  <Link to="/report-pollution">Report pollution</Link>
                  <Link to="/parking-permission">Parking permission</Link>
                  <Link to="/tax-return">Tax return</Link>
                  <Link to="/birth-certificate">Birth certificate</Link>
                </div>
              </div>
              <div className="nav-dropdown">
                <span className="nav-link">Departments</span>
                <div className="dropdown-menu">
                  <Link to="/departments">Departments</Link>
                  <Link to="/department-details">Department details</Link>
                </div>
              </div>
              <div className="nav-dropdown">
                <span className="nav-link">News</span>
                <div className="dropdown-menu">
                  <Link to="/news">News</Link>
                  <Link to="/news-sidebar">News sidebar</Link>
                  <Link to="/news-details">News details</Link>
                </div>
              </div>
              <div className="nav-dropdown">
                <span className="nav-link">Shop</span>
                <div className="dropdown-menu">
                  <Link to="/shop">Shop</Link>
                  <Link to="/shop-details">Shop details</Link>
                  <Link to="/cart">Cart</Link>
                  <Link to="/checkout">Checkout</Link>
                </div>
              </div>
              <Link to="/contact" className="nav-link">Contact</Link>
            </nav>

            <div className="header-right">
              <div className="call-info">
                <i className="fas fa-phone"></i>
                <div>
                  <span>Call Anytime</span>
                  <strong>+92 (1234) 0800</strong>
                </div>
              </div>
              <div className="search-box">
                <i className="fas fa-search"></i>
              </div>
              <div className="language-selector">
                <img src="/images/uk-flag.png" alt="English" />
                <span>English</span>
                <i className="fas fa-chevron-down"></i>
              </div>
              <Link to="/signin" className="signin-btn">
                Sign In
              </Link>
              <Link to="/report-issue" className="report-btn">
                Report Issue
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-slider">
          {slides.map((slide, index) => (
            <div 
              key={index}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="hero-overlay">
                <div className="container">
                  <div className="hero-content">
                    <div className="hero-text">
                      <p className="hero-description">{slide.description}</p>
                      <h2 className="hero-title">
                        {slide.title}<br />
                        <span>{slide.subtitle}</span>
                      </h2>
                      <Link to="/discover" className="hero-btn">
                        Discover More
                      </Link>
                    </div>
                    <div className="hero-image">
                      <img src="/images/hero-person.png" alt="City representative" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="slider-controls">
          <button className="slider-btn prev">
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="slider-btn next">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        
        <div className="slider-dots">
          {slides.map((_, index) => (
            <button 
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Quick Services Section */}
      <section className="quick-services">
        <div className="container">
          <div className="services-grid">
            <div className="service-card">
              <i className="fas fa-building"></i>
              <h3>Your Government</h3>
            </div>
            <div className="service-card">
              <i className="fas fa-briefcase"></i>
              <h3>Jobs & Unemployment</h3>
            </div>
            <div className="service-card">
              <i className="fas fa-industry"></i>
              <h3>Business & Industrials</h3>
            </div>
            <div className="service-card">
              <i className="fas fa-road"></i>
              <h3>Roads & Transportation</h3>
            </div>
            <div className="service-card">
              <i className="fas fa-theater-masks"></i>
              <h3>Culture & Recreations</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Footer Bar */}
      <div className="bottom-footer">
        <div className="container">
          <div className="footer-content">
            <div className="weather-info">
              <i className="fas fa-sun"></i>
              <span>TODAY: 32°C</span>
            </div>
            <div className="time-info">
              <i className="fas fa-clock"></i>
              <span>TIME: {formatTime(currentTime)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
