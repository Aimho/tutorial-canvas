const canvas = document.getElementById("tutorial");

if (canvas.getContext) {
  const ctx = canvas.getContext("2d");
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  // 상태(state)의 저장과 복원 -------------------------------------------------
  // save(): canvas의 모든 상태를 저장함
  // restore(): 가장 최근에 저장된 canvas 상태를 복원함
  // canvas 상태는 스택(stack)에 쌓임, save() 메소드가 호출될 때마다 현재 drawing 상태가 스택 위로 푸쉬됨
  const exampleSaveAndRestore = () => {
    ctx.fillRect(0, 0, 150, 150);
    ctx.save();

    ctx.fillStyle = "#09f";
    ctx.fillRect(15, 15, 120, 120);
    ctx.save();

    ctx.fillStyle = "#fff";
    ctx.globalAlpha = 0.5;
    ctx.fillRect(30, 30, 90, 90);

    ctx.restore();
    ctx.fillRect(45, 45, 60, 60);

    ctx.restore();
    ctx.fillRect(60, 60, 30, 30);
  };

  // 이동 -------------------------------------------------
  // translate(x, y): grid에서 canvas와 그 원점을 이동함. x는 이동시킬 수평 거리, y는 수직으로 얼마나 떨어질지 표시함
  // 변형하기 전에 canvas 상태를 저장하는 것이 좋음 (대다수의 경우 원래 상태로 되돌리려고 역이동 시키는 것보다 restore 메소드를 호출는 것이 간편함)
  // loop안에서 이동하는 거라면 canvas 상태를 저장하고 복원하지 말아야함 (canvas 모서리 밖에서 그려지는 바람에 drawing의 일부를 잃어버리게 될지도 모름)
  const exampleTranslate = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        ctx.save();
        const r = 51 * i;
        const g = 255 - 51 * i;
        ctx.fillStyle = `rgb(${r}, ${g}, 255)`;
        ctx.translate(10 + j * 50, 10 + i * 50);
        ctx.fillRect(0, 0, 25, 25);
        ctx.restore();
      }
    }
  };

  // 회전 -------------------------------------------------
  // rotate(angle): canvas를 현재 원점 기준으로 radian의 angle 숫자만큼 시계방향으로 회전시킴
  // 회전의 중심점은 언제나 canvas의 원점임 (중심점을 바꾸려면 translate 메소드를 써서 canvas를 이동해야 함)
  const exampleRotate = () => {
    // 좌측 사각형, canvas 원점에서 회전
    ctx.save();

    // 파란 사각형
    ctx.fillStyle = "#0095dd";
    ctx.fillRect(30, 30, 100, 100);
    ctx.rotate((Math.PI / 180) * 25);

    // 회색 사각형
    ctx.fillStyle = "#4d4e53";
    ctx.fillRect(30, 30, 100, 100);
    ctx.restore();

    // 우측 사각형, 사각형 중심에서 회전
    // 파란 사각형 그리기
    ctx.fillStyle = "#0095dd";
    ctx.fillRect(150, 30, 100, 100);

    // 사각형 줌심으로 이동
    // x = x + 0.5 * width
    // y = y + 0.5 * height
    ctx.translate(200, 80);
    // 회전
    ctx.rotate((Math.PI / 180) * 25);
    // 에전 위치로 이동
    ctx.translate(-200, -80);

    // 회색 사각형
    ctx.fillStyle = "#4d4e53";
    ctx.fillRect(150, 30, 100, 100);
  };

  // 확대/축소(scaling) -------------------------------------------------
  // scale(x, y): canvas 단위를 수평으로 x, 수직으로 y만큼 크기를 확대/축소함
  // 1.0보다 크면 확대, 작으면 축소함
  // 음수를 이용해서 축을 대칭 시킬 수 있음 (ex: translate(0, canvas.height); scale(1, -1);)
  const exampleScaling = () => {
    // 확대/축소 비율 적용
    ctx.save();
    ctx.scale(10, 3);
    ctx.fillRect(1, 10, 10, 10);
    ctx.restore();

    // 수평 대칭
    ctx.scale(-1, 1);
    ctx.font = "48px serif";
    ctx.fillText("MDN", -135, 120);
  };

  // 변형(transforms) -------------------------------------------------
  // transform(a, b, c, d, e, f): arguments에 표시된 행렬을 이용해 현재 변환 행렬을 곱함
  // 만일 arguments 중에 Infinity가 있다면, 변환 행렬은 반드시 infinity로 표시되어야 함
  // 매개 변수들은 다음과 같음
  // a(m11): 수평으로 확대/축소
  // b(m12): 수평으로 비스듬히 기울이기
  // c(m21): 수직으로 비스듬히 기울이기
  // d(m22): 수직으로 확대/축소
  // e(dx): 수평으로 이동
  // f(dy): 수직으로 이동
  // setTransform(a, b, c, d, e, f): 현재 변형 상태를 단위 행렬로 재설정하고 나서 동일한 arguments로 transform 메소드를 적용함
  // resetTransform(): 현재 변형 상태를 단위 행렬로 재설정함, ctx.setTransform(1, 0, 0, 1, 0, 0); 호출과 동일함
  const exampleTransform = () => {
    const sin = Math.sin(Math.PI / 6);
    const cos = Math.cos(Math.PI / 6);
    ctx.translate(100, 100);

    for (let i = 0; i <= 12; i++) {
      const c = Math.floor((255 / 12) * i);
      ctx.fillStyle = `rgb(${c}, ${c}, ${c})`;
      ctx.fillRect(0, 0, 100, 10);
      ctx.transform(cos, sin, -sin, cos, 0, 0);
    }
    ctx.setTransform(-1, 0, 0, 1, 100, 100);
    ctx.fillStyle = "rgba(255, 128, 255, 0.5";
    ctx.fillRect(0, 50, 100, 100);
  };

  // 실행 -------------------------------------------------
  // exampleSaveAndRestore();
  // exampleTranslate();
  // exampleRotate();
  // exampleScaling();
  exampleTransform();
} else {
  // canvas--unsupported code here
}
