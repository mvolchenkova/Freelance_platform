import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import FindJob from './pages/FindJob/FindJob.jsx';
import Footer from './compFreelancer/Footer/Footer.jsx';
import FAQ from './pages/FAQ/FAQ.jsx';
import Registration from './pages/Registration.jsx';
import Logining from './pages/Logining.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Articles from './pages/Articles/Articles.jsx';
import MainCandidates from './pages/MainCandidates/MainCandidates.jsx';
import Portfolio from './pages/Portfolio/Portfolio.jsx';
import SideBar from './compCustomer/SideBar/SideBar.jsx';
import Proposal from './pages/Proposal/Proposal.jsx'
function App() {
  return (
    <BrowserRouter>
      <SideBar />
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
        <Route path='/createProposal' element={<Proposal/>}/>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
