import { useEffect } from "react";
import "./PlanetNavigationComponent.scss";

interface PlanetNavigationComponentProps {
  display: boolean;
  setCameraFocus: (cameraFocus: string) => void;
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

  return (
    <div className="container-planet-navigation-component">
      <div className="container-grid-planet-navigation-component">
        <button onClick={() => PlanetNavigationComponentProps.setCameraFocus("earth")}>Terre</button>
        <button onClick={() => PlanetNavigationComponentProps.setCameraFocus("sun")}>Sun</button>
        <button onClick={() => PlanetNavigationComponentProps.setCameraFocus("jupiter")}>Jupiter</button>
        <button onClick={() => PlanetNavigationComponentProps.setCameraFocus("saturn")}>Saturne</button>
      </div>
    </div>
  );
};