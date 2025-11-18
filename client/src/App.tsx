import logo from './logo.svg';
import './App.css';
import React from "react";
import CarList from "./components/CarList";

function App() {
  return (
    <div style={{ padding: 16 }}>
      <h2>Car Directory Editor</h2>
      <CarList />
    </div>
  );
}
export default App;

