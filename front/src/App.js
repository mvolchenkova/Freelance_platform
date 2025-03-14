import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import FindJob from './pages/FindJob/FindJob'
import Footer from './components/Footer/Footer';
import FAQ from './pages/FAQ/FAQ.jsx';
import Registration from './pages/Registration.jsx';
import Logining from './pages/Logining.jsx';
function App() {
  return (
    <>
        <BrowserRouter>
  
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/findJob" element={<FindJob/>}/>
            <Route path="/FAQ" element={<FAQ/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/login" element={<Logining/>}/>
          </Routes>
        <Footer/>
        </BrowserRouter>
    </>
  );
}

export default App;
