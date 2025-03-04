import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
<<<<<<< HEAD
import FindJob from './pages/FindJob/FindJob'
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer';
=======
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer'
import FindJob from './pages/FindJob/FindJob';
>>>>>>> 8084a7f7ef9f32e816149dee2cadad555546f378
function App() {
  return (
    <>
        <BrowserRouter>
  
        <Header/>
          <Routes>
            <Route path="/" element={<Home />} />
<<<<<<< HEAD
            <Route path="/findJob" element={<FindJob/>}/>
=======
            <Route path="/candidates" element={<FindJob/>}/>
>>>>>>> 8084a7f7ef9f32e816149dee2cadad555546f378
          </Routes>
        <Footer/>
        </BrowserRouter>
    </>
  );
}

export default App;
