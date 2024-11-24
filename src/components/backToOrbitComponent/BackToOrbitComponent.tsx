import { useEffect } from "react";
import "./BackToOrbitComponent.scss";

interface BackToOrbitComponentProps {
  display: boolean;
}

const displayComponent = (display: boolean) => {
  const backToOrbitComponent = document.querySelector(".back-to-orbit-img") as HTMLElement;
  if (display) {
    backToOrbitComponent.style.display = "block";
  } else {
    backToOrbitComponent.style.display = "none";
  }
}

export const BackToOrbitComponent: React.FC<BackToOrbitComponentProps> = (BackToOrbitComponentProps) => {
  useEffect(() => {
    displayComponent(BackToOrbitComponentProps.display);
  }, [BackToOrbitComponentProps.display]);

  //TODO: Instead of returning an img i could return the button with a click event
  return (
    <img className="back-to-orbit-img" src="back-to-orbit.png" alt="Back to orbit !" />
  );
};