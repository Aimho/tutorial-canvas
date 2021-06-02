const canvas = document.getElementById("tutorial");

if (canvas.getContext) {
  const ctx = canvas.getContext("2d");
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  // 이미지 그리기 -------------------------------------------------
  // 이미지를 canvas로 불러오는 것은 두 단계를 필요로 함
  // 1. HTMLImageElement object를 참조하거나 다른 canvas 요소를 소스로 사용함
  // 2. drawImage() function을 사용하여 canvas에 나타난 이미지 위에 그림을 그림

  // 이미지 불러오기 -------------------------------------------------
  // HTMLImageElement: <img> element와 마찬가지로, Image() constructor를 통해 만들어진 이미지
  // SVGImageElement: <image> element를 사용해 불러온 이미지
  // HTMLVideoElement: <video> 요소를 이미지 소스로 사용하여 비디오의 현재 프레임을 이미지로 불러옴
  // HTMLCanvasElement: 다른 <canvas> 요소를 이미지 소스로 사용함
  // 이렇게 얻은 소스들은 CanvasImageSource를 사용하여 불러 올 수 있음

  // 이미지 그리기 -------------------------------------------------
  // drawImage(image, x, y): CanvasImageSource를 x, y 좌표에 그림
  const exampleDrawImage = () => {
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      ctx.beginPath();
      ctx.moveTo(30, 96);
      ctx.lineTo(70, 66);
      ctx.lineTo(103, 76);
      ctx.lineTo(170, 15);
      ctx.stroke();
    };
    img.src = "https://mdn.mozillademos.org/files/5395/backdrop.png";
  };

  // 비례 크기 조정 -------------------------------------------------
  // drawImage(image, x, y, width, height): width, height는 image의 크기를 결정함
  const exampleDrawImage2 = () => {
    const img = new Image();
    img.onload = () => {
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
          const x = j * img.width;
          const y = i * img.height;
          ctx.drawImage(img, x, y, img.width, img.height);
        }
      }
    };
    img.src = "https://mdn.mozillademos.org/files/5397/rhino.jpg";
  };

  // 이미지 자르기 -------------------------------------------------
  // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight): 약자로 s가 붙은 좌표, 크기는 source를 설정, d같 붙은 좌표, 크기는 canvas에 그려질 위치와 크기를 결정함
  const exampleDrawImage3 = () => {
    const imgSource = new Image();
    imgSource.onload = () =>
      ctx.drawImage(imgSource, 33, 71, 104, 124, 21, 20, 87, 104);
    imgSource.src = "https://mdn.mozillademos.org/files/5397/rhino.jpg";
    imgSource.width = 300;
    imgSource.height = 227;

    const imgFrame = new Image();
    imgFrame.onload = () => ctx.drawImage(imgFrame, 0, 0);
    imgFrame.src =
      "https://mdn.mozillademos.org/files/242/Canvas_picture_frame.png";
    imgFrame.width = 132;
    imgFrame.height = 150;
  };

  // 실행 -------------------------------------------------
  // exampleDrawImage();
  // exampleDrawImage2();
  exampleDrawImage3();
} else {
  // canvas--unsupported code here
}
