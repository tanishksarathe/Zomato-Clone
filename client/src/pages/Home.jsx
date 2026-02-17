import React from "react";
import Hero from "../components/LandingPage/Hero";
import "../components/landingPage/landing.css";
import Features from "../components/LandingPage/Features";
import PopularRestaurants from "../components/LandingPage/PopularRestaurants";
import HowItWorks from "../components/LandingPage/HowItWorks";
import Riders from "../components/landingPage/Riders";
import CallToAction from "../components/landingPage/CallToAction";
import Footer from "../components/landingPage/Footer";
import adv from "/public/videos/Firefly Cinematic montage with fluid transitions. Start with a close-up of steam rising from a gourm.mp4?url";

const Home = () => {
  return (
    <>
      <div className="h-full bg-(--color-background) scroll-smooth">
        <video loop controls autoPlay muted className="h-[138vh] inset-0 w-full object-fill absolute">
          <source src={adv} type="video/mp4"/>
        </video>
        <Hero />
        <Features />
        <PopularRestaurants />
        <HowItWorks />
        <Riders />
        <CallToAction />
        <Footer />
      </div>
    </>
  );
};

export default Home;
