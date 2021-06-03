// 기본 애니메이션
// https://developer.mozilla.org/ko/docs/Web/API/Canvas_API/Tutorial/Basic_animations

// 기본 애미메이션 단계
// 1. 캔버스를 비움
// 2. 캔버스 상태를 저장함
// 3. 애니메이션할 도형을 그림
// 4. 캔버스 상태를 복원함

// 애니메이션 제어하기
// canvas 메소드를 사용하거나 사용자 함수를 사용하여 canvas에 도형을 그림
// for 반복문 안에서 애니메이션을 실행하는 것은 불가능함. 정해진 시간마다 그리기 함수를 실행하는 방법이 필요함
// 아래와 같이 애니메이션을 제어하는 두 가지 방버이 있음

// 예정된 변경
// 현재 animation을 만드는 방법으로 window.requestAnimationFrame() 메소드를 추천함
// setInterval(function, delay): delay 밀리세컨드(1000분의 1초)마다 function 함수 반복을 실행함
// setTimeout(function, delay): delay 밀리세컨드(1000분의 1초) 경과 후, function 함수를 실행함

// 사용자 상호 작용 변경
// animation을 제어하는 두번쨰 방법은 사용자 입력임
// EventListener를 설정하여, 사용자와 상호작용하여 animation 함수를 실행함

// 시계 animation
const Init = () => {
  requestAnimationFrame(draw);
};

const draw = () => {
  const canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");

  // 1. 캔버스를 비움
  ctx.save();
  ctx.clearRect(0, 0, 150, 150);

  ctx.translate(75, 75);
  ctx.scale(0.4, 0.4);
  ctx.rotate(-Math.PI / 2);
  ctx.strokeStyle = "#000";
  ctx.fillStyle = "#fff";
  ctx.lineWidth = 8;
  ctx.lineCap = "round";

  // 2. 캔버스 상태를 저장함
  ctx.save();

  // 시계판 - hour
  ctx.save();
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.rotate(Math.PI / 6);
    ctx.moveTo(100, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();
  }
  ctx.restore();

  // 시계판 - min
  ctx.save();
  ctx.lineWidth = 5;
  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      ctx.beginPath();
      ctx.rotate(Math.PI / 6);
      ctx.moveTo(117, 0);
      ctx.lineTo(120, 0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI / 30);
  }
  ctx.restore();

  const time = new Date();
  const sec = time.getSeconds();
  const min = time.getMinutes();
  let hour = time.getHours();
  hour = hour >= 12 ? hour - 12 : hour;

  ctx.fillStyle = "#000";

  // 3. animation할 도형을 그림
  // 시간 표시 - hour
  ctx.save();
  ctx.rotate(
    hour * (Math.PI / 6) + min * (Math.PI / 360) + sec * (Math.PI / 21600)
  );
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(80, 0);
  ctx.stroke();
  ctx.restore();

  // 시간 표시 - min
  ctx.save();
  ctx.rotate(min * (Math.PI / 30) + sec * (Math.PI / 1800));
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(-28, 0);
  ctx.lineTo(112, 0);
  ctx.stroke();
  ctx.restore();

  // 시간표시 - sec
  ctx.save();
  ctx.rotate(sec * (Math.PI / 30));
  ctx.strokeStyle = "#d40000";
  ctx.fillStyle = "#d40000";
  ctx.lineWidth = 6;

  ctx.beginPath();
  ctx.moveTo(-30, 0);
  ctx.lineTo(83, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(95, 0, 10, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.fillStyle = "#fff";
  ctx.arc(0, 0, 3, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.restore();

  ctx.beginPath();
  ctx.lineWidth = 14;
  ctx.strokeStyle = "#325fa2";
  ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
  ctx.stroke();

  ctx.restore();
  requestAnimationFrame(draw);
};
