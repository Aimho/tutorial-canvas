// 잘라내기 경로
// https://developer.mozilla.org/ko/docs/Web/API/Canvas_API/Tutorial/Compositing#clipping_paths
// globalCompositeOperation 속성의 source-in, source-atop에서 비슷한 효과를 보임.
// 차이점은 clipping path는 canvas에 전혀 그려지지 않는다는 것!

const drawStar = (ctx, r) => {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(r, 0);

  for (let i = 0; i < 9; i++) {
    ctx.rotate(Math.PI / 5);
    if (i % 2 === 0) {
      ctx.lineTo((r / 0.525731) * 0.200811, 0);
    } else {
      ctx.lineTo(r, 0);
    }
  }

  ctx.closePath();
  ctx.fill();
  ctx.restore();
};

const draw = () => {
  const ctx = document.getElementById("canvas").getContext("2d");

  ctx.fillRect(0, 0, 150, 150);
  ctx.translate(75, 75);

  // 동그란 모양의 잘라내기 경로를 생성함
  ctx.beginPath();
  ctx.arc(0, 0, 60, 0, Math.PI * 2, true);
  ctx.clip();

  // 배경을 그림
  const lineGradient = ctx.createLinearGradient(0, -75, 0, 75);
  lineGradient.addColorStop(0, "#232256");
  lineGradient.addColorStop(1, "#143778");

  ctx.fillStyle = lineGradient;
  ctx.fillRect(-75, -75, 150, 150);

  // 별을 그림
  for (let i = 0; i < 50; i++) {
    ctx.save();
    ctx.fillStyle = "#fff";
    ctx.translate(
      75 - Math.floor(Math.random() * 150),
      75 - Math.floor(Math.random() * 150)
    );
    drawStar(ctx, Math.floor(Math.random() * 4) + 2);
    ctx.restore();
  }
};
