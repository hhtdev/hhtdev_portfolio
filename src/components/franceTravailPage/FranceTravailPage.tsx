import React, { useEffect } from "react";
import { BackToOrbitComponent } from "../backToOrbitComponent/BackToOrbitComponent";
import "./FranceTravailPage.scss";

interface FranceTravailProps {
  display: boolean;
  closePage: () => void;
}

export const FranceTravailPage: React.FC<FranceTravailProps> = (FranceTravailProps) => {

  const displayPageContent = React.useCallback((display: boolean) => {
    const franceTravailPage = document.querySelector("#france-travail-page") as HTMLElement;
    if (display) {
      franceTravailPage.style.display = "block";
      franceTravailPage.style.animation = "fadeIn 0.5s";
    } else {
      franceTravailPage.style.animation = "fadeOut 0.3s";
      franceTravailPage.addEventListener("animationend", (animation) => {
        if (animation.animationName === "fadeOut") {
          franceTravailPage.style.display = "none";
          FranceTravailProps.closePage();
        }
      });
    }
  }, [FranceTravailProps]);

  useEffect(() => {
    displayPageContent(FranceTravailProps.display);
  }, [FranceTravailProps.display, displayPageContent]);

  return (
    <div id="france-travail-page" className="containers-pages">
      <div className="containers-pages-grid">
        <div className="containers-pages-content-left containers">
          <h1>Pôle emploi</h1>
          <p>C'est ma première expérience pro après mes études</p>
          <h2>Compétences Validées</h2>
          <p>
            Présentation rapide avec un lien et le logo ?
          </p>
          <p>
            Ce que j'ai fait au début sur le projet
          </p>
          <p>
            Comment on a gérer l'intégration de l'incub vers l'interne
          </p>
          <p>
            Les difficultés rencontrées
          </p>
          <p>
            La partie où j'ai bossé solo, puis à deux, puis avec une plus grande équipe
          </p>
        </div>
        <div className="containers-pages-content-right containers">
          <h1>France Travail</h1>
          <p>Jouer dans la cours des grands</p>
          <h2>francetravail.io</h2>
          <p>
            Qu'est-ce que c'est ?
          </p>
          <p>
            Le périmètre couvert par l'équipe des builder's
          </p>
          <p>
            La bascule vers francetravail.io
          </p>
          <p>
            La montée en compétence sur les projets et les choses que j'ai adoré faire
          </p>
          <p>
            Le fonctionnement de l'équipe et les techs utilisées
          </p>
        </div>
        <div className="containers-btn-return-orbit">
          <button className="btn-return-orbit" onClick={() => { displayPageContent(false) }}><BackToOrbitComponent display={true} /></button>
        </div>
      </div>
    </div>
  );
};