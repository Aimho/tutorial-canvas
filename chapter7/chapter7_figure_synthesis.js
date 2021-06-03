// 도형 합성
// https://developer.mozilla.org/ko/docs/Web/API/Canvas_API/Tutorial/Compositing

const canvas1 = document.createElement("canvas");
const canvas2 = document.createElement("canvas");
const gco = [
  {
    type: "source-over",
    text: "기본 설정으로, 새로운 도형이 원래 도형위에 그려짐",
  },
  {
    type: "source-in",
    text:
      "새로운 도형이 원래 도형과 겹치는 부분에만 그려지며, 나머지는 투명하게 설정됨",
  },
  {
    type: "source-out",
    text: "새로운 도형이 원래 도형과 겹치지 않는 부분에만 그려짐",
  },
  {
    type: "source-atop",
    text: "새로운 도형이 원래 도형과 겹치는 부분에만 그려짐",
  },
  { type: "destination-over", text: "새로운 도형이 원래 도형 아래에 그려짐" },
  {
    type: "destination-in",
    text:
      "원래 도형 중 새로운 도형과 겹치는 부분이 유지되며 나머지는 투명하게 설정됨",
  },
  {
    type: "destination-out",
    text: "원래 도형 중 새로운 도형과 겹치지 않는 부분이 유지됨",
  },
  {
    type: "destination-atop",
    text:
      "원래 도형 중 새로운 도형과 겹치는 부분만 유지됨. 새로운 도형은 원래 도형 아래에 그려짐",
  },
  {
    type: "lighter",
    text: "두 도형이 겹치는 곳의 색상이 두 색상값을 합한 값으로 결정됨",
  },
  { type: "copy", text: "새로운 도형만 그려짐" },
  {
    type: "xor",
    text: "두 도형이 겹치는 곳이 투명하게 변하며, 나머지는 평범하게 그려짐",
  },
  {
    type: "multiply",
    text:
      "위쪽 레이어의 픽셀값이 아래쪽 레이어의 해당하는 픽셀갑과 곱해지며, 결과적으로 어두운 이미지가 생성됨",
  },
  {
    type: "screen",
    text:
      "픽셀값을 뒤집고 곱한 다음 도로 뒤집음. 결과적으로 밝은 이미지가 생성됨 (multiply 반대)",
  },
  {
    type: "overlay",
    text:
      "multiply, screen의 조합. 아래쪽 레이어의 어두운 부분은 더 어두워지고, 밝은 부분은 더밝아짐",
  },
  { type: "darken", text: "두 레이어 중 어두운 픽셀 값을 취함" },
  { type: "lighten", text: "두 레이어 중 밝은 픽셀 값을 취함" },
  {
    type: "color-dodge",
    text: "아래쪽 레이어의 픽셀값을 위쪽 레이어의 뒤집힌 픽셀값으로 나눔",
  },
  {
    type: "color-burn",
    text:
      "아래쪽 레이어의 뒤집힌 픽셀값을 위쪽 레이어의 픽셀값으로 나누고, 그 값을 도로 뒤집음",
  },
  {
    type: "hard-light",
    text:
      "overlay와 같이 multiply와 screen의 조합이지만, 위아래 레이어의 순서가 바뀐 상태",
  },
  {
    type: "soft-light",
    text:
      "조금 더 부드러운 hard-light임. 완전한 검은/흰색에서 무조건 완전한 검은/흰색이 나오지 않음",
  },
  {
    type: "difference",
    text:
      "한쪽 레이어의 픽셀값에서 다른 쪽 레이어의 픽셀값을 뺌. 빼는 순서는 결과값이 양수가 나오는 순서임",
  },
  { type: "exclusion", text: "difference와 비슷하지만 대비가 덜 함" },
  {
    type: "hue",
    text:
      "아래쪽 레이어의 채도(chroma)와 명도(luma)를 보존하고 위쪽 레이어의 색상(hue)을 적용함",
  },
  {
    type: "saturation",
    text: "아래쪽 레이어의 색상과 명도를 보존하고 위쪽 레이어의 채도를 적용함",
  },
  {
    type: "color",
    text: "아래쪽 레이어의 명도를 보존하고 위쪽 레이어의 색상과 채도를 적용함",
  },
  {
    type: "luminosity",
    text: "아래쪽 레이어의 색상과 채도를 보존하고 위쪽 레이어의 명도를 적용함",
  },
].reverse();
const width = window.innerWidth;
const height = window.innerWidth;

document.body.onload = () => {
  // lum in sRGB
  const lum = {
    r: 0.33,
    g: 0.33,
    b: 0.33,
  };

  // change canvas size
  canvas1.width = width;
  canvas1.height = height;
  canvas2.width = width;
  canvas2.height = height;

  lightMix();
  colorSphere();
  runComposite();
  return;
};

const createCanvas = () => {
  const canvas = document.createElement("canvas");
  canvas.style.background = `url(${op_8x8.data})`;
  canvas.style.border = "1px solid #000";
  canvas.style.width = width / 2;
  canvas.style.height = height / 2;
  return canvas;
};

const runComposite = () => {
  const dl = document.createElement("dl");
  document.body.appendChild(dl);

  while (gco.length) {
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    const p = document.createElement("p");

    const pop = gco.pop();
    dt.textContent = pop.type;
    dl.appendChild(dt);

    p.textContent = pop.text;
    dd.appendChild(p);

    const canvasToDrawOn = createCanvas();
    const canvasToDrawFrom = createCanvas();
    const canvasToDrawResult = createCanvas();

    let ctx = canvasToDrawResult.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.drawImage(canvas1, 0, 0, width / 2, height / 2);
    ctx.globalCompositeOperation = pop.type;
    ctx.drawImage(canvas2, 0, 0, width / 2, height / 2);
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillRect(0, height / 2 - 20, width / 2, 20);
    ctx.fillStyle = "#fff";
    ctx.font = "14px arial";
    ctx.fillText(pop.type, 5, height / 2 - 5);
    ctx.restore();

    ctx = canvasToDrawOn.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.drawImage(canvas1, 0, 0, width / 2, height / 2);
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillRect(0, height / 2 - 20, width / 2, 20);
    ctx.fillStyle = "#fff";
    ctx.font = "14px arial";
    ctx.fillText("기존 도형", 5, height / 2 - 5);
    ctx.restore();

    ctx = canvasToDrawFrom.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.drawImage(canvas1, 0, 0, width / 2, height / 2);
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillRect(0, height / 2 - 20, width / 2, 20);
    ctx.fillStyle = "#fff";
    ctx.font = "14px arial";
    ctx.fillText("새로운 도형", 5, height / 2 - 5);
    ctx.restore();

    dd.appendChild(canvasToDrawOn);
    dd.appendChild(canvasToDrawFrom);
    dd.appendChild(canvasToDrawResult);

    dl.appendChild(dd);
  }
};

const createInterlace = (size, color1, color2) => {
  const proto = document.createElement("canvas").getContext("2d");
  proto.canvas.width = size * 2;
  proto.canvas.height = size * 2;
  proto.fillStyle = color1; // top-left
  proto.fillRect(0, 0, size, size);
  proto.fillStyle = color2; // top-right
  proto.fillRect(size, 0, size, size);
  proto.fillStyle = color2; // bottom-left
  proto.fillRect(0, size, size, size);
  proto.fillStyle = color1; // bottom-right
  proto.fillRect(size, size, size, size);
  const pattern = proto.createPattern(proto.canvas, "repeat");
  pattern.data = proto.canvas.toDataURL();
  return pattern;
};

const op_8x8 = createInterlace(8, "#FFF", "#eee");

const lightMix = () => {
  const ctx = canvas2.getContext("2d");
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.beginPath();
  ctx.fillStyle = "rgba(255, 0, 0, 1)";
  ctx.arc(100, 200, 100, Math.PI * 2, 0, false);
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = "rgba(0, 255, 0, 1)";
  ctx.arc(160, 100, 100, Math.PI * 2, 0, false);
  ctx.fill();
  ctx.restore();
  ctx.beginPath();
  ctx.fillStyle = "#f00";
  ctx.fillRect(0, 0, 30, 30);
  ctx.fill();
};

const colorSphere = () => {
  const ctx = canvas1.getContext("2d");
  const width = 360;
  const halfWidth = width / 2;
  const rotate = (1 / 360) * Math.PI * 2; // per degree
  const oLeft = -20;
  const oTop = -20;

  for (let n = 0; n < 360; n++) {
    const gradient = ctx.createLinearGradient(
      oLeft + halfWidth,
      oTop,
      oLeft + halfWidth,
      oTop + halfWidth
    );
    const color = Color.HSV_RGB({ H: (n + 300) % 360, S: 100, V: 100 });
    gradient.addColorStop(0, "#000");
    gradient.addColorStop(0.7, `rgba(${color.R}, ${color.G}, ${color.B}, 1)`);
    gradient.addColorStop(1, "#fff");
    ctx.beginPath();
    ctx.moveTo(oLeft + halfWidth, oTop);
    ctx.lineTo(oLeft + halfWidth, oTop + halfWidth);
    ctx.lineTo(oLeft + halfWidth + 6, oTop);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.translate(oLeft + halfWidth, oTop + halfWidth);
    ctx.rotate(rotate);
    ctx.translate(-(oLeft + halfWidth), -(oTop + halfWidth));
  }

  ctx.beginPath();
  ctx.fillStyle = "#00f";
  ctx.fillRect(15, 15, 30, 30);
  ctx.fill();
  return ctx.canvas;
};

// HSV (1978) = H: Hue / S: Saturation / V: Value
Color = {};
Color.HSV_RGB = (o) => {
  var H = o.H / 360,
    S = o.S / 100,
    V = o.V / 100,
    R,
    G,
    B;
  var A, B, C, D;

  if (S === 0) {
    R = G = B = Math.round(V * 255);
  } else {
    if (H >= 1) H = 0;
    H = 6 * H;
    D = H - Math.floor(H);
    A = Math.round(255 * V * (1 - S));
    B = Math.round(255 * V * (1 - S * D));
    C = Math.round(255 * V * (1 - S * (1 - D)));
    V = Math.round(255 * V);

    switch (Math.floor(H)) {
      case 0:
        R = V;
        G = C;
        B = A;
        break;
      case 1:
        R = B;
        G = V;
        B = A;
        break;
      case 2:
        R = A;
        G = V;
        B = C;
        break;
      case 3:
        R = A;
        G = B;
        B = V;
        break;
      case 4:
        R = C;
        G = A;
        B = V;
        break;
      case 5:
        R = V;
        G = A;
        B = B;
        break;
    }
  }
  return {
    R,
    G,
    B,
  };
};
