import './App.css';
import React from "react";
import CarList from "./components/CarList";

function App() {
  return (
    <div className="app-container">
      <div className="app-header">
        <h1 className="app-title">🚗 CarAtlas</h1>
        <p className="app-subtitle">Каталог автомобилей</p>
      </div>
      <div className="app-content">
        <CarList />
      </div>
    </div>
  );
}
export default App;

