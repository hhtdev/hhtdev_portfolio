import { useEffect } from "react";
import "./PlanetNavigationComponent.scss";

interface PlanetNavigationComponentProps {
  display: boolean;
  setCameraFocus: (cameraFocus: string) => void;
}

const displayComponent = (display: boolean) => {
  const planetNavigationComponent = document.querySelector(".container-planet-navigation-component") as HTMLElement;
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

  return (
    <div className="container-planet-navigation-component">
      <div className="container-grid-planet-navigation-component">
        <button className="btn-navigation" onClick={() => PlanetNavigationComponentProps.setCameraFocus("sun")}>Soleil</button>
        <button className="btn-navigation" onClick={() => PlanetNavigationComponentProps.setCameraFocus("mercury")}>Mercure</button>
        <button className="btn-navigation" onClick={() => PlanetNavigationComponentProps.setCameraFocus("venus")}>Venus</button>
        <button className="btn-navigation" onClick={() => PlanetNavigationComponentProps.setCameraFocus("earth")}>Terre</button>
        <button className="btn-navigation" onClick={() => PlanetNavigationComponentProps.setCameraFocus("mars")}>Mars</button>
      </div>
    </div >
  );
};