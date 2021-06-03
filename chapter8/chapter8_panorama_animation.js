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

// 움직이는 파노라마 사진 animation
const img = new Image();

// 스크롤 될 이미지, 방향, 속도를 바꾸려면 변수 값을 바꿈
img.src =
  "https://mdn.mozillademos.org/files/4553/Capitan_Meadows,_Yosemite_National_Park.jpg";
const canvasXSize = 800;
const canvasYSize = 200;
const speed = 30; // 값이 작을 수록 빨라짐
const scale = 1.05;
const y = -4.5; // 수직 옵셋

// 주요 프로그램
let dx = 0.75;
let imgW;
let imgH;
let x = 0;
let clearX;
let clearY;
let ctx;

img.onload = () => {
  imgW = img.width * scale;
  imgH = img.height * scale;
  // 캔버스 보다 큰 이미지
  if (imgW > canvasXSize) {
    x = canvasXSize - imgW;
    clearX = imgW;
  } else {
    clearX = canvasXSize;
  }

  // 캔버스 보다 큰 이미지
  if (imgH > canvasYSize) {
    clearY = imgH;
  } else {
    clearY = canvasYSize;
  }

  // 캔버스 요소 얻기
  ctx = document.getElementById("canvas").getContext("2d");
  // 새로 그리기 속도 설정
  return requestAnimationFrame(draw, speed);
};

const draw = () => {
  // 캔버스를 비움
  ctx.clearRect(0, 0, clearX, clearY);
  // 이미지가 캔버스보다 작거나 같다면 (if image is <= canvas size)
  if (imgW <= canvasXSize) {
    // 재설정, 처음부터 시작
    if (x > canvasXSize) {
      x = 0;
    }
    // 추가 이미지 그리기
    if (x > canvasXSize - imgW) {
      ctx.drawImage(img, x - canvasXSize + 1, y, imgW, imgH);
    }
  }
  // 이미지가 캔버스보다 크다면 (if image is > canvas size)
  else {
    // 재설정, 처음부터 시작
    if (x > canvasXSize) {
      x = canvasXSize - imgW;
    }
    // 추가 이미지 그리기
    if (x > canvasXSize - imgW) {
      ctx.drawImage(img, x - imgW + 1, y, imgW, imgH);
    }
  }
  // 이미지 그리기
  ctx.drawImage(img, x, y, imgW, imgH);
  // 움직임 정도
  x += dx;

  requestAnimationFrame(draw, speed);
};
