import React, { useState, useEffect } from "react";
import modelLinks from "../data/modelLinks";
import descriptions from "../data/modelsDescriptions";

import { connect } from "react-redux";
import { setModelOpen } from "../actions";

function ModelsDisplay(props) {
  const [activeModel, setActiveModel] = useState(0);
  const modelsCount = modelLinks.length;

  useEffect(() => {
    setActiveModel(props.modelOpenIndex);
  }, [props.modelOpenIndex]);

  const buttonCarouselClicked = (direction) => {
    if ((direction === -1 && activeModel !== 0) || (direction === 1 && activeModel !== modelsCount - 1)) {
      props.setModelOpen(props.modelOpenIndex + direction);
    } else if (direction === -1 && activeModel === 0) {
      props.setModelOpen(modelsCount - 1);
    } else if (direction === 1 && activeModel === modelsCount - 1) {
      props.setModelOpen(0);
    }
  };

  const buttonCloseClicked = () => {
    props.setModelOpen(null);
  };

  return (
    <div className="models-display-wrapper" style={{ display: props.modelOpenIndex !== null ? "flex" : "none" }}>
      {props.modelOpenIndex !== null ? (
        <div className="models-display-container">
          <div className="btn btn-close" onClick={() => buttonCloseClicked()}></div>
          <div className="buttons-container">
            <div className="btn btn-previous" onClick={() => buttonCarouselClicked(-1)}></div>
            <div
              className="btn btn-next"
              onClick={() => buttonCarouselClicked(1)}
              style={{ opacity: activeModel === modelsCount - 1 ? 0.5 : 1 }}
            ></div>
          </div>
          <div className="description-container">
            <p className="model-number">{props.modelOpenIndex + 1 < 10 ? `0${props.modelOpenIndex + 1}` : props.modelOpenIndex + 1}</p>
            <div className="text-container">
              {descriptions[props.modelOpenIndex][0] !== `` ? (
                <p style={{ marginBottom: descriptions[props.modelOpenIndex][1] !== `` ? "30px" : "0px" }}>
                  {descriptions[props.modelOpenIndex][0]}
                </p>
              ) : null}
              <p>{descriptions[props.modelOpenIndex][1]}</p>
            </div>
          </div>
          <div className="overflow-wrapper">
            <iframe
              className="model-iframe"
              allowFullScreen
              webkitallowfullscreen="true"
              width="100%"
              height="100%"
              frameBorder="0"
              seamless
              title="3d model display"
              src={`${modelLinks[props.modelOpenIndex]}+spin+load`}
            ></iframe>
          </div>
        </div>
      ) : (
        ""
      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModelsDisplay);
