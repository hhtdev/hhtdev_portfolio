import { useEffect } from "react";
import "./AboutMePage.scss";

interface MeProps {
  display: boolean;
  closePage: () => void;
}

const displayPage = (display: boolean) => {
  const aboutMePage = document.querySelector(".container-page-about-me") as HTMLElement;
  if (display) {
    aboutMePage.style.display = "block";
  } else {
    aboutMePage.style.display = "none";
  }
}

export const AboutMePage: React.FC<MeProps> = (MeProps) => {
  useEffect(() => {
    displayPage(MeProps.display);
  }, [MeProps.display]);

  return (
    <div className="container-page-about-me">
      <h1>Le H c'est le S, j'suis HS</h1>
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
      <button onClick={() => { MeProps.closePage() }}>Close!</button>
    </div>
  );
};