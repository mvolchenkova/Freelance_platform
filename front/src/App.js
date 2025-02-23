import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer'
import FindJob from './pages/FindJob/FindJob';
function App() {
  return (
    <>
        <BrowserRouter>
  
        <Header/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/candidates" element={<FindJob/>}/>
          </Routes>
        <Footer/>
        </BrowserRouter>
    </>
  );
}

export default App;
