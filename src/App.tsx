import React from 'react';
import './App.css';
import { ThreeScene } from './components/ThreeScene';
import { AboutMePage } from './components/aboutMePage/AboutMePage';
import { AboutThisProjectPage } from './components/aboutThisProjectPage/AboutThisProjectPage';
import { PlanetNavigationComponent } from './components/planetNavigationComponent/PlanetNavigationComponent';

const App: React.FC = () => {
  const [displayAboutMePage, setDisplayAboutMePage] = React.useState(false);
  const [displayAboutThisProjectPage, setDisplayAboutThisProjectPage] = React.useState(false);
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
      <ThreeScene
        setDisplayAboutMePage={setDisplayAboutMePage}
        setDisplayAboutThisProjectPage={setDisplayAboutThisProjectPage}
        setDisplayPlanetNavigationComponent={setDisplayPlanetNavigationComponent}
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