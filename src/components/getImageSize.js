let imageMargin = 10;
let imageSize = 215;
let imageSizeEnlarged = 460;
let carouselWidth;
let carouselCenter;

const getImageSize = (activeModel, windowDimensions) => {
  if (windowDimensions.width <= 1450 && windowDimensions.width > 1024) {
    imageMargin = 5;
    imageSize = 160;
    imageSizeEnlarged = 290;
  } else if (windowDimensions.width <= 1024 && windowDimensions.width > 768) {
    imageMargin = 5;
    imageSize = 150;
    imageSizeEnlarged = 250;
  } else if (windowDimensions.width <= 768 && windowDimensions.width > 450) {
    imageMargin = 5;
    imageSize = 110;
    imageSizeEnlarged = 160;
  } else if (windowDimensions.width <= 450 && windowDimensions.width > 375) {
    imageMargin = 5;
    imageSize = 70;
    imageSizeEnlarged = 160;
  } else if (windowDimensions.width <= 375 && windowDimensions.width > 320) {
    imageMargin = 5;
    imageSize = 60;
    imageSizeEnlarged = 150;
  } else if (windowDimensions.width <= 320) {
    imageMargin = 3;
    imageSize = 50;
    imageSizeEnlarged = 130;
  }

  if (windowDimensions.width > 450) {
    carouselWidth = imageSize * 5 + imageMargin * 10 + imageSizeEnlarged - imageSize;
    carouselCenter = -activeModel * (imageSize + imageMargin * 2) - imageSize - imageMargin * 2;
  } else if (windowDimensions.width <= 450) {
    carouselWidth = imageSize * 3 + imageMargin * 6 + imageSizeEnlarged - imageSize;
    carouselCenter = (-activeModel - 1) * (imageSize + imageMargin * 2) - imageSize - imageMargin * 2;
  }

  return {
    imageMargin,
    imageSize,
    imageSizeEnlarged,
    carouselWidth,
    carouselCenter
  };
};

export default getImageSize;
