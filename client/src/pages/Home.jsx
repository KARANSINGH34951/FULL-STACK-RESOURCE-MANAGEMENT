import React from 'react';
import { useNavigate } from 'react-router-dom';
import RoleHighlights from '../components/RoleHighlights';
import FeatureSection from '../components/FeatureSection';
import UseCaseSlider from '../components/UseCaseSlider';
import Footer from '../components/Footer';
import { User } from 'lucide-react';
import HowItWorks from '../components/HowItWorks.jsx';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      {/* Hero Section with Background */}
      <div className="relative h-screen ">
        {/* Background Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-45"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1950&q=80')`,
          }}
        ></div>

        {/* Navbar */}
        {/* <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 bg-black bg-opacity-60">
          <div className="text-2xl font-bold text-[#8980F5]">EventX</div>
          <div className="space-x-4">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-[#8980F5] hover:bg-[#7a6bcf] text-white rounded"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="px-4 py-2 border border-[#7a6bcf] text-[#8980F5] hover:bg-[#7a6bcf] hover:text-white rounded"
            >
              Signup
            </button>
          </div>
        </nav> */}

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Plan. Organize. Celebrate.
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-6">
            Your all-in-one solution for seamless event management and resource allocation.
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded text-lg font-medium"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Role-Based Highlights Section */}
      <RoleHighlights />
      <FeatureSection/>
      <UseCaseSlider />
      <HowItWorks />
      <Footer/>
    </div>
  );
};

export default Home;
