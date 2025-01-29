import React, { useEffect } from "react";
import { BackToOrbitComponent } from "../backToOrbitComponent/BackToOrbitComponent";
import "./AboutMePage.scss";

interface MeProps {
  display: boolean;
  closePage: () => void;
}

export const AboutMePage: React.FC<MeProps> = (MeProps) => {

  const displayPageContent = React.useCallback((display: boolean) => {
    const aboutMePage = document.querySelector("#about-me") as HTMLElement;
    if (display) {
      aboutMePage.style.display = "block";
      aboutMePage.style.animation = "fadeIn 0.5s";
    } else {
      aboutMePage.style.animation = "fadeOut 0.3s";
      aboutMePage.addEventListener("animationend", (animation) => {
        if (animation.animationName === "fadeOut") {
          aboutMePage.style.display = "none";
          MeProps.closePage();
        }
      });
    }
  }, [MeProps]);

  useEffect(() => {
    displayPageContent(MeProps.display);
  }, [MeProps.display, displayPageContent]);

  return (
    <div id="about-me" className="containers-pages">
      <div className="containers-pages-grid">
        <div className="containers-pages-content-left containers">
          <h1>Le dev derrière ce portfolio</h1>
          <h2>Présentation rapide</h2>
          <p>
            Une petite présentation de moi et une petite photo
          </p>
          <h2>Ce que la garçon aime bien dans la vie</h2>
          <p>
            Plein de trucs à dire ici, à commencer par le dev évidemment
          </p>
          <p>
            Il aime aussi l'espace (personne ne l'avait vu venir)
          </p>
          <p>
            Il aime aussi les jeux vidéos, ce qui est carrément inattendu
          </p>
          <p>
            Son jeu favori c'est BG3 parce que c'est incroyable, et que tout autre avis est incorrect.
          </p>
        </div>
        <div className="containers-pages-content-right containers">
          <h1>Il intervient beaucoup auprès des étudiants</h1>
          <h2>En tant que jury</h2>
          <p>
            BTS sio
          </p>
          <p>
            CDA
          </p>
          <p>
            Et il aimerait bien faire passer des masters aussi un jour !
          </p>
          <h2>Pour des simu d'entretien </h2>
          <p>Avec Ada techschool notamment</p>
          <h2>Il présente son métier</h2>
          <p>Comme dans son ancien campus auprès des 1ère années en développement</p>
          <p>Mais aussi quand il s'adresse à d'autres dev comme avec son tech lunch sur les outils d'IA à destination des devs, ou encore quand il parle de green IT.</p>
        </div>
        <div className="containers-btn-return-orbit">
          <button className="btn-return-orbit" onClick={() => { displayPageContent(false) }}><BackToOrbitComponent display={true} /></button>
        </div>
      </div>
    </div>
  );
};