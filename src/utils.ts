function getRgbColor(color: string) {
  const div = document.createElement("div");

  div.style.color = color;
  div.style.display = "none";
  document.body.appendChild(div);

  const colors = getComputedStyle(div).color.match(
    /^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i
  );

  document.body.removeChild(div);

  return colors
    ? [parseInt(colors[1]), parseInt(colors[2]), parseInt(colors[3])]
    : [0, 0, 0];
}

export function getGradationColors(
  start: string,
  end: string,
  interval: number
) {
  // 颜色要是整数, 步长最多255
  interval = Math.min(interval, 256);
  const [startR, startG, startB] = getRgbColor(start);
  const [endR, endG, endB] = getRgbColor(end);

  const rStep = (endR - startR) / interval;
  const gStep = (endG - startG) / interval;
  const bStep = (endB - startB) / interval;

  const colors = [];
  for (let i = 0; i <= interval; i++) {
    //计算每一步的hex值
    colors.push(
      `rgb(${[
        Math.round(rStep * i + startR),
        Math.round(gStep * i + startG),
        Math.round(bStep * i + startB),
      ].join(",")})`
    );
  }
  return colors;
}

function parseValue(value: string, defaultValue: number) {
  if (!value) {
    return defaultValue;
  }

  const num = Number(value);

  return isNaN(num) ? defaultValue : num;
}

export function getRangeProps(range: HTMLInputElement) {
  const min = parseValue(range.min, 0);
  const max = parseValue(range.max, 100);
  const calculateStep = () => {
    // 没有设置step时
    if (range.step === "any") {
      return 0.01;
    }

    const step = Number(range.step);

    return isNaN(step) || step <= 0 ? 1 : step;
  };

  return {
    min,
    max,
    interval: Math.ceil((max - min) / calculateStep()),
  };
}
