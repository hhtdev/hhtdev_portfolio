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
          <h1>Le H c'est le S, j'sors le RS</h1>
          <h2>Ouais alors ça marche ou quoi ?</h2>
          <p>
            Oui ça à l'air de fonctionner, je peux donc utiliser mes pages comme des overlays.
            C'est cool, du coup il faudra que je fasse un peu de style pour que ça ressemble à quelque chose.
            Et aussi une belle animation pour l'ouverture et la fermeture de la page.
          </p>
          <p>
            Oui ça à l'air de fonctionner, je peux donc utiliser mes pages comme des overlays.
            C'est cool, du coup il faudra que je fasse un peu de style pour que ça ressemble à quelque chose.
            Et aussi une belle animation pour l'ouverture et la fermeture de la page.
          </p>
          <p>
            Oui ça à l'air de fonctionner, je peux donc utiliser mes pages comme des overlays.
            C'est cool, du coup il faudra que je fasse un peu de style pour que ça ressemble à quelque chose.
            Et aussi une belle animation pour l'ouverture et la fermeture de la page.
          </p>
          <p>
            Oui ça à l'air de fonctionner, je peux donc utiliser mes pages comme des overlays.
            C'est cool, du coup il faudra que je fasse un peu de style pour que ça ressemble à quelque chose.
            Et aussi une belle animation pour l'ouverture et la fermeture de la page.
          </p>
          <p>
            Oui ça à l'air de fonctionner, je peux donc utiliser mes pages comme des overlays.
            C'est cool, du coup il faudra que je fasse un peu de style pour que ça ressemble à quelque chose.
            Et aussi une belle animation pour l'ouverture et la fermeture de la page.
          </p>
        </div>
        <div className="containers-pages-content-right containers">
          <h1>LE CONTENUE A DROITE</h1>
          <h2>TA VU ?</h2>
          <p>
            Oui ça à l'air de fonctionner, je peux donc utiliser mes pages comme des overlays.
            C'est cool, du coup il faudra que je fasse un peu de style pour que ça ressemble à quelque chose.
            Et aussi une belle animation pour l'ouverture et la fermeture de la page.
          </p>
          <p>
            Oui ça à l'air de fonctionner, je peux donc utiliser mes pages comme des overlays.
            C'est cool, du coup il faudra que je fasse un peu de style pour que ça ressemble à quelque chose.
            Et aussi une belle animation pour l'ouverture et la fermeture de la page.
          </p>
          <p>
            Oui ça à l'air de fonctionner, je peux donc utiliser mes pages comme des overlays.
            C'est cool, du coup il faudra que je fasse un peu de style pour que ça ressemble à quelque chose.
            Et aussi une belle animation pour l'ouverture et la fermeture de la page.
          </p>
        </div>
        <div className="containers-btn-return-orbit">
          <button className="btn-return-orbit" onClick={() => { displayPageContent(false) }}><BackToOrbitComponent display={true} /></button>
        </div>
      </div>
    </div>
  );
};