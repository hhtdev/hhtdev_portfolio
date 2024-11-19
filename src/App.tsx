import React from 'react';
import './App.css';
import { ThreeScene } from './components/ThreeScene';
import { AboutMePage } from './components/aboutMePage/AboutMePage';
import { AboutThisProjectPage } from './components/aboutThisProjectPage/AboutThisProjectPage';

function App() {
  const [displayAboutMePage, setDisplayAboutMePage] = React.useState(false);
  const [displayAboutThisProjectPage, setDisplayAboutThisProjectPage] = React.useState(false);

  return (
    <div className='app'>
      <AboutThisProjectPage display={displayAboutThisProjectPage} closePage={() => { setDisplayAboutThisProjectPage(false) }} />
      <AboutMePage display={displayAboutMePage} closePage={() => { setDisplayAboutMePage(false) }} />
      <ThreeScene
        setDisplayAboutMePage={setDisplayAboutMePage}
        setDisplayAboutThisProjectPage={setDisplayAboutThisProjectPage}
      />
    </div>
  );
}

export default App;