import React, { useEffect } from "react";
import { BackToOrbitComponent } from "../backToOrbitComponent/BackToOrbitComponent";
import "../PagesStyles.scss";
import "./AboutThisProjectPage.scss";

interface AboutThisProjectProps {
  display: boolean;
  closePage: () => void;
}

export const AboutThisProjectPage: React.FC<AboutThisProjectProps> = (AboutThisProjectProps) => {
  //TODO: Could probably create a service to handle the display of all the pages
  const displayPageContent = React.useCallback((display: boolean) => {
    const aboutThisProjectPage = document.querySelector("#about-project") as HTMLElement;
    if (display) {
      aboutThisProjectPage.style.display = "block";
      aboutThisProjectPage.style.animation = "fadeIn 0.5s";
    } else {
      aboutThisProjectPage.style.animation = "fadeOut 0.3s";
      aboutThisProjectPage.addEventListener("animationend", (animation) => {
        if (animation.animationName === "fadeOut") {
          aboutThisProjectPage.style.display = "none";
          AboutThisProjectProps.closePage();
        }
      });
    }
  }, [AboutThisProjectProps]);

  useEffect(() => {
    displayPageContent(AboutThisProjectProps.display);
  }, [AboutThisProjectProps.display, displayPageContent]);
  return (
    <div id="about-project" className="containers-pages">
      <div className="containers-pages-grid">
        <div className="containers-pages-content-left containers">
          <h1>Ici on parle du portfolio</h1>
          <h2>Cliquez et naviguez</h2>
          <p>
            En fait c'est tout con, tu clique sur les astres et ça t'emmène sur une page.
          </p>
          <p>
            Commence par la Terre, je parlerais de moi, car je suis hyper égo-centré.
          </p>
          <p>Ajouter deux ou trois trucs ici</p>
          <h2>L'idée</h2>
          <p>
            Pourquoi ?
          </p>
          <p>
            Les techs utilisées
          </p>
          <p>
            Les trucs difficiles à faire
          </p>
        </div>
        <div className="containers-pages-content-right containers">
          <h1>Ne pas hésitez à visiter mes réseaux</h1>
          <h2>LinkedIn</h2>
          <p>
            Le lien ici
          </p>
          <h2>GitHub</h2>
          <p>
            Le lien ici
          </p>
          <h2>Twitter</h2>
          <p>
            Le lien ici (ouais nan peut-être pas en fait)
          </p>
          <h2>Mon CV quelque part ici</h2>
          <p>
            Le lien ici
          </p>
        </div>
        <div className="containers-btn-return-orbit">
          <button className="btn-return-orbit" onClick={() => { displayPageContent(false) }}><BackToOrbitComponent display={true} /></button>
        </div>
      </div>
    </div>
  );
};