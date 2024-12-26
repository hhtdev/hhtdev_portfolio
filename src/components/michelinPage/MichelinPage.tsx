import React, { useEffect } from "react";
import { BackToOrbitComponent } from "../backToOrbitComponent/BackToOrbitComponent";
import "./MichelinPage.scss";

interface MichelinProps {
  display: boolean;
  closePage: () => void;
}

export const MichelinPage: React.FC<MichelinProps> = (MichelinProps) => {

  const displayPageContent = React.useCallback((display: boolean) => {
    const michelinPage = document.querySelector("#michelin-page") as HTMLElement;
    if (display) {
      michelinPage.style.display = "block";
      michelinPage.style.animation = "fadeIn 0.5s";
    } else {
      michelinPage.style.animation = "fadeOut 0.3s";
      michelinPage.addEventListener("animationend", (animation) => {
        if (animation.animationName === "fadeOut") {
          michelinPage.style.display = "none";
          MichelinProps.closePage();
        }
      });
    }
  }, [MichelinProps]);

  useEffect(() => {
    displayPageContent(MichelinProps.display);
  }, [MichelinProps.display, displayPageContent]);

  return (
    <div id="michelin-page" className="containers-pages">
      <div className="containers-pages-grid">
        <div className="containers-pages-content-left containers">
          <h1>Seconde éxpérience en alternance</h1>
          <h2>Michelin Cholet</h2>
          <p>
            Présentation rapide avec un lien et le logo ?
          </p>
          <p>
            Ce que j'ai fait au début sur le projet
            Mon expérience de chef de projet
          </p>
          <p>
            Nesting d'API
            Automatisation de la planification
          </p>
          <p>
            Les difficultés rencontrées
            Le covid et le télétravail
          </p>
        </div>
        <div className="containers-pages-content-right containers">
          <h2>L'école</h2>
          <p>
            EPSI
          </p>
          <p>
            Le diplome de Master Expert en Informatique et Systèmes d'Information option IA
          </p>
          <p>
            Les techs abordées et le mémoire
          </p>
        </div>
        <div className="containers-btn-return-orbit">
          <button className="btn-return-orbit" onClick={() => { displayPageContent(false) }}><BackToOrbitComponent display={true} /></button>
        </div>
      </div>
    </div>
  );
};