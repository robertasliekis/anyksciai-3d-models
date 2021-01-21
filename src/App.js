import "./App.css";
import React, { useState } from "react";

const modelLinks = [
  "https://p3d.in/e/lpw7K",
  "https://p3d.in/e/HUJzt",
  "https://p3d.in/e/t1Mo7",
  "https://p3d.in/e/PEhm2",
  "https://p3d.in/e/uuPiz",
  "https://p3d.in/e/QoVYS",
  "https://p3d.in/e/n2qfm",
  "https://p3d.in/e/l6T6c",
  "https://p3d.in/e/Wn4er",
  "https://p3d.in/e/ss4Wq",
  "https://p3d.in/e/XqR1m",
  "https://p3d.in/e/CMjGe",
  "https://p3d.in/e/U6GT3",
  "https://p3d.in/e/hQVQ8",
  "https://p3d.in/e/LHXYS"
];

//"homepage": "https://robertasliekis.github.io/anyksciai-3d-models/"

function App() {
  const [activeModel, setActiveModel] = useState(0);

  const buttonCarouselClicked = (direction) => {
    if ((direction === -1 && activeModel !== 0) || (direction === 1 && activeModel !== modelLinks.length - 1)) {
      setActiveModel(activeModel + direction);
      console.log(activeModel);
    }
  };

  return (
    <div className="website-wrapper">
      <div className="buttons-container">
        <div className="btn btn-previous" onClick={() => buttonCarouselClicked(-1)} style={{ opacity: activeModel === 0 ? 0.5 : 1 }}></div>
        <div
          className="btn btn-next"
          onClick={() => buttonCarouselClicked(1)}
          style={{ opacity: activeModel === modelLinks.length - 1 ? 0.5 : 1 }}
        ></div>
        {console.log(modelLinks.length)}
      </div>
      <div className="overflow-wrapper">
        <iframe
          className="model-iframe"
          allowFullScreen
          webkitallowfullscreen="true"
          width="640"
          height="480"
          frameBorder="0"
          seamless
          src={`${modelLinks[activeModel]}+spin+load`}
        ></iframe>
      </div>
    </div>
  );
}

export default App;
