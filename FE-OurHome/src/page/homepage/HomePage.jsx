import React from "react";
import "./HomePage.css";
import '../../Assets/Asset/Reset.css'
import '../../Assets/Asset/Global.css'
// Import các components theo thư mục của bạn
import Navbar from "../../components/Navigation/Header";
import Banner from "../../components/Banner/Banner";
import Agents from "../../components/Agents/Agents";
import CustomerComments from "../../components/Comments/CustomerComments";
import Footer from "../../components/Footer/Footer";
import Chatbot from "../../components/ChatBot/chatbot";
import PropertyList from "../../components/ListProperty/PropertyList";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import About from "../../components/About/About";
import HowItWork from "../../components/HowItWork/HowItWork";



const HomePage = () => {
  return (
    <div className="home-container">
      {/* Hero Banner Section */}
      <section className="banner-section fade-in">
        {/* Header Navigation */}
        <Navbar />
        <Banner />
      </section>

        <section className="about">
            {/* Header Navigation */}
            <About />
        </section>

        {/* Featured Properties Section */}
        <section className="section property-section-city fade-in">

            <PropertyList />
        </section>

        <section className="section property-section-city fade-in">

            <PropertyCard />
        </section>

        <section className="section hie-section fade-in">

            <HowItWork />
        </section>


        <section className=" testimonials-section fade-in">
            <div className="section">
                <CustomerComments />
            </div>

        </section>
      {/* Our Experts Section */}
      <section className="section agents-section fade-in">

        <Agents />
      </section>

      {/* Testimonials Section */}


      {/* Chatbot Support */}
      <div className="chatbot-container">
        <Chatbot />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
