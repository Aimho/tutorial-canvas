const canvas = document.getElementById("tutorial");

if (canvas.getContext) {
  const ctx = canvas.getContext("2d");

  // 직사각형 도형 -----------------------------------------
  // fillRect(x, y, width, height): 색칠된 직사각형을 그림
  // strokeRect(x, y, width, height): 직사각형 윤곽선을 그림
  // clearRect(x, y, width, height): 특정 부분을 지우는 직사각형이며, 지워진 부분은 완전히 투명해짐
  const exampleRect = () => {
    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);
  };

  // 삼각형 그리기 -------------------------------------------------
  // beginPath(): 새로운 경로를 만듦. 경로가 생성 됬다면, 이후 그리기 명령들은 경로를 구성하고 만드는데 사용됨

  // Path Methods: 물체를 구성할 때 필요한 여러 경로를 설정하는데 사용하는 함수
  // closePath(): 현재 하위 경로의 시작 부분과 연결된 직선을 추가함
  // stroke(): 윤곽선을 이용하여 도형을 그림
  // fill(): 경로의 내부를 채워서 내부가 채워진 도형을 그림
  const exampleTriangle = () => {
    ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
    ctx.fill();
  };

  // 펜 이동하기 -------------------------------------------------
  // moveTo(x, y): 펜을 x, y 지정된 좌표로 옮김
  const examplePen = () => {
    const circle = Math.PI * 2;

    ctx.beginPath();
    ctx.arc(75, 75, 70, 0, circle, true); // Outer circle
    ctx.moveTo(110, 75);
    ctx.arc(75, 75, 35, 0, Math.PI, false); // Mouth (clockwise)
    ctx.moveTo(65, 65);
    ctx.arc(60, 65, 5, 0, circle, true); // Left eye
    ctx.moveTo(95, 65);
    ctx.arc(90, 65, 5, 0, circle, true); // Right eye
    ctx.stroke();
  };

  // 선 -------------------------------------------------
  // lineTo(x, y): 현재의 드로잉 위치에서 x, y 지정된 위치까지 선을 그림
  const exampleLine = () => {
    ctx.beginPath();
    ctx.moveTo(25, 25);
    ctx.lineTo(105, 25);
    ctx.lineTo(25, 105);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(125, 125);
    ctx.lineTo(125, 45);
    ctx.lineTo(45, 125);
    ctx.closePath();
    ctx.stroke();
  };

  // 호 -------------------------------------------------
  // arc(x, y, radius, startAngle, endAngle, anticlockwise): (x,y) 위치에 원점을 두면서, 반지름 r을 가지고 startAngle에서 시작하여 endAngle에서 끝나며 주어진 anticlockwise 방향으로 향하는 (기본값은 시계방향 회전) 호를 그림
  // arcTo(x1, y1, x2, y2, radius): 주어진 제어점들과 반지름으로 호를 그리고, 이전 점과 직선으로 연결함
  const exampleArc = () => {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        ctx.beginPath();
        const x = 25 + j * 50; // x coordinate
        const y = 25 + i * 50; // y coordinate
        const radius = 20; // Arc radius
        const startAngle = 0; // Starting point on circle
        const endAngle = Math.PI + (Math.PI * j) / 2; // End point on circle
        const anticlockwise = i % 2 === 0 ? false : true; // clockwise or anticlockwise

        ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

        if (i > 1) ctx.fill();
        else ctx.stroke();
      }
    }
  };

  // 베지어(Bezier) 곡선과 이차(Quadratic) 곡선 -------------------------------------------------
  // quadraticCurveTo(cplx, cply, x, y): `cplx`및 `cply`로 지정된 제어점을 사용하여 현재 펜의 위치에서 `x`와 `y`로 지정된 끝점까지 이차 베지어 곡선을 그림
  // bezierCurveTo(cplx, cply, cp2x, cp2y, x, y): (`cplx`, `cply`)및 (`cp2x`, `cp2y`)로 지정된 제어점을 사용하여 현재 펜 위치에서 `x`및 `y`로 지정된 끝점까지 삼차 베지어 곡선을 그림
  const exampleBezier = () => {
    ctx.beginPath();
    ctx.moveTo(75, 25);
    ctx.quadraticCurveTo(25, 25, 25, 62.5);
    ctx.quadraticCurveTo(25, 100, 50, 100);
    ctx.quadraticCurveTo(50, 120, 30, 125);
    ctx.quadraticCurveTo(60, 120, 65, 100);
    ctx.quadraticCurveTo(125, 100, 125, 62.5);
    ctx.quadraticCurveTo(125, 25, 75, 25);
    ctx.stroke();
  };

  // 삼차 베지어 곡선(Cubic Bezier curves) -------------------------------------------------
  const exampleCubicBezier = () => {
    ctx.beginPath();
    ctx.moveTo(75, 40);
    ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
    ctx.bezierCurveTo(25, 25, 20, 62.5, 20, 62.5);
    ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
    ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
    ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
    ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
    ctx.fill();
  };

  // 직사각형 -------------------------------------------------
  // rect(x, y, width, height): 좌측상단이 (x, y)이고 폭과 높이가 width와 height인 직사각형을 그림
  const exampleRect2 = () => {
    // 벽
    const roundedRect = (ctx, x, y, width, height, radius) => {
      ctx.beginPath();
      ctx.moveTo(x, y + radius);
      ctx.lineTo(x, y + height - radius);
      ctx.arcTo(x, y + height, x + radius, y + height, radius);
      ctx.lineTo(x + width - radius, y + height);
      ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
      ctx.lineTo(x + width, y + radius);
      ctx.arcTo(x + width, y, x + width - radius, y, radius);
      ctx.lineTo(x + radius, y);
      ctx.arcTo(x, y, x, y + radius, radius);
      ctx.stroke();
    };

    roundedRect(ctx, 12, 12, 180, 180, 15);
    roundedRect(ctx, 19, 19, 180, 180, 9);
    roundedRect(ctx, 53, 53, 49, 33, 10);
    roundedRect(ctx, 53, 119, 49, 16, 6);
    roundedRect(ctx, 135, 53, 49, 33, 10);
    roundedRect(ctx, 135, 119, 25, 49, 10);

    // 캐릭터
    ctx.beginPath();
    ctx.arc(37, 37, 13, Math.PI / 7, -Math.PI / 7, false);
    ctx.lineTo(31, 37);
    ctx.fill();

    // 먹이
    for (let i = 0; i < 8; i++) {
      ctx.fillRect(51 + i * 16, 35, 4, 4);
    }
    for (let i = 0; i < 6; i++) {
      ctx.fillRect(115, 51 + i * 16, 4, 4);
    }
    for (let i = 0; i < 8; i++) {
      ctx.fillRect(51 + i * 16, 99, 4, 4);
    }

    // 몬스터 몸
    ctx.beginPath();
    ctx.moveTo(83, 116);
    ctx.lineTo(83, 102);
    ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
    ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
    ctx.lineTo(111, 116);
    ctx.lineTo(106.333, 111.333);
    ctx.lineTo(101.666, 116);
    ctx.lineTo(97, 111.333);
    ctx.lineTo(92.333, 116);
    ctx.lineTo(87.666, 111.333);
    ctx.lineTo(83, 116);
    ctx.fill();
    // 몬스터 흰자
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(91, 96);
    ctx.bezierCurveTo(88, 96, 87, 99, 88, 101);
    ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
    ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
    ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
    ctx.moveTo(103, 96);
    ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
    ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
    ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
    ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
    ctx.fill();
    // 몬스터 검은자
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
    ctx.fill();
    // 몬스터 검은자
    ctx.beginPath();
    ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
    ctx.fill();
  };

  // Path2D -------------------------------------------------
  const examplePath2D = () => {
    const rectangle = new Path2D();
    rectangle.rect(10, 10, 50, 50);

    const circle = new Path2D();
    circle.moveTo(125, 35);
    circle.arc(100, 35, 25, 0, 2 * Math.PI);

    ctx.stroke(rectangle);
    ctx.fill(circle);
  };

  // 실행 -------------------------------------------------
  examplePath2D();
} else {
  // canvas--unsupported code here
}
