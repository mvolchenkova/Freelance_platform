import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import FindJob from './pages/FindJob/FindJob'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Articles from './pages/Articles/Articles';
import MainCandidates from './pages/MainCandidates/MainCandidates';
import Portfolio from './pages/Portfolio/Portfolio';

function App() {
  return (
    <>
     
        <BrowserRouter>
        <Header/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/findJob" element={<FindJob/>}/>
            <Route path="/articles" element={<Articles/>}/>
            <Route path='/mainCandidates' element={<MainCandidates/>}/>
            <Route path='/portfolio' element={<Portfolio/>}/>
          </Routes>
          <Footer/>
        </BrowserRouter>
    </>
  );
}

export default App;
