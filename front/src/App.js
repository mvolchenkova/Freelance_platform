import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import FindJob from './pages/FindJob/FindJob'
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer';
import FAQ from './pages/FAQ/FAQ.jsx';
function App() {
  return (
    <>
        <BrowserRouter>
  
        <Header/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/findJob" element={<FindJob/>}/>
            <Route path="/FAQ" element={<FAQ/>}/>
          </Routes>
        <Footer/>
        </BrowserRouter>
    </>
  );
}

export default App;
