import { useEffect } from "react";
import "./AboutThisProjectPage.scss";

interface AboutThisProjectProps {
  display: boolean;
  closePage: () => void;
}

const displayPage = (display: boolean) => {
  const aboutThisProjectPage = document.querySelector(".container-page-about-project") as HTMLElement;
  if (display) {
    aboutThisProjectPage.style.display = "block";
  } else {
    aboutThisProjectPage.style.display = "none";
  }
}

export const AboutThisProjectPage: React.FC<AboutThisProjectProps> = (AboutThisProjectProps) => {
  useEffect(() => {
    displayPage(AboutThisProjectProps.display);
  }, [AboutThisProjectProps.display]);

  return (
    <div className="container-page-about-project">
      <h1>Ce portfolio</h1>
      <h2>Le principe</h2>
      <p>
        Clique sur les astres pour naviguer dans le portfolio.
      </p>
      <button onClick={() => { AboutThisProjectProps.closePage() }}>Close!</button>
    </div>
  );
};