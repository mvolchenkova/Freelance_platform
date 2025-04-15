import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import FindJob from './pages/FindJob/FindJob';
import Footer from './compFreelancer/Footer/Footer';
import FAQ from './pages/FAQ/FAQ.jsx';
import Registration from './pages/Registration.jsx';
import Logining from './pages/Logining.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Articles from './pages/Articles/Articles.jsx';
import MainCandidates from './pages/MainCandidates/MainCandidates.jsx';
import Portfolio from './pages/Portfolio/Portfolio.jsx';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/findJob" element={<FindJob />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Logining />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/mainCandidates" element={<MainCandidates />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
