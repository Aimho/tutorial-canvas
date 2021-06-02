const canvas = document.getElementById("tutorial");

if (canvas.getContext) {
  const ctx = canvas.getContext("2d");
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  // 텍스트 그리기 -------------------------------------------------
  // fillText(text, x, y, maxWidth?): 주어진 좌표(x, y)에 텍스트를 채움. 최대 폭(width)은 옵션
  // strokeText(text, x, y, maxWidth?): 주어진 좌표(x, y)에 텍스트를 칠(stroke)함. 최대 폭(width)은 옵션
  const exampleDrawText = () => {
    ctx.font = "48px serif";
    ctx.fillText("Hello Fill Text", 10, 50);
    ctx.strokeText("Hello Stroke Text", 10, 100);
  };

  // 텍스트 스타일 -------------------------------------------------
  // font = value: 텍스트를 그릴 때 사용되는 현재 텍스트 스타일, CSS `font` property와 동일한 구문을 사용
  // textAlign = value: 텍스트 정렬 설정 (start, end, left, right, center)
  // textBaseline = value: 베이스라인 설정 (top, hanging, middle, alphabetic, ideographic, bottom)
  // direction = value: 글자 방향 (ltr, rtl, inherit)
  // 어드밴스드 텍스트 측정 -------------------------------------------------
  // measureText(): 현재 스타일로 특정 텍스트가 그려질 때의 폭, 픽셀 등을 포함하는 `TextMetrics` 객체 리턴
  const exampleTextStyle = () => {
    ctx.font = "48px serif";
    ctx.textBaseline = "hanging";
    const label = "Hello Text Style";
    ctx.strokeText(label, 0, 100);

    const text = ctx.measureText(label);
    console.log(text);
  };

  // 실행 -------------------------------------------------
  // exampleDrawText();
  exampleTextStyle();
} else {
  // canvas--unsupported code here
}
