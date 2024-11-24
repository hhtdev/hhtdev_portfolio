import { useEffect } from "react";
import "./PlanetNavigationComponent.scss";

interface PlanetNavigationComponentProps {
  display: boolean;
}

const displayComponent = (display: boolean) => {
  const planetNavigationComponent = document.querySelector(".back-to-orbit-img") as HTMLElement;
  if (display) {
    planetNavigationComponent.style.display = "block";
  } else {
    planetNavigationComponent.style.display = "none";
  }
}

export const PlanetNavigationComponent: React.FC<PlanetNavigationComponentProps> = (PlanetNavigationComponentProps) => {
  useEffect(() => {
    displayComponent(PlanetNavigationComponentProps.display);
  }, [PlanetNavigationComponentProps.display]);

  //TODO: NOTE A MOI MEME : Tu peux pas faire ça car la DOM va t'empêcher de faire la rotation des astres
  //TODO: Trouves une solution pour naviguer entre les astres plus facilement sur mobile
  //TODO: Quand on dézoom, les astres s'affiche en plus grand ?
  //TODO: Ou alors quand on dézoom, on affiche un menu de navigation ?
  //TODO: Ou alors quand on dézoom, on fait apparaitres les orbites pour faciliter le clique sur mobile ?
  return (
    <div className="container-planet-navigation-component">
      <div className="container-grid-planet-navigation-component">
        <div>À propos</div>
        <div>Hugo</div>
        <div>Compétences Validée</div>
        <div>francetravail.io</div>
      </div>
    </div>
  );
};