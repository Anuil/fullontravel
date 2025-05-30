"use client";

import { useEffect } from "react";

const SalesPartner = () => {
  useEffect(() => {
    console.log("Mounted");
    window.scrollTo(0, 0);
  }, []);

  return (
     <div className="customContainer">
      <div className="policies">
        <div className="header">
          <h2>Become a Sales Partner with FullOnTravel</h2>
        </div>
        <div className="document">
          <h6>Partner with Us to Inspire Travel and Earn Rewards</h6>
          <p>Join hands with FullOnTravel and become a part of our mission to create unforgettable travel experiences. As a sales partner, you'll have the opportunity to represent our exciting travel packages and earn attractive commissions while helping travelers explore the world.</p>
          <h5>Why Partner with Us?</h5>
          <ol>
            <li><strong>Comprehensive Product Portfolio:</strong> Access a wide range of curated travel experiences, from adventure tours and cultural journeys to solo travel and workation packages.</li>
            <li><strong>Attractive Commissions:</strong> Enjoy competitive commission rates on every booking you bring to our platform.</li>
            <li><strong>Flexible Work Options:</strong> Work on your own terms—whether full-time, part-time, or as a freelance sales partner.</li>
            <li><strong>Dedicated Training:</strong> Get access to sales resources, marketing materials, and training sessions to help you succeed.</li>
            <li><strong>Ongoing Support:</strong> Benefit from our team’s continuous guidance to address queries and grow your network.</li>
          </ol>
          <h5>What We Offer</h5>
          <ul>
            <li><strong>Tailored Travel Packages:</strong> Unique and personalized travel experiences that cater to off-beat destinations, eco-tourism, and local cultures.</li>
            <li><strong>User-Friendly Tools:</strong> Easily manage your leads, bookings, and commissions through our dedicated partner dashboard.</li>
            <li><strong>Marketing Assistance:</strong> Access to flyers, brochures, and digital materials to promote our packages effectively.</li>
          </ul>
          <h5>How It Works</h5>
          <ol>
            <li><strong>Sign Up:</strong> Register as a sales partner and provide your details.</li>
            <li><strong>Get Approved:</strong> Complete the onboarding process to start representing our travel packages.</li>
            <li><strong>Promote & Sell:</strong> Share our offerings with your network and generate bookings.</li>
            <li><strong>Earn Rewards:</strong> Receive commissions directly for every successful booking you bring in.</li>
          </ol>
          <h5>Who Can Join?</h5>
          <ul>
            <li>Individuals passionate about travel and sales.</li>
            <li>Travel agents looking to expand their portfolio.</li>
            <li>Entrepreneurs seeking additional income streams.</li>
          </ul>
          <h5>Start Your Journey Today</h5>
          <p>Partnering with FullOnTravel is easy and rewarding. Be part of a travel revolution that prioritizes unique, sustainable, and personalized experiences.</p>
          <h6>Ready to Begin?</h6>
          <p>Email us at <strong>hello@fullontravel.com</strong> to express your interest in becoming a sales partner and take the first step toward a rewarding journey with us!</p>
        </div>
      </div>
    </div>
  );
};

export default SalesPartner;
