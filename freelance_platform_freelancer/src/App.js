import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import FindJob from './pages/FindJob/FindJob'

function App() {
  return (
    <>
     
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/findJob" element={<FindJob/>}/>
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
