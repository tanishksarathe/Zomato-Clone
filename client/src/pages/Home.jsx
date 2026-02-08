import React from "react";
import Hero from "../components/LandingPage/Hero";
import '../components/landingPage/landing.css';
import Features from "../components/LandingPage/Features";
import PopularRestaurants from "../components/LandingPage/PopularRestaurants";
import HowItWorks from "../components/LandingPage/HowItWorks";
import Riders from "../components/landingPage/Riders";
import CallToAction from "../components/landingPage/CallToAction";
import Footer from "../components/landingPage/Footer";
const Home = () => {
  return (
    <>
      <div className="h-full bg-(--color-background)">
        <Hero />
        <Features/>
        <PopularRestaurants/>
        <HowItWorks/>
        <Riders/>
        <CallToAction/>
        <Footer/>
      </div>
    </>
  );
};

export default Home;
