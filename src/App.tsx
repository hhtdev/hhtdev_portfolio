import React from 'react';
import './App.css';
import { ThreeScene } from './components/ThreeScene';
import { AboutMePage } from './components/aboutMePage/AboutMePage';
import { AboutThisProjectPage } from './components/aboutThisProjectPage/AboutThisProjectPage';
import { PlanetNavigationComponent } from './components/planetNavigationComponent/PlanetNavigationComponent';
import { FranceTravailPage } from './components/franceTravailPage/FranceTravailPage';
import { AdemiPage } from './components/ademiPage/AdemiPage';
import { MichelinPage } from './components/michelinPage/MichelinPage';

const App: React.FC = () => {
  const [displayAdemiPage, setDisplayAdemiPage] = React.useState(false);
  const [setDisplayMichelinPage, setSetDisplayMichelinPage] = React.useState(false);
  const [displayAboutMePage, setDisplayAboutMePage] = React.useState(false);
  const [displayAboutThisProjectPage, setDisplayAboutThisProjectPage] = React.useState(false);
  const [displayFranceTravailPage, setDisplayFranceTravailPage] = React.useState(false);
  const [displayPlanetNavigationComponent, setDisplayPlanetNavigationComponent] = React.useState(true);
  const [cameraFocus, setCameraFocus] = React.useState<string>('default');

  return (
    <div className='app'>
      <AboutThisProjectPage
        display={displayAboutThisProjectPage}
        closePage={() => {
          setDisplayAboutThisProjectPage(false);
          setDisplayPlanetNavigationComponent(true);
        }}
      />
      <AboutMePage
        display={displayAboutMePage}
        closePage={() => {
          setDisplayAboutMePage(false);
          setDisplayPlanetNavigationComponent(true);
        }}
      />
      <FranceTravailPage
        display={displayFranceTravailPage}
        closePage={() => {
          setDisplayFranceTravailPage(false);
          setDisplayPlanetNavigationComponent(true);
        }}
      />
      <AdemiPage
        display={displayAdemiPage}
        closePage={() => {
          setDisplayAdemiPage(false);
          setDisplayPlanetNavigationComponent(true);
        }}
      />
      <MichelinPage
        display={setDisplayMichelinPage}
        closePage={() => {
          setSetDisplayMichelinPage(false);
          setDisplayPlanetNavigationComponent(true);
        }}
      />
      <ThreeScene
        setDisplayAboutMePage={setDisplayAboutMePage}
        setDisplayAboutThisProjectPage={setDisplayAboutThisProjectPage}
        setDisplayPlanetNavigationComponent={setDisplayPlanetNavigationComponent}
        setDisplayFranceTravailPage={setDisplayFranceTravailPage}
        setDisplayAdemiPage={setDisplayAdemiPage}
        setDisplayMichelinPage={setSetDisplayMichelinPage}
        cameraFocus={cameraFocus}
      />
      <PlanetNavigationComponent
        display={displayPlanetNavigationComponent}
        setCameraFocus={(target: string) => {
          setCameraFocus(target);
        }}
      />
    </div>
  );
}

export default App;