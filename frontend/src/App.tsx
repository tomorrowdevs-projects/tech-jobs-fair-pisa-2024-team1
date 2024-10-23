import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MapPage from './pages/MapPage';
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MapPage />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;
