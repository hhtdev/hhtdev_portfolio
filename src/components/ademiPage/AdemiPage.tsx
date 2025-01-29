import React, { useEffect } from "react";
import { BackToOrbitComponent } from "../backToOrbitComponent/BackToOrbitComponent";
import "./AdemiPage.scss";

interface AdemiProps {
  display: boolean;
  closePage: () => void;
}

export const AdemiPage: React.FC<AdemiProps> = (AdemiProps) => {

  const displayPageContent = React.useCallback((display: boolean) => {
    const ademiPage = document.querySelector("#ademi-page") as HTMLElement;
    if (display) {
      ademiPage.style.display = "block";
      ademiPage.style.animation = "fadeIn 0.5s";
    } else {
      ademiPage.style.animation = "fadeOut 0.3s";
      ademiPage.addEventListener("animationend", (animation) => {
        if (animation.animationName === "fadeOut") {
          ademiPage.style.display = "none";
          AdemiProps.closePage();
        }
      });
    }
  }, [AdemiProps]);

  useEffect(() => {
    displayPageContent(AdemiProps.display);
  }, [AdemiProps.display, displayPageContent]);

  return (
    <div id="ademi-page" className="containers-pages">
      <div className="containers-pages-grid">
        <div className="containers-pages-content-left containers">
          <h1>Première expérience en alternance</h1>
          <p>En 2018, peu de temps avant l'examen de mon BTS SIO (Services Informatiques aux Organisations), je commence à activement chercher une alternance pour poursuivre mes études</p>
          <h2>Ademi Pesage</h2>
          <p>
            Présentation rapide avec un lien et le logo ?
          </p>
          <p>
            Ce que j'ai fait au début sur le projet, la première expérience en entreprise et les premières notions de gestion de projet
          </p>
          <p>
            Le mobile first ionic, le nosql et le offline first
          </p>
          <p>
            Les difficultés rencontrées
          </p>
        </div>
        <div className="containers-pages-content-right containers">
          <h2>L'école</h2>
          <p>
            IMIE puis Campus Academy
          </p>
          <p>
            Le diplome de CDA
          </p>
          <p>
            Les techs abordées
          </p>
        </div>
        <div className="containers-btn-return-orbit">
          <button className="btn-return-orbit" onClick={() => { displayPageContent(false) }}><BackToOrbitComponent display={true} /></button>
        </div>
      </div>
    </div>
  );
};