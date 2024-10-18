import React, { useState, useEffect, FormEvent } from 'react';
import { Plane, Stethoscope, Users, Coffee, AlertCircle } from 'lucide-react';
import '../../index.css';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/auth/authThunks';
import { AppDispatch, RootState } from '../../store';
// Define the slide interface
interface Slide {
  icon: React.ElementType;
  label: string;
  image: string;
}

// Define the Stat component props
interface StatProps {
  label: string;
  value: string;
  color: string;
}

// Define the IconBox component props
interface IconBoxProps {
  icon: React.ReactNode;
  active: boolean;
}

const SignIn: React.FC = () => {
  const [email, setUsername] = useState<string>('osun@speed.com');
  const [password, setPassword] = useState<string>('P@ssw0rd');
  const [currentBgIndex, setCurrentBgIndex] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);



  const slides: Slide[] = [
    { icon: Plane, label: 'Travel', image: '/images/slider/large/slide1.jpg' },
    { icon: Stethoscope, label: 'Medical', image: '/images/slider/large/slide2.jpg' },
    { icon: Users, label: 'Community', image: '/images/slider/large/slide3.jpg' },
    { icon: Coffee, label: 'Lifestyle', image: '/images/slider/large/slide4.jpg' },
    { icon: AlertCircle, label: 'Alert', image: '/images/slider/large/slide5.jpg' },
  ];

  useEffect(() => {
    const bgInterval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(bgInterval);
      clearInterval(timeInterval);
    };
  }, []);

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const handleSignIn = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    /* setIsLoading(true);
    setError('');
 */
    try {

      await dispatch(login({ email, password })).unwrap();


      navigate('/dashboard');
    } catch {
      // Error is handled by the thunk and stored in Redux state
    }

    // Implement sign-in logic here
  /*   try {
      await dispatch(login({ username, password })).unwrap();
      navigate('/user-info'); // Simulate a network request
    } catch (error) {
      setError('Sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    } */
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      <div className="relative flex-1">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: `url(${slide.image})`,
              opacity: index === currentBgIndex ? 1 : 0,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="p-8">
            <div className="flex justify-between mb-8">
              <div>
                <h2 className="text-4xl font-bold mb-2">Integrated Disease</h2>
                <h1 className="text-6xl font-bold">WALLBOARD</h1>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">{formatTime(currentTime)}</p>
                <p>{formatDate(currentTime)}</p>
              </div>
            </div>
            <div className="flex space-x-8 mb-8">
              <Stat label="Total Cases" value="1000" color="text-red-500" />
              <Stat label="Total Reached" value="1000" color="text-green-500" />
              <Stat label="Total States Covered" value="27" color="text-white" />
            </div>
            <div className="flex space-x-4 mb-8">
              {slides.map((slide, index) => (
                <img key={index} src={`/images/slider/thumbnail/${index + 1}.png`} alt={`Thumbnail ${index}`} style={{
                  border: index === currentBgIndex ? '2px solid #ffffff' : 'none',
                  outline: index === currentBgIndex ? '1px solid #ffffff' : 'none',
                  boxShadow: index === currentBgIndex ? '0 0 10px rgba(0, 255, 0, 0.5)' : 'none',
                  borderRadius: 10,
                  margin: '5px',
                  transition: 'all 0.3s ease'
                }} />
                //  <IconBox key={index} icon={<slide.icon size={24} />} active={index === currentBgIndex} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-96 bg-gray-800 p-8 flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              type="text"
              id="email"
              className="w-full p-2 bg-gray-700 rounded"
              value={email}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-2 bg-gray-700 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={isLoading} className="p-2 bg-blue-500 text-white rounded">
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
         
        </form>
      </div>

      <div className="absolute bottom-4 left-4 flex space-x-4">
        <img src="/images/pepfar-logo.svg" alt="PEPFAR logo" className="h-8" />
        <img src="/images/cdc.svg" alt="CDC logo" className="h-8" />
        <img src="/images/ecews.svg" alt="ECEWS logo" className="h-8" />
        <img src="/images/nigeria.svg" alt="Nigeria coat of arms" className="h-8" />
      </div>
    </div>
  );
};

const Stat: React.FC<StatProps> = ({ label, value, color }) => (
  <div>
    <p className={`text-4xl font-bold ${color}`}>{value}</p>
    <p className="text-sm">{label}</p>
  </div>
);

const IconBox: React.FC<IconBoxProps> = ({ icon, active }) => (
  <div className={`bg-white bg-opacity-20 p-2 rounded transition-all duration-300 ${active ? 'scale-110 bg-opacity-40' : ''}`}>
    {icon}
  </div>
);

export default SignIn;
