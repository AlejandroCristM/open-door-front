import React from "react";
import LandingImage from "../assets/LandingPage1.jpg";
import LandingImage2 from "../assets/LandingPage2.jpg";
import OpenDoorIcon from "../assets/openDoorIcon.svg";
import LeanTechLogo from "../assets/leanTechLogo.svg";
import LogoUdea from "../assets/logoUdea.png";
import "../styles/home.css";

export default function Home() {

  return (
    <section className="w-full">

      <section className="flex flex-col justify-center items-center md:flex-row lg:px-20 lg:py-5">
        <div className="textContainer">
          <h1 className="mainTitle text-orange-lt">
            Le damos la bienvenida a Open Door platform
          </h1>
          <p className="textHome text-gray-lt">
            Esta es una plataforma de aprendizaje que permite facilitar el proceso de onboarding de nuevos colaboradores para las empresas.
          </p>
        </div>
        <picture className="w-full md:w-1/2">
          <img src={LandingImage} alt="online course" />
        </picture>
      </section>

      <section className="flex flex-col-reverse justify-center items-center mt-5 md:mt-0 md:flex-row lg:px-20 lg:py-5">
        <picture className="w-full md:w-1/2">
          <img src={LandingImage2} alt="Team working" />
        </picture>
        <div className="textContainer">
          <h1 className="mainTitle text-blue-lt">
            Agiliza y mejora la efectividad de tu proceso de onboarding
          </h1>
          <p className="textHome text-gray-lt">
            Nuestros clientes han logrado reducir el tiempo de onboarding de sus colaboradores en un 50%, de acuerdo a sus propias métricas.
          </p>
        </div>
      </section>

      <section className="flex flex-col mt-10 bg-black">
        <h2 className="text-white font-bold text-lg text-center mt-10 lg:text-xl">Aliados</h2>
        <div className="flex flex-col space-y-10  justify-center items-center pt-5 pb-10 md:flex-row md:space-y-0">
          <picture className="homeLogoContainer">
            <img className="homeLogo" src={LogoUdea} alt="Open Door Logo" />
          </picture>
          <picture className="homeLogoContainer">
            <img className="homeLogo" src={OpenDoorIcon} alt="Open Door Logo" />
          </picture>
          <picture className="homeLogoContainer">
            <img className="homeLogo" src={LeanTechLogo} alt="Open Door Logo" />
          </picture>
        </div>
      </section>

    </section>
  );
}
