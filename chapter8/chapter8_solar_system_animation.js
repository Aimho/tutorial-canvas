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

// 태양계 애니메이션
const sun = new Image();
const moon = new Image();
const earth = new Image();

const Init = () => {
  sun.src = "https://mdn.mozillademos.org/files/1456/Canvas_sun.png";
  moon.src = "https://mdn.mozillademos.org/files/1443/Canvas_moon.png";
  earth.src = "https://mdn.mozillademos.org/files/1429/Canvas_earth.png";

  requestAnimationFrame(draw);
};

const draw = () => {
  const canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");

  ctx.globalCompositeOperation = "destination-over";
  // 1. 캔버스를 비움
  ctx.clearRect(0, 0, 300, 300);

  ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
  ctx.strokeStyle = "rgba(0, 153, 255, 0.4)";
  // 2. 캔버스 상태를 저장함
  ctx.save();
  ctx.translate(150, 150);

  // 3. animation할 도형을 그림
  // earth
  const time = new Date();
  const circle = Math.PI * 2;
  ctx.rotate(
    (circle / 60) * time.getSeconds() +
      (circle / 60000) * time.getMilliseconds()
  );
  ctx.translate(105, 0);
  ctx.fillRect(0, -12, 50, 24); // shadow
  ctx.drawImage(earth, -12, -12);

  // moon
  ctx.save();
  ctx.rotate(
    (circle / 6) * time.getSeconds() + (circle / 6000) * time.getMilliseconds()
  );
  ctx.translate(0, 28.5);
  ctx.drawImage(moon, -3.5, -3.5);

  ctx.restore();
  ctx.restore();

  ctx.beginPath();
  ctx.arc(150, 150, 105, 0, circle, false); // earth 궤도
  ctx.stroke();

  ctx.drawImage(sun, 0, 0, 300, 300);

  requestAnimationFrame(draw);
};
