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
          <h1>Le portfolio de Hugo</h1>
          <h2>Bienvenue !</h2>
          <p>
            Vous vous trouvez sur le portfolio de Hugo HERAULT, un jeune développeur passionné par l'espace (entre autres 😉) !
          </p>
          <p>
            Ce projet vous permet de naviguer dans une simulation d'une partie de notre système solaire, et de découvrir :
            <ul>
              <li>Les différentes missions sur lesquels j'ai travaillé</li>
              <li>Les choses qui me passionnent dans la vie</li>
              <li>Les façon de me contacter</li>
              <li>Et bien plus encore !</li>
            </ul>
          </p>
          <p>
            Vous vous trouvez actuellement en orbite autour du soleil, qui est l'astre sur lequel j'évoque tout ce qui tourne autour de ce projet, et de mes ambitions concernant ce dernier.
            Mais vous pouvez également vous rendre sur les autres astres via le menu de naviguation, ou en cliquant sur les planètes qui vous entourent (si vous êtes sur un ordinateur).
            Chaque élément de ce système vous permettra de découvrir un aspect de ma vie professionnelle, ou personnelle !
          </p>
          <p>
            Lancez-vous en fermant cette page en bas de votre écran !
          </p>
          <h2>L'idée derrière ce projet :</h2>
          <h3>Pourquoi</h3>
          <p>
            Sans surprise, je suis passionné par l'espace et l'aérospatial en règle générale,
            ça me semblait donc tout naturelle de créer un portfolio qui me ressemble et qui renvoie une image de ma personnalité.
          </p>
          <p>
            Mais ce n'est pas tout ! Je voulais également faire le point sur mes compétences techniques et me "mettre à l'épreuve"
            en utilisant des technologies différentes de celles avec lesquelles j'ai l'habitude de travailler.
          </p>
          <p>
            Et enfin, je m'impose de créer le facteur "woah!" chez les personnes qui connaissent la tech et ce que ce genre de projet implique,
            mais également pour le commun des mortels qui cherche simplement à en savoir un peu plus sur moi.
            C'est quelque chose sur lequel je travaille systématiquement sur ce portfolio, et qui je l'espère, vous plaira !
          </p>
          <h2>Les technologies utilisées :</h2>
          <p>
            Ce projet utilise les technologies suivantes :
            <ul>
              <li>React + Vite</li>
              <li>Three.js</li>
              <li>Typescript</li>
              <li>Docker</li>
              <li>Github Actions</li>
            </ul>
          </p>
        </div>
        <div className="containers-pages-content-right containers">
          <h1>Mes informations</h1>
          <h2>Pour me contacter c'est par ici :</h2>
          <div className="about-project-img-link-container">
            <div className="about-project-img-link">
              <a href="https://www.linkedin.com/in/hugo-herault-217887166" target="_blank"><img className="about-project-img" src="./linkedin.png" alt="Lien de redirection vers le profil LinkedIn de Hugo" /></a>
            </div>
            <div className="about-project-img-link">
              <a href="https://github.com/hhtdev" target="_blank"><img className="about-project-img" src="./github.png" alt="Lien de redirection vers le profil Github de Hugo" /></a>
            </div>
          </div>
          <h2>Mon CV :</h2>
          <p>
            Ici quand il sera prêt 😅
          </p>
        </div>
        <div className="containers-btn-return-orbit">
          <button className="btn-return-orbit" onClick={() => { displayPageContent(false) }}><BackToOrbitComponent display={true} /></button>
        </div>
      </div>
    </div>
  );
};
