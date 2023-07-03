import { getGradationColors, getRangeProps } from "./utils";

const range = document.getElementById("range") as HTMLInputElement;
const box = document.querySelector(".box") as HTMLDivElement;

const { width: rangeWidth } = range.getBoundingClientRect();
const { width: boxWidth } = box.getBoundingClientRect();
const [min, max, steps] = getRangeProps(range);
const colors = getGradationColors("green", "yellow", steps);

function changeBoxStyle() {
  const { value } = range;
  const scale = (Number(value) - min) / (max - min);

  box.style.borderRadius = `${scale * 50}%`;
  box.style.marginLeft = `${scale * (rangeWidth - boxWidth)}px`;
  box.style.backgroundColor = colors[Math.round(scale * colors.length)];
}

range.addEventListener("input", changeBoxStyle);

// 初始化
changeBoxStyle();
