import React, { useState, useEffect } from "react";
import modelLinks from "../data/modelLinks";
import getWindowDimensions from "./getWindowDimensions";

import { connect } from "react-redux";
import { setModelOpen } from "../actions";

function ModelsCarousel(props) {
  const [activeModel, setActiveModel] = useState(1);
  const [carouselTransition, setCarouselTransition] = useState(false);
  const windowDimensions = getWindowDimensions();

  console.log(windowDimensions);

  const modelsCount = modelLinks.length;
  let imageMargin = 10;
  let imageSize = 215;
  let imageSizeEnlarged = 460;
  let carouselWidth;
  let carouselCenter;

  const setImageSize = () => {
    if (windowDimensions.width <= 1024 && windowDimensions.width > 768) {
      imageMargin = 5;
      imageSize = 150;
      imageSizeEnlarged = 250;
    } else if (windowDimensions.width <= 768 && windowDimensions.width > 450) {
      imageMargin = 5;
      imageSize = 110;
      imageSizeEnlarged = 160;
    } else if (windowDimensions.width <= 450) {
      imageMargin = 5;
      imageSize = 90;
      imageSizeEnlarged = 130;
    }
    if (windowDimensions.width > 450) {
      carouselWidth = imageSize * 5 + imageMargin * 10 + imageSizeEnlarged - imageSize;
      carouselCenter = -activeModel * (imageSize + imageMargin * 2) - imageSize - imageMargin * 2;
    } else if (windowDimensions.width <= 450) {
      carouselWidth = imageSize * 3 + imageMargin * 6 + imageSizeEnlarged - imageSize;
      carouselCenter = (-activeModel - 1) * (imageSize + imageMargin * 2) - imageSize - imageMargin * 2;
    }
  };

  setImageSize();

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
    <div className="models-carousel-wrapper" key={windowDimensions.width}>
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
        <div className="carousel-wrapper" style={{ width: `${carouselWidth}px` }}>
          <div className="carousel-overflow-wrapper">
            <div
              className="models-display-container"
              style={{
                left: `${carouselCenter}px`,
                transition: !carouselTransition ? "0.2s all ease" : "none"
              }}
            >
              {modelsDisplayArray.map((modelIndex, index) => (
                <div
                  className="model-image"
                  key={index}
                  style={{
                    backgroundImage: `url("images/image${modelIndex + 1}.jpg")`,
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
