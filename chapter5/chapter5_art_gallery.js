const draw = () => {
  const frame = document.getElementById("frame");
  // loop through all images
  for (let i = 0; i < document.images.length; i++) {
    // don't add a canvas for the frame image
    if (document.images[i].getAttribute("id") !== "frame") {
      // create canvas element
      const mCanvas = document.createElement("canvas");
      mCanvas.setAttribute("width", 132);
      mCanvas.setAttribute("height", 150);

      // insert before the image
      document.images[i].parentNode.insertBefore(mCanvas, document.images[i]);
      const mCtx = mCanvas.getContext("2d");

      // draw image to canvas
      mCtx.drawImage(document.images[i], 15, 20);

      // add frame
      mCtx.drawImage(frame, 0, 0);
    }
  }
};
