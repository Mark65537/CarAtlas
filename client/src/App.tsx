import React from "react";
import CarList from "./components/CarList";

function App() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <div style={{
        backgroundColor: "#fff",
        padding: "20px",
        textAlign: "center",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        marginBottom: "20px"
      }}>
        <h1 style={{ margin: "0", fontSize: "2rem", fontWeight: "bold" }}>
          🚗 CarAtlas
        </h1>
        <p style={{ margin: "5px 0 0 0", color: "#666", fontSize: "1rem" }}>
          Каталог автомобилей
        </p>
      </div>
      <CarList />
    </div>
  );
}
export default App;

