import "./App.css";
import React from "react";
import ModelsCarousel from "./components/ModelsCarousel";
import ModelsDisplay from "./components/ModelsDisplay";

//"homepage": "https://robertasliekis.github.io/anyksciai-3d-models/"

function App() {
  return (
    <div className="website-wrapper">
      <ModelsCarousel />
      <ModelsDisplay />
    </div>
  );
}

export default App;
