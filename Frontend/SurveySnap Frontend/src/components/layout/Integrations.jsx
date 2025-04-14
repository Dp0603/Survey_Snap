import React from "react";
import "../styles/Integrations.css";

// 🔹 Hardcoded Imports for Brand Logos
import apple from "../../assets/logos/apple.png";
import bmw from "../../assets/logos/bmw.png";
import kia from "../../assets/logos/kia.png";
import microsoft from "../../assets/logos/microsoft.png";
import prime from "../../assets/logos/prime.png";
import ronaldo from "../../assets/logos/ronaldo.png";
import underarmour from "../../assets/logos/underarmour.png";
import assassinscreed from "../../assets/logos/assassinscreed.png";
import dell from "../../assets/logos/dell.png";
import lamborghini from "../../assets/logos/lamborghini.png";
import netflix from "../../assets/logos/netflix.png";
import pubg from "../../assets/logos/pubg.png";
import skechers from "../../assets/logos/skechers.png";
import valorant from "../../assets/logos/valorant.png";
import audi from "../../assets/logos/audi.png";
import emirates from "../../assets/logos/emirates.png";
import louisphilippe from "../../assets/logos/louisphilippe.png";
import nike from "../../assets/logos/nike.png";
import rcb from "../../assets/logos/rcb.png";
import spotify from "../../assets/logos/spotify.png";
import vi from "../../assets/logos/vi.png";
import bjp from "../../assets/logos/bjp.png";
import iqoo from "../../assets/logos/iqoo.png";
import mcdonalds from "../../assets/logos/mcdonalds.png";
import s8ul from "../../assets/logos/s8ul.png";
import realmadrid from "../../assets/logos/realmadrid.png";
import supercell from "../../assets/logos/supercell.png";
import youtube from "../../assets/logos/youtube.png";
import hdfc from "../../assets/logos/hdfc.png";
import armani from "../../assets/logos/armani.png";

// 🔹 Split logos into 3 rows (10 per row)
const topRow = [apple, bmw, kia, microsoft, prime, ronaldo, underarmour, assassinscreed, dell, lamborghini];
const middleRow = [netflix, pubg, skechers, valorant, audi, emirates, louisphilippe, nike, rcb, spotify];
const bottomRow = [vi, bjp, iqoo, mcdonalds, s8ul, realmadrid, supercell, youtube, hdfc, armani];

// 🔹 Function to Render Infinite Logo Row
const LogoRow = ({ logos, animationClass }) => {
  return (
    <div className="slider-row">
      <div className={`slider-track ${animationClass}`}>
        {[...logos, ...logos].map((logo, index) => (
          <img key={index} src={logo} alt="Partner Logo" className="integration-logo" />
        ))}
      </div>
    </div>
  );
};

const Integrations = () => {
  return (
    <section id="integrations" className="integrations-section">
      {/* 🔹 Integrations Title */}
      <h2 className="integrations-title">Integrations</h2>
      <p className="integrations-description">
        Seamlessly connect with the tools you use every day.
      </p>

      {/* 🔹 Moving Brand Logos */}
      <div className="integrations-slider">
        <LogoRow logos={topRow} animationClass="scroll-left" />
        <LogoRow logos={middleRow} animationClass="scroll-right" />
        <LogoRow logos={bottomRow} animationClass="scroll-left" />
      </div>
    </section>
  );
};

export default Integrations;
