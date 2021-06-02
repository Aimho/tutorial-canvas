const canvas = document.getElementById("tutorial");

if (canvas.getContext) {
  const ctx = canvas.getContext("2d");
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  // 색상 -------------------------------------------------
  // fillStyle = color: 도형을 채우는 색을 설정
  // strokeStyle = color: 도형의 윤곽선 색을 설정
  const exampleColor = () => {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        const r = Math.floor(255 - 42.5 * i);
        const g = Math.floor(255 - 42.5 * j);
        const rgb = `rgb(${r}, ${g}, 0)`;

        // fillStyle 예제
        ctx.fillStyle = rgb;
        ctx.fillRect(j * 25, i * 25, 25, 25);

        // strokeStyle 예제
        ctx.strokeStyle = rgb;
        ctx.beginPath();
        ctx.arc(12.5 + j * 25, 162.5 + i * 25, 10, 0, Math.PI * 2, true);
        ctx.stroke();
      }
    }
  };

  // 투명도 -------------------------------------------------
  // globalAlpha = transparencyValue: 투명도 값이 설정되면 이후 캔버스에 그려지는 모든 도형들의 투명도가 바뀜. (설정하는 값은 0.0(투명), 1.0(불투명) 사이에 있어야 하며, 초기 설정 값은 1.0임)
  const exampleGlobalAlpha = () => {
    ctx.fillStyle = "#fd0";
    ctx.fillRect(0, 0, 75, 75);
    ctx.fillStyle = "#6c0";
    ctx.fillRect(75, 0, 75, 75);
    ctx.fillStyle = "#09f";
    ctx.fillRect(0, 75, 75, 75);
    ctx.fillStyle = "#f30";
    ctx.fillRect(75, 75, 75, 75);
    ctx.fillStyle = "#fff";

    ctx.globalAlpha = 0.2;
    for (let i = 0; i < 7; i++) {
      ctx.beginPath();
      ctx.arc(75, 75, 10 + 10 * i, 0, Math.PI * 2, true);
      ctx.fill();
    }
  };

  // rgba: 윤곽선과 채움 스타일을 따로 설정 할 수 있어 globalAlpha보다 제어가 쉽고 융통성도 있음
  const exampleRGBA = () => {
    ctx.fillStyle = "rgb(255, 221, 0)";
    ctx.fillRect(0, 0, 150, 37.5);
    ctx.fillStyle = "rgb(102, 204, 0)";
    ctx.fillRect(0, 37.5, 150, 37.5);
    ctx.fillStyle = "rgb(0, 153, 255)";
    ctx.fillRect(0, 75, 150, 37.5);
    ctx.fillStyle = "rgb(255, 51, 0)";
    ctx.fillRect(0, 112.5, 150, 37.5);

    for (let i = 0; i < 10; i++) {
      const alpha = (i + 1) / 10;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      for (let j = 0; j < 4; j++) {
        ctx.fillRect(5 + i * 14, 5 + j * 37.5, 14, 27.5);
      }
    }
  };

  // 선 모양 -------------------------------------------------
  // lineWidth = value: 이후 그려질 선의 두께를 설정
  const exampleLineWidth = () => {
    for (let i = 0; i < 10; i++) {
      ctx.lineWidth = 1 + i;
      ctx.beginPath();
      ctx.moveTo(5 + i * 14, 5);
      ctx.lineTo(5 + i * 14, 140);
      ctx.stroke();
    }
  };

  // lineCap = type: 선의 끝 모양을 설정함
  // type: butt(선의 끝이 좌표에 딱맞게 잘림), round(선의 끝이 동그람), square(선 끝에, 선 두께 반 만큼의 사각형 영억이 더해짐)
  const exampleLineCap = () => {
    const lineCap = ["butt", "round", "square"];

    // 안내선을 그린다
    ctx.strokeStyle = "#09f";
    ctx.beginPath();
    ctx.moveTo(10, 10);
    ctx.lineTo(140, 10);
    ctx.moveTo(10, 140);
    ctx.lineTo(140, 140);
    ctx.stroke();

    // 선을 그린다
    ctx.strokeStyle = "black";
    for (let i = 0; i < lineCap.length; i++) {
      ctx.lineWidth = 15;
      ctx.lineCap = lineCap[i];
      ctx.beginPath();
      ctx.moveTo(25 + i * 50, 10);
      ctx.lineTo(25 + i * 50, 140);
      ctx.stroke();
    }
  };

  // lineJoin = type: 도형을 이루는 선, 호, 곡선들이 연결되는 지점의 모양을 결정함. (끝점과 제어점이 정확히 같은 위치인, 길이가 0인 부분들은 제외됨)
  // type: round(연결되는 부분들의 공통 끝점을 중심으로 하는 원 모양으로 만듦), bevel(연결되는 부분들의 공통 끝점에서 세모 모양으로 만듦), miter(두 부분의 바깥쪽 테두리 선을 각각 연장하여 교차된 점으로 생긴 마름모꼴 모양으로 만듦, miterLimit 속성값에 따라 모양이 달라짐)
  const exampleLineJoin = () => {
    const lineJoin = ["round", "bevel", "miter"];
    ctx.lineWidth = 10;
    for (let i = 0; i < lineJoin.length; i++) {
      ctx.lineJoin = lineJoin[i];
      ctx.beginPath();
      ctx.moveTo(-5, 5 + i * 40);
      ctx.lineTo(35, 45 + i * 40);
      ctx.lineTo(75, 5 + i * 40);
      ctx.lineTo(115, 45 + i * 40);
      ctx.lineTo(155, 5 + i * 40);
      ctx.stroke();
    }
  };

  // miterLimit = value: 두 선이 예각으로 만날 대 접합점의 두께를 제어할 수 있도록, 연결부위의 크기를 제한하는 값을 설정함
  const exampleMiterLimit = () => {
    // 안내선
    ctx.strokeStyle = "#09f";
    ctx.lineWidth = 2;
    ctx.strokeRect(-5, 50, window.innerWidth + 5, 50);

    // 선 스타일 지정
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 10;

    // miter limit 지정
    const miterLimit = 4;
    ctx.miterLimit = parseFloat(miterLimit);

    // 선을 그림
    ctx.beginPath();
    ctx.moveTo(0, 100);
    for (let i = 0; i < 24; i++) {
      const dy = i % 2 === 0 ? 25 : -25;
      ctx.lineTo(Math.pow(i, 1.5) * 2, 75 + dy);
    }
    ctx.stroke();
  };

  // getLineDash(): 음수가 아닌 짝수를 포함하는 현재 선의 대시 패턴 배열을 반환함
  // setLineDash(segments): 현재 선의 대시 패턴을 설정함
  // lineDashOffset = value: 선의 대시 배열이 어디서 시작될지 지정함
  const exampleLineDash = () => {
    let offset = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setLineDash([4, 2]);
      ctx.lineDashOffset = -offset;
      ctx.strokeRect(10, 10, 100, 100);
    };

    const march = () => {
      offset++;
      if (offset > 16) {
        offset = 0;
      }
      draw();
      setTimeout(march, 20);
    };

    march();
  };

  // 그라디언트(Gradient) -------------------------------------------------
  // createLinearGradient(x1, y1, x2, y2): 시작점 좌표(x1, y1), 종료점 좌표(x2, y2)로 하는 선형 그라디언트 오브젝트를 생성함
  // gradient.addColorStop(position, color): `gradient` 오브젝트에 새로운 색 중단점(color stop)을 생성함. position은 0-1 사이 숫자이고 그라디언트에서 색상의 상대적인 위치를 정의함
  const exampleLineGradient = () => {
    // create gradient
    const lineGradient = ctx.createLinearGradient(0, 0, 0, 150);
    lineGradient.addColorStop(0, "#00abeb");
    lineGradient.addColorStop(0.5, "#fff");
    lineGradient.addColorStop(0.5, "#fff");
    lineGradient.addColorStop(1, "#26c000");

    const lineGradient2 = ctx.createLinearGradient(0, 50, 0, 95);
    lineGradient2.addColorStop(0.5, "#000");
    lineGradient2.addColorStop(1, "rgba(0, 0, 0, 0)");

    // 외곽선과 채움 스타일에 gradient를 적용
    ctx.fillStyle = lineGradient;
    ctx.strokeStyle = lineGradient2;

    // 도형을 그림
    ctx.fillRect(10, 10, 130, 130);
    ctx.strokeRect(50, 50, 50, 50);
  };

  // createRadialGradient(x1, y1, r1, x2, y2, r2): 반지름 r1 좌표(x1, y1)을 중심으로 하는 원과 반지름 r2 좌표(x2, y2)를 중심으로 하는 원을 사용하여 그라디언트가 생성됨
  const exampleRadialGradient = () => {
    // create gradient
    const radialGradient = ctx.createRadialGradient(45, 45, 10, 52, 50, 30);
    radialGradient.addColorStop(0, "#a7d30c");
    radialGradient.addColorStop(0.9, "#019f62");
    radialGradient.addColorStop(1, "rgba(1, 159, 98, 0)");

    const radialGradient2 = ctx.createRadialGradient(
      105,
      105,
      20,
      112,
      120,
      50
    );
    radialGradient2.addColorStop(0, "#ff5f98");
    radialGradient2.addColorStop(0.75, "#ff0188");
    radialGradient2.addColorStop(1, "rgba(255, 1, 136, 0)");

    const radialGradient3 = ctx.createRadialGradient(95, 15, 15, 102, 20, 40);
    radialGradient3.addColorStop(0, "#00c9ff");
    radialGradient3.addColorStop(0.8, "#00b5e2");
    radialGradient3.addColorStop(1, "rgba(0, 201, 255, 0)");

    const radialGradient4 = ctx.createRadialGradient(0, 150, 50, 0, 140, 90);
    radialGradient4.addColorStop(0, "#f4f201");
    radialGradient4.addColorStop(0.8, "#e4c700");
    radialGradient4.addColorStop(1, "rgba(228, 199, 0, 0)");

    // 도형을 그림
    ctx.fillStyle = radialGradient4;
    ctx.fillRect(0, 0, 300, 300);
    ctx.fillStyle = radialGradient3;
    ctx.fillRect(0, 0, 300, 300);
    ctx.fillStyle = radialGradient2;
    ctx.fillRect(0, 0, 300, 300);
    ctx.fillStyle = radialGradient;
    ctx.fillRect(0, 0, 300, 300);
  };

  // 패턴(Patterns) -------------------------------------------------
  // createPattern(image, type): 새 캔버스 패턴 객체를 만들어 반환함
  // type: repeat, repeat-x, repeat-y, no-repeat
  // 참고: drawImage () 메서드와 마찬가지로 이 메소드를 호출하기 전에 이미지가 로드되었는지 확인해야함 그렇지 않으면 패턴이 잘못 그려 질 수 있음
  const examplePattern = () => {
    // pattern으로 사용할 이미지
    const img = new Image();
    img.src = "https://mdn.mozillademos.org/files/222/Canvas_createpattern.png";

    img.onload = () => {
      // create pattern
      const pattern = ctx.createPattern(img, "repeat");
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    };
  };

  // 그림자 -------------------------------------------------
  // shadowOffsetX = float: 그림자가 객체에서 연장되어야하는 수평 거리를 나타냄
  // shadowOffsetY = float: 그림자가 객체에서 연장되어야하는 수직 거리를 나타냄
  // shadowBlur = float: 흐림(blur) 효과의 크기를 나타냄
  // shadowColor = color: 그림자 효과의 색상을 나타내는 표준 css 색상 값
  const exampleShadow = () => {
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 2;
    ctx.shadowColor = "rgba(255, 0, 0, 0.5)";

    ctx.font = "20px Times New Roman";
    ctx.fillStyle = "#000";
    ctx.fillText("Sample Strong", 5, 30);
  };

  // 캔버스 채우기 규칙 -------------------------------------------------
  // fill을 사용할 때 한 점이 경로 안쪽 또는 바깥에 있는지, 채워지는지 여부를 결정하기 위한 채우기 규칙 알고리즘을 선택적으로 제공 할 수 있음.
  // 경로가 교차하거나 중첩된 경우에 유용함
  const exampleFill = () => {
    ctx.beginPath();
    ctx.arc(50, 50, 30, 0, Math.PI * 2, true);
    ctx.arc(50, 50, 15, 0, Math.PI * 2, true);
    ctx.fill("evenodd");
  };

  // 실행 -------------------------------------------------
  // exampleLineJoin();
  // exampleMiterLimit();
  // exampleLineDash();
  // exampleLineGradient();
  // exampleRadialGradient();
  // examplePattern();
  // exampleShadow();
  exampleFill();
} else {
  // canvas--unsupported code here
}
