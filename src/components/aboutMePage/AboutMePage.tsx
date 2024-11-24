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
            Hugo bla bla bla, il est dev tavu. Probablement moyen de glisser une petite photo ici
          </p>
          <h2>Ce que la garçon aime bien dans la vie</h2>
          <p>
            Plein de trucs à dire ici, à commencer par le dev évidemment
          </p>
          <p>
            Il aime aussi l'espace de manière évidente
          </p>
          <p>
            Il aime aussi les jeux vidéos, hyepr original hein ?
          </p>
          <p>
            On parle pas en mal de Baldur's gate 3 svp
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
            Et il aimerait bien faire passer des master aussi !
          </p>
          <h2>Pour des simu d'entretien </h2>
          <p>Avec Ada techschool notamment</p>
          <h2>Il présente son métier</h2>
          <p>Comme dans son ancien campus</p>
          <p>Mais aussi quand il s'adresse à d'autres dev comme là avec son tech lunch sur les outils d'IA à destination des devs</p>
        </div>
        <div className="containers-btn-return-orbit">
          <button className="btn-return-orbit" onClick={() => { displayPageContent(false) }}><BackToOrbitComponent display={true} /></button>
        </div>
      </div>
    </div>
  );
};