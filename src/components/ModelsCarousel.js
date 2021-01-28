import React, { useState, useEffect } from "react";
import modelLinks from "../data/modelLinks";

import { connect } from "react-redux";
import { setModelOpen } from "../actions";

function ModelsCarousel(props) {
  const [activeModel, setActiveModel] = useState(1);
  const [carouselTransition, setCarouselTransition] = useState(false);
  const modelsCount = modelLinks.length;
  const imageMargin = 10;
  const imageSize = 215;
  const imageSizeEnlarged = 460;

  const modelsDisplayMiddle = modelLinks.map((model, index) => index);
  const modelsDisplayStart = modelsDisplayMiddle.filter((model, index) => index > modelsCount - 5);
  const modelsDisplayEnd = modelsDisplayMiddle.filter((model, index) => index < 2);
  const modelsDisplayArray = [...modelsDisplayStart, ...modelsDisplayMiddle, ...modelsDisplayEnd];

  useEffect(() => {
    const carouselTimer = setTimeout(function () {
      if (activeModel === -1) {
        setCarouselTransition(true);
        setActiveModel(modelsCount - 1);
      } else if (activeModel === 15) {
        setCarouselTransition(true);
        setActiveModel(0);
      }
    }, 150);
    return () => {
      clearTimeout(carouselTimer);
      console.log("clear");
    };
  }, [activeModel]);

  const buttonCarouselClicked = (direction) => {
    if (direction === 1) {
      if (activeModel > -1) {
        setActiveModel(activeModel - 1);
        setCarouselTransition(false);
      } else {
        setActiveModel(modelsCount - 1);
      }
    }
    if (direction === -1) {
      if (activeModel < modelsCount) {
        setActiveModel(activeModel + 1);
        setCarouselTransition(false);
      } else {
        setActiveModel(0);
      }
    }
  };

  const modelIconClicked = (modelIndex) => {
    props.setModelOpen(modelIndex);
  };

  return (
    <div className="models-carousel-wrapper">
      {console.log(props.modelIndex)}
      <div className="description">
        <div className="title">
          <div className="logo"></div>
          <div className="text">DUONOS KELIAS</div>
        </div>
        <p>
          Sveiki atvykę į virtualią Jurgio Kazlausko (1914–1987 m.) medžio drožinių galeriją, kurioje išvysite net 15 į trimatę erdvę
          perkeltų kūrinių. Kaip juos apžiūrėti? Tiesiog pasirinkite patikusį drožinį, spustelėkite ant jo ir atsivėrusiame lange apžvelkite
          jį iš visų pusių.
        </p>
        <p>P.S. pilną kolekciją galite išvysti atvykę į Arklio muziejų Niūronyse (Anykščių r.). </p>
        <p>Lauksime atvykstant!</p>
      </div>
      <div className="carousel-container">
        <div className="side-images-container">
          <div className="side-image"></div>
          <div className="side-image"></div>
        </div>
        <div className="carousel-wrapper" style={{ width: `${imageSize * 5 + imageMargin * 10 + imageSizeEnlarged - imageSize}px` }}>
          <div className="carousel-overflow-wrapper">
            <div
              className="models-display-container"
              style={{
                left: `${-activeModel * (imageSize + imageMargin * 2) - imageSize - imageMargin * 2}px`,
                transition: !carouselTransition ? "0.2s all ease" : "none"
              }}
            >
              {modelsDisplayArray.map((modelIndex, index) => (
                <div
                  className="model-image"
                  key={index}
                  style={{
                    backgroundImage: `url("/images/${modelIndex + 1}.png")`,
                    margin: `0px ${imageMargin}px`,
                    height: index === activeModel + 3 ? `${imageSizeEnlarged}px` : `${imageSize}px`,
                    width: index === activeModel + 3 ? `${imageSizeEnlarged}px` : `${imageSize}px`,
                    transition: !carouselTransition ? "0.2s all ease" : "none",
                    cursor: index === activeModel + 3 ? "pointer" : "default",
                    pointerEvents: index === activeModel + 3 ? "auto" : "none"
                  }}
                  onClick={() => modelIconClicked(modelIndex)}
                >
                  <div
                    className="enlarge-icon"
                    style={{
                      opacity: index === activeModel + 3 ? 0.85 : 0,
                      transition: !carouselTransition ? "0.2s all ease" : "none"
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
          <div className="buttons-container">
            <div className="btn btn-previous" onClick={() => buttonCarouselClicked(1)}></div>
            <div className="btn btn-next" onClick={() => buttonCarouselClicked(-1)}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    modelOpenIndex: state.setModelOpen.modelOpenIndex
  };
};

const mapDispatchToProps = {
  setModelOpen
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelsCarousel);
